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
                    <div className={styles.description}>
                        Нам категорически не нравится внешний вид прямых и косвенных конкурентов на рынке, поэтому мы посчитали разумным создать с нуля UI-Kit Kroncl, подобрав оптимальные цветовые схемы, которые радуют наш глаз и по сей день.
                        <br />
                        В основе клиента платформы — Next.js с его потрясающим серверным рендерингом и App Router (особенно начиная с 15 версии). Оптимизация по чанкам, приятные глазу компоненты и оттенки, модульная стилизация на SCSS (прежде всего благодаря наличию миксинов).
                        <br />
                        В отличие от распространённого подхода, мы не используем стейт-менеджер вроде Redux (и надеемся, не будем). Все базовые потребности закрывает React Query.
                        <br />
                        Типизацией покрыто всё API — за что мы не раз говорили спасибо TypeScript.
                        <br />
                        <br />
                        Мы не усердствуем с анимациями — нам вполне хватает framer-motion. Recharts с кастомной обёрткой в свою очередь закрывает визуализацию графиков и диаграмм.
                    </div>
                </div>
            </div>
        </div>
    )
}