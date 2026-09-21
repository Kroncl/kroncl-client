'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './block.module.scss';
import Input from '@/assets/ui-kit/input/input';
import Button from '@/assets/ui-kit/button/button';
import Checkbox from '@/assets/ui-kit/checkbox/checkbox';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { CatalogCategory, CatalogUnit } from '@/apps/company/modules/wm/types';
import { useWm } from '@/apps/company/modules';
import {
    actionsTransition,
    actionsVariants,
    plugTransition,
    plugVariants,
} from './_animations';

type CatalogTreeItemProps = {
    className?: string;
} & (
    | { type: 'category'; category: CatalogCategory }
    | { type: 'unit'; unit: CatalogUnit }
)

function CatalogTreeItem({ className, ...props }: CatalogTreeItemProps) {
    const wmModule = useWm();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [childrenCategories, setChildrenCategories] = useState<CatalogCategory[]>([]);
    const [childrenUnits, setChildrenUnits] = useState<CatalogUnit[]>([]);
    const [loaded, setLoaded] = useState(false);

    const isCategory = props.type === 'category';

    async function handleClick() {
        if (!isCategory) return;
        setOpen(o => !o);
        if (loaded) return;

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

    return (
        <div className={className}>
            <div className={styles.base}>
                <div
                    className={styles.info}
                    onClick={handleClick}
                    style={{ cursor: isCategory ? 'pointer' : 'default' }}
                >
                    <div className={styles.name}>
                        {isCategory ? props.category.name : props.unit.name}
                    </div>
                </div>
                {/* <AnimatePresence>
                    {isCategory && open && (
                        <motion.div
                            className={styles.actions}
                            variants={actionsVariants}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            transition={actionsTransition}
                        >
                            <Button children='Добавить' className={styles.action} variant='contrast' />
                        </motion.div>
                    )}
                </AnimatePresence> */}
            </div>
            {loading && (
            <AnimatePresence mode='wait'>
                    <motion.div
                        key='plug'
                        className={styles.plug}
                        variants={plugVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        transition={plugTransition}
                    >
                        <Spinner size='md' variant='contrast' />
                    </motion.div>
            </AnimatePresence>
            )}
            {isCategory && open && !loading && (
                <div className={styles.childrens}>
                    {isCategory && open && (
                        <div className={styles.actions}>
                            <Button children='Добавить' className={styles.action} variant='contrast' />
                        </div>
                    )}
                    <AnimatePresence mode='wait'>
                        {loading && (
                            <motion.div
                                key='plug'
                                className={styles.plug}
                                variants={plugVariants}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                transition={plugTransition}
                            >
                                <Spinner size='md' variant='contrast' />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {!loading && (
                        <>
                            {childrenCategories && childrenCategories.map(c => (
                                <CatalogTreeItem
                                    key={c.id}
                                    className={styles.item}
                                    type='category'
                                    category={c}
                                />
                            ))}
                            {childrenUnits && childrenUnits.map(u => (
                                <CatalogTreeItem
                                    key={u.id}
                                    className={styles.item}
                                    type='unit'
                                    unit={u}
                                />
                            ))}
                        </>
                    )}
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

    const [categories, setCategories] = useState<CatalogCategory[]>([]);
    const [loading, setLoading] = useState(true);

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
                <Input placeholder='Категория / Товараная позиция' className={styles.input} />
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
            </div>
            <div className={styles.body}>
                {loading ? (
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