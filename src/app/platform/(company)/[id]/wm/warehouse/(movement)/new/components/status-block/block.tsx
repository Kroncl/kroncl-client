'use client';

import { StockBatchStatus } from "@/apps/company/modules/wm/types";
import clsx from "clsx";
import styles from './block.module.scss';
import Edit from "@/assets/ui-kit/icons/edit";
import TwoCards from "@/assets/ui-kit/icons/two-cards";
import SuccessStatus from "@/assets/ui-kit/icons/success-status";
import ErrorStatus from "@/assets/ui-kit/icons/error-status";

export interface StatusBlockProps {
    className?: string;
    status: StockBatchStatus;
}

type Step = {
    status: StockBatchStatus;
    label: string;
    icon: React.ReactNode;
};

const STEPS: Step[] = [
    { status: 'draft',     label: 'Черновик',        icon: <Edit /> },
    { status: 'labeled',   label: 'Этикетки напечатаны', icon: <TwoCards /> },
    { status: 'confirmed', label: 'Подтверждено',    icon: <SuccessStatus /> },
    { status: 'cancelled', label: 'Отменено',        icon: <ErrorStatus /> },
];

export function StatusBlock({
    className,
    status
}: StatusBlockProps) {
    const activeIndex = STEPS.findIndex(s => s.status === status);

    return (
        <div className={clsx(styles.container, className)}>
            {STEPS.map((step, index) => (
                <div
                    key={step.status}
                    className={clsx(
                        styles.col,
                        index === activeIndex && styles.active
                    )}
                >
                    {step.icon}
                    <div className={styles.capture}>{step.label}</div>
                </div>
            ))}
        </div>
    );
}