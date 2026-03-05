import clsx from 'clsx';
import styles from './card.module.scss';
import { Theme } from '../../../../../../assets/styles/base/themes/_themes';

export interface ThemeCardProps {
    className?: string;
    theme: Theme;
    onSelect: (id: string) => void;
}

export function ThemeCard({
    className,
    theme,
    onSelect
}: ThemeCardProps) {
    return (
        <div className={clsx(styles.theme, className)} onClick={() => onSelect(theme.id)}>
            <div className={styles.head}>
                <div className={styles.title}>{theme.capture}</div>
                <div className={styles.description}>{theme.description || ''}</div>
            </div>
            <div className={styles.cover} style={{backgroundImage: `url(${theme.cover || ''})`}}></div>
        </div>
    )
}