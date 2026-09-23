'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './block.module.scss';
import Input from '@/assets/ui-kit/input/input';
import Button from '@/assets/ui-kit/button/button';
import Checkbox from '@/assets/ui-kit/checkbox/checkbox';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { CatalogCategory, CatalogUnit } from '@/apps/company/modules/wm/types';
import { useWm } from '@/apps/company/modules';
import { CatalogTreeItemActions } from './actions/block';
import { formatDate } from '@/assets/utils/date';
import Folder from '@/assets/ui-kit/icons/folder';

type TreeScale = 75 | 90 | 100 | 125;
type CategoryStatus = 'active' | 'inactive';

type CatalogTreeItemProps = {
    className?: string;
    activeId: string | null;
    setActiveId: (id: string | null, persist: boolean) => void;
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

    useEffect(() => {
        if (shouldBeOpen && !loaded && !loading) {
            loadChildren();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleClick() {
        if (isActive) {
            setActiveId(null, isCategory);
        } else {
            setActiveId(itemId, isCategory);
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
                    {!isCategory && (
                        <div className={styles.type}>
                            {props.unit.type === 'product' ? 'Товар' : 'Услуга'}
                        </div>
                    )}
                    <div className={styles.name}>
                        {isCategory && (<Folder className={styles.svg} />)}
                        <span className={styles.text}>{isCategory ? props.category.name : props.unit.name}</span>
                    </div>
                    {/* <div className={styles.meta}>{props.type === 'category' && formatDate(props.category.created_at)}</div> */}
                </div>
            </div>

            {!isCategory && isActive && (
                <CatalogTreeItemActions
                    key={`${props.unit.id}-${props.unit.status}`}
                    className={styles.actions}
                    onCreated={handleCreated}
                    type='unit'
                    unit={props.unit}
                />
            )}

            {isCategory && open && !loading && (
                <div className={styles.childrens}>
                    {isActive && (
                        <CatalogTreeItemActions
                            key={`${props.category.id}-${props.category.status}`}
                            className={styles.actions}
                            onCreated={handleCreated}
                            type='category'
                            category={props.category}
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

    // ---------- ROOT TREE ----------
    const [categories, setCategories] = useState<CatalogCategory[]>([]);
    const [loading, setLoading] = useState(true);

    // ---------- ACTIVE ----------
    const [activeId, setActiveIdState] = useState<string | null>(activeFromUrl);
    const [initialActivePath, setInitialActivePath] = useState<string[]>([]);

    // ---------- SCALE ----------
    const SCALE_KEY = 'kroncl.catalog.tree.scale';
    const [scale, setScale] = useState<TreeScale>(100);

    // ---------- FILTERS ----------
    const [searchInput, setSearchInput] = useState('');
    const [activeOnly, setActiveOnly] = useState(false);
    const [inactiveOnly, setInactiveOnly] = useState(false);

    // применённые фильтры — то, что реально ушло на сервер
    const [appliedSearch, setAppliedSearch] = useState('');
    const [appliedStatus, setAppliedStatus] = useState<CategoryStatus | undefined>(undefined);

    // ---------- SEARCH RESULTS ----------
    const [searchResults, setSearchResults] = useState<CatalogCategory[] | null>(null);
    const [searchLoading, setSearchLoading] = useState(false);

    const isSearchMode = appliedSearch.trim().length > 0 || appliedStatus !== undefined;

    // грузим корневые категории
    useEffect(() => {
        wmModule.getCategories({ parent_id: null })
            .then(res => {
                if (res.status) setCategories(res.data.categories);
            })
            .finally(() => setLoading(false));
    }, []);

    // синхронизация activeId с URL
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
                    if (!res.status || !res.data) break;
                    currentId = res.data.parent_id;
                } catch {
                    break;
                }
            }

            if (!cancelled) setInitialActivePath(path);
        }

        buildPath();
        return () => { cancelled = true; };
    }, [activeFromUrl]);

    function setActiveId(id: string | null, persist: boolean = true) {
        setActiveIdState(id);

        if (!persist) return;

        const params = new URLSearchParams(searchParams.toString());
        if (id) params.set('category', id);
        else params.delete('category');

        const url = `${pathname}?${params.toString()}`;
        window.history.replaceState(null, '', url);
    }

    // ---------- SCALE PERSIST ----------
    useEffect(() => {
        const saved = Number(localStorage.getItem(SCALE_KEY));
        if (saved === 75 || saved === 90 || saved === 100 || saved === 125) {
            setScale(saved as TreeScale);
        }
    }, []);

    function updateScale(next: TreeScale) {
        setScale(next);
        localStorage.setItem(SCALE_KEY, String(next));
    }

    // ---------- FILTER HANDLERS ----------
    function handleActiveToggle(checked: boolean) {
        setActiveOnly(checked);
        if (checked) setInactiveOnly(false);
    }

    function handleInactiveToggle(checked: boolean) {
        setInactiveOnly(checked);
        if (checked) setActiveOnly(false);
    }

    const searchDirty = useMemo(() => {
        const nextStatus: CategoryStatus | undefined =
            activeOnly ? 'active' : inactiveOnly ? 'inactive' : undefined;

        return searchInput !== appliedSearch || nextStatus !== appliedStatus;
    }, [searchInput, appliedSearch, activeOnly, inactiveOnly, appliedStatus]);

    async function handleSearch() {
        const nextStatus: CategoryStatus | undefined =
            activeOnly ? 'active' : inactiveOnly ? 'inactive' : undefined;

        setAppliedSearch(searchInput);
        setAppliedStatus(nextStatus);

        const hasFilters = searchInput.trim().length > 0 || nextStatus !== undefined;

        if (!hasFilters) {
            setSearchResults(null);
            return;
        }

        setSearchLoading(true);
        try {
            const res = await wmModule.getCategories({
                search: searchInput.trim() || undefined,
                status: nextStatus,
            });
            if (res.status) setSearchResults(res.data.categories);
        } finally {
            setSearchLoading(false);
        }
    }

    async function handleReset() {
        setSearchInput('');
        setActiveOnly(false);
        setInactiveOnly(false);
        setAppliedSearch('');
        setAppliedStatus(undefined);
        setSearchResults(null);
    }

    return (
        <div className={clsx(styles.frame, className)}>
            <div className={styles.head}>
                <div className={styles.line}>
                    {/** поисковик */}
                    <Input
                        placeholder='Категория'
                        className={styles.input}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && searchDirty && !searchLoading) {
                                handleSearch();
                            }
                        }}
                    />
                    <Button
                        children='Найти'
                        variant='contrast'
                        className={styles.action}
                        onClick={handleSearch}
                        disabled={!searchDirty || searchLoading}
                    />
                    <div className={styles.filters}>
                        <div className={styles.item}>
                            <Checkbox
                                variant='brand'
                                checked={activeOnly}
                                onChange={(e) => handleActiveToggle(e.target.checked)}
                            />
                            <span className={styles.name}>Только активные</span>
                        </div>
                        <div className={styles.item}>
                            <Checkbox
                                variant='brand'
                                checked={inactiveOnly}
                                onChange={(e) => handleInactiveToggle(e.target.checked)}
                            />
                            <span className={styles.name}>Только неактивные</span>
                        </div>
                    </div>

                    {/** контроль масштаба */}
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

                {/** результат поиска */}
                {(isSearchMode && !searchLoading) && (
                    <div className={clsx(styles.line, styles.searchTotal)}>
                        <div className={styles.text}>{searchResults && searchResults.length > 0
                            ? `Найдено: ${searchResults.length}`
                            : 'Ничего не найдено'}</div>
                        <Button
                            children='Сбросить'
                            variant='light'
                            className={styles.action}
                            onClick={handleReset}
                        />
                    </div>
                )}
            </div>

            <div className={clsx(styles.body, styles['scale' + scale])}>
                {isSearchMode ? (
                    searchLoading ? (
                        <div className={styles.plug}>
                            <Spinner size='md' variant='contrast' />
                        </div>
                    ) : (
                        searchResults && searchResults.map(c => (
                            <CatalogTreeItem
                                key={c.id}
                                className={styles.item}
                                type='category'
                                category={c}
                                activeId={activeId}
                                setActiveId={setActiveId}
                            />
                        ))
                    )
                ) : (
                    loading ? (
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
                    )
                )}

                {/** back canvas */}
                <div className={styles.canvas}>
                    <span /><span /><span /><span />
                </div>
            </div>
        </div>
    );
}