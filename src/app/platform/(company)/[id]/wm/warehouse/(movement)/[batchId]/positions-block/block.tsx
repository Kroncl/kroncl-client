'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import Input from "@/assets/ui-kit/input/input";
import Close from "@/assets/ui-kit/icons/close";
import { PositionWithUnit } from "@/apps/company/modules/wm/types";

export interface PositionsBlockProps {
    className?: string;
    positions: PositionWithUnit[];
}

export function PositionsBlock({
    className,
    positions
}: PositionsBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.head}>

            </div>
            <div className={styles.grid}>

            </div>
        </div>
    );
}