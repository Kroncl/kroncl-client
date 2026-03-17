import clsx from 'clsx';
import styles from './text.module.scss';

export interface LogoTextProps {
    animate?: boolean;
    className?: string;
    color?: string;
}

export function LogoText({ animate = false, className, color }: LogoTextProps) {
    const style = color ? { color } : undefined;

    return (
        <span 
            className={clsx(styles.area, styles.className)} 
            data-animate={animate}
            style={style}
        >
            Kroncl
        </span>
    );
}