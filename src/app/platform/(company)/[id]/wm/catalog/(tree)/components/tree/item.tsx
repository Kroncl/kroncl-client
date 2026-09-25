'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './block.module.scss';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { CatalogCategory, CatalogUnit } from '@/apps/company/modules/wm/types';
import { useWm } from '@/apps/company/modules';
import { CatalogTreeItemActions } from './actions/block';
import Folder from '@/assets/ui-kit/icons/folder';
import { CatalogTreeItemProps } from './_types';

export function CatalogTreeItem({
    className,
    activeId,
    setActiveId,
    initialActivePath = [],
    onStatusUpdated,
    dragPayload,
    setDragPayload,
    dropTargetId,
    setDropTargetId,
    registerReload,
    unregisterReload,
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
    const isDropTarget = dropTargetId === itemId;
    const isDragging = dragPayload?.id === itemId;

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

    // регистрация функции перезагрузки наверх
    useEffect(() => {
        if (!isCategory) return;
        registerReload(itemId, loadChildren);
        return () => unregisterReload(itemId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId]);

    useEffect(() => {
        if (shouldBeOpen && !loaded && !loading) {
            loadChildren();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleClick() {
        if (isActive) {
            setActiveId(null, isCategory);
            if (isCategory) setOpen(false);
            return;
        }

        setActiveId(itemId, isCategory);

        if (!isCategory) return;

        if (!open) {
            setOpen(true);
            if (!loaded) await loadChildren();
        }
    }

    async function handleCreated() {
        await loadChildren();
    }

    function handleStatusUpdated(id: string, status: 'active' | 'inactive') {
        setChildrenCategories(prev =>
            (prev ?? []).map(c => (c.id === id ? { ...c, status } : c))
        );
        setChildrenUnits(prev =>
            (prev ?? []).map(u => (u.id === id ? { ...u, status } : u))
        );
        onStatusUpdated?.(id, status);
    }

    // ---------- DRAG ----------
    function handleDragStart(e: React.DragEvent) {
        e.stopPropagation();

        if (isCategory && props.category) {
            setDragPayload({
                kind: 'category',
                id: props.category.id,
                parentId: props.category.parent_id,
            });
        } else if (!isCategory && props.unit) {
            setDragPayload({
                kind: 'unit',
                id: props.unit.id,
                categoryId: props.unit.category_id,
            });
        } else {
            return;
        }

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', itemId);
    }

    function handleDragEnd() {
        setDragPayload(null);
        setDropTargetId(null);
    }

    function handleDragEnter(e: React.DragEvent) {
        if (!isCategory) return;
        if (!dragPayload) return;
        if (dragPayload.id === itemId) return;

        // авто-раскрытие при наведении на закрытую категорию
        if (!open) {
            setOpen(true);
            if (!loaded && !loading) loadChildren();
        }
    }

    function handleDragOver(e: React.DragEvent) {
        if (!isCategory) return;
        if (!dragPayload) return;
        if (dragPayload.id === itemId) return;

        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDropTargetId(itemId);
    }

    function handleDragLeave(e: React.DragEvent) {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        if (dropTargetId === itemId) setDropTargetId(null);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDropTargetId(null);
        // фактическую обработку делает родитель через onDropTo
        e.stopPropagation();
        onDropTo(itemId);
    }

    // Прокинутый сверху колбэк drop
    const onDropTo = (targetId: string) => {
        // ищем в пропсах — прокинем через замыкание
        props.onDrop?.(targetId);
    };

    return (
        <div className={clsx(className, isDragging && styles.selected, props.type === 'category' ? styles[props.category.status] : styles[props.unit.status])}>
            <div
                className={clsx(styles.base, isDropTarget && styles.goal)}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
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
                        {isCategory && (<Folder className={clsx(styles.svg)} />)}
                        <span className={styles.text}>
                            {isCategory ? props.category.name : props.unit.name}
                        </span>
                        <span className={styles.indicator} />
                    </div>
                </div>
            </div>

            {!isCategory && isActive && (
                <CatalogTreeItemActions
                    key={props.unit.id}
                    className={styles.actions}
                    onCreated={handleCreated}
                    onStatusUpdated={handleStatusUpdated}
                    type='unit'
                    unit={props.unit}
                />
            )}

            {isCategory && open && !loading && (
                <div className={styles.childrens}>
                    {isActive && (
                        <CatalogTreeItemActions
                            key={props.category.id}
                            className={styles.actions}
                            onCreated={handleCreated}
                            onStatusUpdated={handleStatusUpdated}
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
                            onStatusUpdated={handleStatusUpdated}
                            dragPayload={dragPayload}
                            setDragPayload={setDragPayload}
                            dropTargetId={dropTargetId}
                            setDropTargetId={setDropTargetId}
                            registerReload={registerReload}
                            unregisterReload={unregisterReload}
                            onDrop={props.onDrop}
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
                            onStatusUpdated={handleStatusUpdated}
                            dragPayload={dragPayload}
                            setDragPayload={setDragPayload}
                            dropTargetId={dropTargetId}
                            setDropTargetId={setDropTargetId}
                            registerReload={registerReload}
                            unregisterReload={unregisterReload}
                            onDrop={props.onDrop}
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