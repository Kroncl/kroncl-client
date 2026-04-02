import clsx from 'clsx';
import styles from './content.module.scss';

export function Scrollable({
    className,
    children
}: Readonly<{
    className?: string;
    children: React.ReactNode;
}>) {
    return (
        <div className={clsx(styles.scrollable, className)}>
            {children}
        </div>
    )
}