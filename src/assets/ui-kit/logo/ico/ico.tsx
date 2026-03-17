import clsx from 'clsx';
import styles from './ico.module.scss';

export interface LogoIconProps {
    animate?: boolean;
    className?: string;
    color?: string;
}

export function LogoIco({ 
    animate = false, 
    className,
    color
}: LogoIconProps) {
    const petalStyle = color ? { backgroundColor: color } : undefined;

    return (
        <span className={clsx(styles.area, className)} data-animate={animate}>
            <span className={styles.petal} style={petalStyle} />
            <span className={styles.petal} style={petalStyle} />
            <span className={styles.petal} style={petalStyle} />
            <span className={styles.petal} style={petalStyle} />
        </span>
    );
}