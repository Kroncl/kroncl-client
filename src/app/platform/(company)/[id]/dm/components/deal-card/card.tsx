'use client';

import clsx from "clsx";
import styles from './card.module.scss';
import { EmployeeCard } from "../../../hrm/components/employee-card/card";
import { ClientCard } from "../../../crm/components/client-card/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Deal } from "@/apps/company/modules/dm/types";
import { formatDate } from "@/assets/utils/date";

export interface DealCardProps {
    deal: Deal;
    className?: string;
    compact?: boolean;
}

export function DealCard({
    deal,
    className,
    compact = false
}: DealCardProps) {
    const params = useParams();
    const companyId = params.id as string;

    const getDisplayId = () => {
        const shortId = deal.id.split('-')[0].toUpperCase();
        return `СД-${shortId}`;
    };

    return (
        <div className={clsx(styles.deal, className)}>
            <div className={styles.info}>
                <div className={styles.date}>от {formatDate(deal.created_at)}</div>
                <div className={styles.title}>{getDisplayId()}</div>
            </div>
            
            {deal.client && (
                <ClientCard 
                    className={styles.client}
                    variant="minimalistic"
                    client={deal.client}
                />
            )}

            {deal.employees && deal.employees.length > 0 && (
                <div className={styles.employees}>
                    <div className={styles.capture}>Ответственные</div>
                    <div className={styles.items}>
                        {deal.employees.map((employee) => (
                            <Link 
                                key={employee.id}
                                href={`/platform/${companyId}/hrm/${employee.id}`} 
                                className={styles.link}
                            >
                                {employee.first_name} {employee.last_name || ''}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {deal.comment && (
                <div className={styles.comment}>
                    {deal.comment}
                </div>
            )}
        </div>
    );
}