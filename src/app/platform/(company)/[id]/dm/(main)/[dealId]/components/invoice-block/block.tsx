'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import { DealBlock } from "../block/block";
import { PlatformFormBody, PlatformFormInput, PlatformFormSection, PlatformFormTextarea, PlatformFormUnify } from "@/app/platform/components/lib/form";
import Button from "@/assets/ui-kit/button/button";
import { PositionCard } from "./components/position-card/card";

export interface InvoiceBlockProps {
    className?: string;
    dealId: string;
}

export function InvoiceBlock({
    className,
    dealId
}: InvoiceBlockProps) {
    return (
        <>
        <DealBlock
            // actions={[
            //     {
            //         children: 'Сгенерировать',
            //         variant: 'accent',
            //     }
            // ]}
            className={className}>

            <div className={clsx(styles.container)}>
                <div className={styles.info}>
                    <PlatformFormBody className={styles.form}>
                        <PlatformFormSection
                            className={clsx(styles.section)}
                            title='Состав сделки'
                            description='Товарные позиции. Можно менять порядок.'
                            >
                            <div className={styles.structure}>
                                <div className={styles.positions}>
                                    <PositionCard
                                        className={styles.item}
                                    />
                                    <PositionCard
                                        className={styles.item}
                                    />
                                    <PositionCard
                                        className={styles.item}
                                    />
                                    <PositionCard
                                        className={styles.item}
                                    />
                                </div>
                                <div className={styles.actions}>
                                    <Button
                                        children='Добавить позицию'
                                        fullWidth
                                        variant='accent'
                                        className={styles.action} />
                                </div>
                            </div>
                        </PlatformFormSection>

                        <PlatformFormSection 
                            className={styles.section}
                            title='Реквизиты' 
                            description='Шаблонные данные накладной'
                            >
                            <PlatformFormUnify>
                                <PlatformFormInput 
                                    placeholder="Юридическое наименование"
                                    />
                                <PlatformFormInput 
                                    placeholder="ИНН"
                                    />
                            </PlatformFormUnify>
                            <PlatformFormInput
                                placeholder="ОГРН/ОГРНИП"
                            />
                            <PlatformFormInput
                                placeholder="Банк-регистратор"
                            />
                        </PlatformFormSection>

                        
                        <PlatformFormSection 
                            className={styles.section}
                            title='Условия гарантии' 
                            description='Опциональный блок документа'
                            >
                            <PlatformFormTextarea
                                placeholder="..."
                            />
                        </PlatformFormSection>
                        
                        <PlatformFormSection 
                            className={styles.section}
                            title='Дополнительные условия' 
                            description='Любые дополнительные условия продажи'
                            >
                            <PlatformFormTextarea
                                placeholder="..."
                            />
                        </PlatformFormSection>
                    </PlatformFormBody>
                </div>
                <div className={styles.preview}>

                </div>
            </div>
        </DealBlock>
        </>
    )
}