import Keyhole from '@/assets/ui-kit/icons/keyhole';
import styles from '../security/block.module.scss';
import Button from '@/assets/ui-kit/button/button';
import { DOCS_LINK } from '@/app/docs/(v1)/internal.config';
import Book from '@/assets/ui-kit/icons/book';

export function DocsBlock() {
    return (
        <div className={styles.block} style={{background: 'conic-gradient(from 135deg, var(--color-surface-light), var(--color-leader))'}}>
            <div className={styles.icon}><Book /></div>
            <div className={styles.info}>
                <div className={styles.capture}>
                    Руководство
                </div>
                <div className={styles.description}>
                    Функционал всех модулей Kroncl подробно задокументирован в базе знаний. Кроме того,
                    на страницах платформы мы подсказываем соответствующие разделы для ознакомления.
                </div>
            </div>
            <div className={styles.actions}>
                <Button 
                    children='Начать изучение'
                    variant='accent'
                    as='link'
                    href={DOCS_LINK}
                    className={styles.action} />
            </div>
        </div>
    )
}