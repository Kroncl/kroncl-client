'use client';

import Link from 'next/link';
import styles from './card.module.scss';
import clsx from 'clsx';
import OutLink from '@/assets/ui-kit/icons/out-link';
import { Message } from '@/apps/company/modules/support/types';
import { formatDate } from '@/assets/utils/date';

export interface MessageCardProps {
    className?: string;
    message: Message;
}

export function MessageCard({
    className,
    message
}: MessageCardProps) {
    const formattedDate = formatDate(message.created_at);
    const authorName = message.account.name || message.account.email;

    return (
        <div className={clsx(styles.card, className)}>
            <div className={styles.meta}>
                {message.is_tech && (<span className={styles.accent}>Специалист поддержки</span>)} {message.account.name}, <span className={styles.date}>{formattedDate}</span>
            </div>
            <div className={styles.text}>{message.text}</div>
            {message.links && message.links.length > 0 && (
                <div className={styles.links}>
                    {message.links.map((link) => (
                        <Link 
                            key={link.id}
                            href={link.link} 
                            target='_blank' 
                            className={styles.link}
                        >
                            <span className={styles.icon}><OutLink /></span>
                            <span className={styles.name}>{link.capture}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}