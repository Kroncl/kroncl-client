'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './block.module.scss';
import Input from '@/assets/ui-kit/input/input';
import Button from '@/assets/ui-kit/button/button';
import Checkbox from '@/assets/ui-kit/checkbox/checkbox';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { CatalogCategory, CatalogUnit } from '@/apps/company/modules/wm/types';
import { useWm } from '@/apps/company/modules';
import { CatalogTreeItemActions } from './actions/block';

type CatalogTreeItemProps = {
    className?: string;
    activeId: string | null;
    setActiveId: (id: string | null) => void;
    initialActivePath?: string[];
} & (
    | { type: 'category'; category: CatalogCategory }
    | { type: 'unit'; unit: CatalogUnit }
)

function CatalogTreeItem({
    className,
    activeId,
    setActiveId,
    initialActivePath = [],
    ...props
}: CatalogTreeItemProps) {
    const wmModule = useWm();

    const isCategory = props.type === 'category';
    const itemId = isCategory ? props.category.id : props.unit.id;

    const shouldBeOpen = isCategory && initialActivePath.includes(itemId);

    const [open, setOpen] = useState(shouldBeOpen);
    const [loading, setLoading] = useState(false);
    const [childrenCategories, setChildrenCategories] = useState<CatalogCategory[]>([]);
    const [childrenUnits, setChildrenUnits] = useState<CatalogUnit[]>([]);
    const [loaded, setLoaded] = useState(false);

    const isActive = activeId === itemId;

    async function loadChildren() {
        if (!isCategory) return;

        setLoading(true);
        try {
            const [cats, units] = await Promise.all([
                wmModule.getCategories({ parent_id: props.category.id }),
                wmModule.getUnits({ category_id: props.category.id }),
            ]);
            if (cats.status) setChildrenCategories(cats.data.categories);
            if (units.status) setChildrenUnits(units.data.units);
            setLoaded(true);
        } finally {
            setLoading(false);
        }
    }

    // авто-раскрытие пути при монтировании
    useEffect(() => {
        if (shouldBeOpen && !loaded && !loading) {
            loadChildren();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleClick() {
        if (isActive) {
            setActiveId(null);
        } else {
            setActiveId(itemId);
        }

        if (!isCategory) return;

        const next = !open;
        setOpen(next);

        if (!next || loaded) return;

        await loadChildren();
    }

    async function handleCreated() {
        await loadChildren();
    }

    return (
        <div className={className}>
            <div className={styles.base}>
                <div
                    className={styles.info}
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                >
                    <div className={styles.name}>
                        {isCategory ? props.category.name : props.unit.name}
                    </div>
                </div>
            </div>
            {open && !loading && (
                <div className={styles.childrens}>
                    {isActive && (
                        <CatalogTreeItemActions
                            key={isCategory
                                ? `${props.category.id}-${props.category.status}`
                                : `${props.unit.id}-${props.unit.status}`}
                            className={styles.actions}
                            onCreated={handleCreated}
                            {...(isCategory
                                ? { type: 'category' as const, category: props.category }
                                : { type: 'unit' as const, unit: props.unit }
                            )}
                        />
                    )}
                    {childrenCategories && childrenCategories.map(c => (
                        <CatalogTreeItem
                            key={c.id}
                            className={styles.item}
                            type='category'
                            category={c}
                            activeId={activeId}
                            setActiveId={setActiveId}
                            initialActivePath={initialActivePath}
                        />
                    ))}
                    {childrenUnits && childrenUnits.map(u => (
                        <CatalogTreeItem
                            key={u.id}
                            className={styles.item}
                            type='unit'
                            unit={u}
                            activeId={activeId}
                            setActiveId={setActiveId}
                            initialActivePath={initialActivePath}
                        />
                    ))}
                </div>
            )}

            {loading && (
                <div className={styles.plug}>
                    <Spinner size='md' variant='contrast' />
                </div>
            )}
        </div>
    );
}

export interface CatalogTreeProps {
    className?: string;
}

export function CatalogTree({ className }: CatalogTreeProps) {
    const wmModule = useWm();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeFromUrl = searchParams.get('category');

    const [categories, setCategories] = useState<CatalogCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeId, setActiveIdState] = useState<string | null>(activeFromUrl);
    const [initialActivePath, setInitialActivePath] = useState<string[]>([]);

    const SCALE_KEY = 'kroncl.catalog.tree.scale';
    const [scale, setScale] = useState<TreeScale>(100);

    // грузим корневые категории
    useEffect(() => {
        wmModule.getCategories({ parent_id: null })
            .then(res => {
                if (res.status) setCategories(res.data.categories);
            })
            .finally(() => setLoading(false));
    }, []);

    // синхронизация activeId с URL (на случай back/forward и внешних переходов)
    useEffect(() => {
        setActiveIdState(activeFromUrl);
    }, [activeFromUrl]);

    // строим путь до activeFromUrl
    useEffect(() => {
        if (!activeFromUrl) {
            setInitialActivePath([]);
            return;
        }

        let cancelled = false;

        async function buildPath() {
            const path: string[] = [];
            let currentId: string | null = activeFromUrl;

            while (currentId) {
                path.unshift(currentId);
                try {
                    const res = await wmModule.getCategory(currentId);
                    // если это не категория (например, id юнита) — прекращаем
                    if (!res.status || !res.data) break;
                    currentId = res.data.parent_id;
                } catch {
                    // не категория или удалена — прекращаем, но не ломаем path
                    break;
                }
            }

            if (!cancelled) setInitialActivePath(path);
        }

        buildPath();
        return () => { cancelled = true; };
    }, [activeFromUrl]);

    function setActiveId(id: string | null) {
        setActiveIdState(id);

        const params = new URLSearchParams(searchParams.toString());
        if (id) params.set('category', id);
        else params.delete('category');

        const url = `${pathname}?${params.toString()}`;
        window.history.replaceState(null, '', url);
    }

    type TreeScale = 75 | 100 | 125;

    useEffect(() => {
        const saved = Number(localStorage.getItem(SCALE_KEY));
        if (saved === 75 || saved === 100 || saved === 125) setScale(saved);
    }, []);

    function updateScale(next: TreeScale) {
        setScale(next);
        localStorage.setItem(SCALE_KEY, String(next));
    }

    return (
        <div className={clsx(styles.frame, className)}>
            <div className={styles.head}>
                <Input placeholder='Категория / Товарная позиция' className={styles.input} />
                <div className={styles.filters}>
                    <div className={styles.item}>
                        <Checkbox variant='contrast' />
                        <span className={styles.name}>Только активные</span>
                    </div>
                    <div className={styles.item}>
                        <Checkbox variant='contrast' />
                        <span className={styles.name}>Только неактивные</span>
                    </div>
                </div>
                <Button children='Найти' variant='contrast' className={styles.action} />
                
                {/** рабочая область */}
                <div className={styles.control}>
                    <div className={styles.tip}>Масштаб</div>
                    {([75, 90, 100, 125] as TreeScale[]).map(s => (
                        <Button
                            key={s}
                            className={clsx(styles.action, scale === s && styles.selected)}
                            variant='glass'
                            onClick={() => updateScale(s)}
                        >
                            {s}%
                        </Button>
                    ))}
                </div>
            </div>
            <div className={clsx(styles.body, styles['scale'+scale])}>
                {loading || (activeFromUrl && initialActivePath.length === 0) ? (
                    <div className={styles.plug}>
                        <Spinner size='md' variant='contrast' />
                    </div>
                ) : (
                    categories && categories.map(c => (
                        <CatalogTreeItem
                            key={c.id}
                            className={styles.item}
                            type='category'
                            category={c}
                            activeId={activeId}
                            setActiveId={setActiveId}
                            initialActivePath={initialActivePath}
                        />
                    ))
                )}

                {/** back canvas */}
                <div className={styles.canvas}>
                    <span /><span /><span /><span />
                </div>
            </div>
        </div>
    );
}