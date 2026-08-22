import { LogoFull } from '@/assets/ui-kit/logo/full/full';
import styles from './sub-footer.module.scss';
import { LogoIco } from '@/assets/ui-kit/logo/ico/ico';

export function SubFooter() {
    return (
        <div className={styles.container}>
            <span className={styles.logo}><LogoIco className={styles.ico} /></span>
            <span className={styles.text}>Создано в России для нужд малого бизнеса. Все права защищены. Kroncl 2026.</span>
        </div>
    )
}