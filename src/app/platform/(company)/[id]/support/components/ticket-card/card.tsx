'use client';

import clsx from 'clsx';
import styles from './card.module.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Ticket, TicketStatus, TicketTheme, TicketThemeTitle } from '@/apps/company/modules/support/types';
import { useState, useEffect } from 'react';
import { useSupport } from '@/apps/company/modules';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { formatDate } from '@/assets/utils/date';

export interface TicketCardProps {
    className?: string;
    ticket: Ticket;
    onUpdate?: (updatedTicket: Ticket) => void;
}

const statusLabels: Record<TicketStatus, string> = {
    pending: 'В обработке',
    closed: 'Закрыт',
    revoked: 'Отменён'
};

export function TicketCard({
    className,
    ticket,
    onUpdate
}: TicketCardProps) {
    const params = useParams();
    const companyId = params.id as string;
    const supportModule = useSupport();
    const { showMessage } = useMessage();
    const [updating, setUpdating] = useState(false);
    
    // Локальный стейт для read статуса
    const [isUnread, setIsUnread] = useState(() => {
        const lastMessage = ticket.last_message;
        return lastMessage ? !lastMessage.read : false;
    });

    // Синхронизация с пропсом (если вдруг данные обновились извне)
    useEffect(() => {
        const lastMessage = ticket.last_message;
        setIsUnread(lastMessage ? !lastMessage.read : false);
    }, [ticket.last_message?.read]);

    const isPending = ticket.status === 'pending';
    const statusLabel = statusLabels[ticket.status];
    const lastMessage = ticket.last_message;

    const handleToggleRead = async () => {
        if (!lastMessage || updating) return;

        setUpdating(true);
        const newUnread = !isUnread;
        setIsUnread(newUnread);
        
        try {
            const response = await supportModule.updateMessageReadStatus(
                ticket.id, 
                lastMessage.id, 
                { read: !newUnread }
            );
            
            if (!response.status) {
                setIsUnread(isUnread);
                throw new Error(response.message || 'Не удалось обновить статус');
            }
            
            // showMessage({
            //     label: newUnread ? 'Сообщение отмечено как непрочитанное' : 'Сообщение отмечено как прочитанное',
            //     variant: 'success'
            // });
            
            // Если API не возвращает тикет, обновляем локальный last_message
            const updatedTicket = {
                ...ticket,
                last_message: { ...lastMessage, read: !newUnread }
            };
            onUpdate?.(updatedTicket);
        } catch (error: any) {
            showMessage({
                label: error.message || 'Ошибка при обновлении статуса',
                variant: 'error'
            });
        } finally {
            setUpdating(false);
        }
    };
    
    const themeTitle = TicketThemeTitle[ticket.theme as TicketTheme] || ticket.theme;
    const formattedDate = formatDate(ticket.created_at);

    return (
        <div className={clsx(styles.card, className)}>
            <div 
                className={clsx(styles.indicator, updating && styles.shimmer)} 
                onClick={handleToggleRead}
                style={{ cursor: !updating ? 'pointer' : 'default' }}
            >
                <span className={clsx(styles.circle, isUnread && styles.accent)} />
            </div>
            <Link href={`/platform/${companyId}/support/${ticket.id}`} className={styles.info}>
                {!isPending && (
                    <span className={styles.badge}>{statusLabel}</span>
                )}
                <div className={styles.title}>
                    {themeTitle}
                </div>
                <div className={clsx(styles.text, isUnread && styles.fresh)}>{lastMessage?.text}</div>
                <div className={styles.date}>{formattedDate}</div>
            </Link>
        </div>
    );
}