'use client';

import clsx from "clsx";
import styles from './panel.module.scss';
import Button from "@/assets/ui-kit/button/button";
import Edit from "@/assets/ui-kit/icons/edit";
import { TicketCard } from "../ticket-card/card";
import { useParams } from "next/navigation";

export interface PanelProps {
    className?: string;
}

export function Panel({
    className
}: PanelProps) {
    const params = useParams();
    const companyId = params.id as string;

    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.grid}>
                <div className={styles.head}>
                    <div className={styles.title}>Поддержка клиентов</div>
                    <div className={styles.actions}>
                        <Button
                            className={styles.action} 
                            variant='contrast' 
                            icon={<Edit />} 
                            fullWidth
                            as='link'
                            href={`/platform/${companyId}/support/new`}>
                            Открыть тикет
                        </Button>
                    </div>
                </div>
                <div className={styles.tickets}>
                    <TicketCard className={styles.item} />
                    <TicketCard className={styles.item} />
                    <TicketCard className={styles.item} />
                </div>
            </div>
        </div>
    )
}