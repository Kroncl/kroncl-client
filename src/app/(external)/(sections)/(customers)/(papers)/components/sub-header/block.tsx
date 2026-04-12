import clsx from 'clsx';
import styles from './block.module.scss';

export interface SubHeaderProps {
    className?: string;
    title?: string;
}

export function SubHeader({
    className,
    title = 'Правовые документы'
}: SubHeaderProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.focus}>{title}</div>
        </div>
    )
}