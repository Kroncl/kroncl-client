import Collection from '@/assets/ui-kit/icons/collection';
import styles from './head.module.scss';

export function PlatformCompanyPanelHead() {
    return (
        <div className={styles.grid}>
            <div className={styles.block}>
                <Collection />
                <span className={styles.name}>Задачи</span>
            </div>
            <div className={styles.block}>
                
            </div>
        </div>
    )
}