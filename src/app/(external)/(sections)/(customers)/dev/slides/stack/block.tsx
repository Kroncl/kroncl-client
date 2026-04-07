import { PageBlockProps } from '@/app/(external)/_types';
import styles from './block.module.scss';
import clsx from 'clsx';
import { backendStack, frontendStack } from './stack.config';
import { ModalTooltip } from '@/app/components/tooltip/tooltip';

export function StackBlock({className}: PageBlockProps) {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.col)}>
                <div className={styles.stack}>
                    {backendStack.map((item, index) => (
                        <ModalTooltip key={index} side='bottom' content={item.description}>
                        <span className={clsx(styles.icon, styles[item.priority])}>
                            {item.abb}
                        </span>
                        </ModalTooltip>
                    ))}
                </div>
                <div className={clsx(styles.info, className)}>
                    <div className={styles.capture}>Server Side</div>
                    <div className={styles.description}>
                        Серверная логика Kroncl — восьмое чудо света. Во имя здравого смысла ещё на этапе проектирования мы отказались от огорода микросервисов в пользу модульного монолита. Kroncl относится к ERP-подобным бизнес-приложениям, где критически важна консистентность данных (а ещё мы просто любим JOIN).
                        <br />
                        PostgreSQL — основное хранилище данных организаций. Партиционирование тяжёлых таблиц, мониторинг лимитов хранилищ компаний — и всё это без GORM на стороне Go. Чистый SQL + PGX.
                        <br />
                        Лёгкий роутинг на chi, грамотная изоляция ресурсоёмких клиентов, распределение хранилищ организаций по бакетам Minio, асинхронный мигратор схем на базе golang-migrate. И ещё 1000+1 чудо в основе Kroncl.
                    </div>
                </div>
            </div>
            <div className={clsx(styles.col)}>
                <div className={styles.stack}>
                    {frontendStack.map((item, index) => (
                        <ModalTooltip key={index} side='bottom' content={item.description}>
                        <span className={clsx(styles.icon, styles[item.priority])}>
                            {item.abb}
                        </span>
                        </ModalTooltip>
                    ))}
                </div>
                <div className={clsx(styles.info, className)}>
                    <div className={styles.capture}>Client Side</div>
                    <div className={styles.description}>Я чуть не сдох</div>
                </div>
            </div>
        </div>
    )
}