'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './block.module.scss';
import Input from '@/assets/ui-kit/input/input';
import Button from '@/assets/ui-kit/button/button';
import Checkbox from '@/assets/ui-kit/checkbox/checkbox';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { CatalogCategory } from '@/apps/company/modules/wm/types';
import { useWm } from '@/apps/company/modules';
import { CatalogTreeItemActions } from './actions/block';
import { CatalogTreeItem } from './item';
import { useTreeScale } from './_useTreeScale';
import { useTreeActive } from './_useTreeActive';
import { useTreeSearch } from './_useTreeSearch';
import { useTreeReload } from './_useTreeReload';
import { useTreeDragDrop } from './_useTreeDragDrop';

export interface CatalogTreeProps {
    className?: string;
}

export function CatalogTree({ className }: CatalogTreeProps) {
    const wmModule = useWm();

    const [categories, setCategories] = useState<CatalogCategory[]>([]);
    const [loading, setLoading] = useState(true);

    const { scale, updateScale } = useTreeScale();
    const { activeId, setActiveId, initialActivePath } = useTreeActive();
    const search = useTreeSearch();
    const { registerReload, unregisterReload, reload } = useTreeReload();
    const dnd = useTreeDragDrop({
        reload,
        reloadRoots: loadRoots,
    });

    async function loadRoots() {
        const res = await wmModule.getCategories({ parent_id: null });
        if (res.status) setCategories(res.data.categories);
    }

    function handleRootStatusUpdated(id: string, status: 'active' | 'inactive') {
        setCategories(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
    }

    useEffect(() => {
        wmModule.getCategories({ parent_id: null })
            .then(res => {
                if (res.status) setCategories(res.data.categories);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className={clsx(styles.frame, className)}>
            <div className={styles.head}>
                <div className={styles.line}>
                    <Input
                        placeholder='Категория'
                        className={styles.input}
                        value={search.searchInput}
                        onChange={(e) => search.setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && search.searchDirty && !search.searchLoading) {
                                search.handleSearch();
                            }
                        }}
                    />
                    <Button
                        children='Найти'
                        variant='contrast'
                        className={styles.action}
                        onClick={search.handleSearch}
                        disabled={!search.searchDirty || search.searchLoading}
                    />
                    <div className={styles.filters}>
                        <div className={styles.item}>
                            <Checkbox
                                variant='brand'
                                checked={search.activeOnly}
                                onChange={(e) => search.handleActiveToggle(e.target.checked)}
                            />
                            <span className={styles.name}>Только активные</span>
                        </div>
                        <div className={styles.item}>
                            <Checkbox
                                variant='brand'
                                checked={search.inactiveOnly}
                                onChange={(e) => search.handleInactiveToggle(e.target.checked)}
                            />
                            <span className={styles.name}>Только неактивные</span>
                        </div>
                    </div>

                    <div className={styles.control}>
                        <div className={styles.tip}>Масштаб</div>
                        {([75, 90, 100, 125] as const).map(s => (
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

                {(search.isSearchMode && !search.searchLoading) && (
                    <div className={clsx(styles.line, styles.searchTotal)}>
                        <div className={styles.text}>
                            {search.searchResults && search.searchResults.length > 0
                                ? `Найдено: ${search.searchResults.length}`
                                : 'Ничего не найдено'}
                        </div>
                        <Button
                            children='Сбросить'
                            variant='light'
                            className={styles.action}
                            onClick={search.handleReset}
                        />
                    </div>
                )}
            </div>

            <div className={clsx(styles.body, styles['scale' + scale])}>
                <CatalogTreeItemActions
                    className={styles.root}
                    onCreated={loadRoots}
                    type='root'
                />

                {search.isSearchMode ? (
                    search.searchLoading ? (
                        <div className={styles.plug}>
                            <Spinner size='md' variant='contrast' />
                        </div>
                    ) : (
                        search.searchResults && search.searchResults.map(c => (
                            <CatalogTreeItem
                                key={c.id}
                                className={styles.item}
                                type='category'
                                category={c}
                                activeId={activeId}
                                setActiveId={setActiveId}
                                dragPayload={dnd.dragPayload}
                                setDragPayload={dnd.setDragPayload}
                                dropTargetId={dnd.dropTargetId}
                                setDropTargetId={dnd.setDropTargetId}
                                registerReload={registerReload}
                                unregisterReload={unregisterReload}
                                onDrop={dnd.handleDrop}
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
                                onStatusUpdated={handleRootStatusUpdated}
                                dragPayload={dnd.dragPayload}
                                setDragPayload={dnd.setDragPayload}
                                dropTargetId={dnd.dropTargetId}
                                setDropTargetId={dnd.setDropTargetId}
                                registerReload={registerReload}
                                unregisterReload={unregisterReload}
                                onDrop={dnd.handleDrop}
                            />
                        ))
                    )
                )}

                <div className={styles.canvas}>
                    <span /><span /><span /><span />
                </div>
            </div>
        </div>
    );
}