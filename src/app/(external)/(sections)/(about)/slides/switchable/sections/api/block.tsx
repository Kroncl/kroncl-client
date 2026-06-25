import Keyhole from '@/assets/ui-kit/icons/keyhole';
import styles from './block.module.scss';
import Button from '@/assets/ui-kit/button/button';
import { DOCS_LINK_COMPANIES_LOGS } from '@/app/docs/(v1)/internal.config';
import Dev from '@/assets/ui-kit/icons/dev';
import Code from '@/assets/ui-kit/icons/code';
import { linksConfig } from '@/config/links.config';

export function ApiBlock() {
    return (
        <div className={styles.block}>
            <div className={styles.icon}><Code /></div>
            <div className={styles.info}>
                <div className={styles.capture}>
                    API
                </div>
                <div className={styles.description}>
                    Интегрируйте любую функциональность платформы в свои продукты.
                    Используйте единую точку входа для автоматизации учёта, построения отчётности и интеграции с внешними сервисами — без ограничений и привязки к интерфейсу.
                </div>
            </div>
            <div className={styles.actions}>
                <Button 
                    children='Подробнее'
                    variant='contrast'
                    as='link'
                    href={linksConfig.developerApi}
                    className={styles.action} />
            </div>
        </div>
    )
}