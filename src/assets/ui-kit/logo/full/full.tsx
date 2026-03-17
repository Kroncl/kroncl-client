import clsx from 'clsx';
import { LogoIco } from '../ico/ico';
import { LogoText } from '../text/text';
import styles from './full.module.scss';

export interface LogoFullProps {
    className?: string;
    color?: string;
    animate?: boolean;
}

export function LogoFull({ 
    animate = false,
    color,
    className
}: LogoFullProps) {
    return (
        <span className={clsx(styles.area, className)} data-animate={animate}>
            <span className={styles.box}><LogoIco color={color} animate={animate} /></span>
            <span className={styles.box}><LogoText color={color} animate={animate} /></span>
        </span>
    )
}