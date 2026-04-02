import clsx from 'clsx';
import styles from './block.module.scss';

export interface PlatformErrorProps {
    className?: string;
    error?: string;
    code?: number;
}

export function PlatformError({
    className,
    error = 'Что-то пошло не так',
    code
}: PlatformErrorProps) {
    return (
        <div className={clsx(styles.container, className)}>
            {code && (<div className={styles.code}>{code}</div>)}
            <div className={styles.capture}>{error}</div>
        </div>
    )
}