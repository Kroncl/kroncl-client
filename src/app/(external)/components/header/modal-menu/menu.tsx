import clsx from 'clsx';
import styles from './menu.module.scss';
import Link from 'next/link';
import Button from '@/assets/ui-kit/button/button';
import { MenuProps } from './_types';

export function ModalMenu({
    className,
    preview,
    content
}: MenuProps) {
    return (
        <div className={clsx(styles.menu, className)}>
            <div className={styles.preview}>
                <div className={styles.label}></div>
                <div className={styles.info}>
                    <div className={styles.title}>
                        {preview.title}
                    </div>
                    {preview.description && (
                        <div className={styles.description}>
                            {preview.description}
                        </div>
                    )}
                </div>
                {preview.actions && preview.actions.length > 0 && (
                    <div className={styles.actions}>
                        {preview.actions.map((action, index) => (
                            <Button 
                                key={index}
                                {...action}
                                className={clsx(styles.action, action.className)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.content}>
                {content.items.map((item, index) => (
                    <div key={index} className={styles.col}>
                        <div className={styles.head}>
                            {item.icon && (<span className={styles.icon}>{item.icon}</span>)}
                            {item.href ? (
                                <Link href={item.href} className={clsx(styles.title, styles.link)}>
                                    {item.title}
                                </Link>
                            ) : (
                                <span className={clsx(styles.title)}>
                                    {item.title}
                                </span>
                            )}
                        </div>
                        {item.description && (
                            <div className={styles.description}>
                                {item.description}
                            </div>
                        )}
                        {item.links && item.links.length > 0 && (
                            <div className={styles.links}>
                                {item.links.map((link, linkIndex) => (
                                    <Link 
                                        key={linkIndex}
                                        {...link}
                                        className={clsx(styles.link)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}