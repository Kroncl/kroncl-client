'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import {
    PlatformFormBody,
    PlatformFormSection,
    PlatformFormTextarea,
} from "@/app/platform/components/lib/form";

export interface BatchInfoBlockProps {
    className?: string;
    comment: string;
    onCommentChange?: (value: string) => void;
    readonly?: boolean;
}

export function BatchInfoBlock({
    className,
    comment,
    onCommentChange,
    readonly = false,
}: BatchInfoBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.head}>
                <div className={styles.title}>Другая информация</div>
                <div className={styles.description}></div>
            </div>
            <PlatformFormBody className={styles.form}>
                <PlatformFormSection
                    title='Комментарий ответственного'
                    description={readonly ? 'Изменить нельзя' : 'Если товары имеют особенности или дефекты — зафиксируйте в текстовом виде.'}
                >
                    <PlatformFormTextarea
                        placeholder=""
                        fullWidth
                        value={comment}
                        onChange={onCommentChange}
                        readOnly={readonly}
                    />
                </PlatformFormSection>
            </PlatformFormBody>
        </div>
    );
}