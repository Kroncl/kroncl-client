'use client';

import clsx from "clsx";
import styles from './card.module.scss';
import { Doc } from "@/apps/company/modules/docs/types";
import { shortenId } from "@/assets/utils/ids";
import { useParams } from "next/navigation";
import { CompanyApi } from "@/apps/company/api";
import { storageMediaModule } from "@/apps/company/modules/storage/media/api";
import { useState } from "react";
import { saveAs } from 'file-saver';
import { IS_PRODUCTION } from "@/config/env.config";
import { formatDate, formatDateTime } from "@/assets/utils/date";
import { getModuleLabel, getTypeLabel } from "../../utils";
import Button from "@/assets/ui-kit/button/button";

export interface DocCardProps {
    className?: string;
    doc: Doc;
}

export function DocCard({
    className,
    doc
}: DocCardProps) {
    const params = useParams();
    const companyId = params.id as string;
    const companyApi = new CompanyApi(companyId);
    const storageMedia = storageMediaModule(companyApi);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            if (IS_PRODUCTION) {
                // В проде — открываем пресайгн ссылку в новой вкладке
                const url = await storageMedia.getFileUrl(doc.object_path);
                window.open(url, '_blank');
            } else {
                // В деве — скачиваем через API и сохраняем
                const blob = await storageMedia.getFile(doc.object_path);
                const filename = doc.object_path.split('/').pop() || `document_${shortenId(doc.id)}`;
                saveAs(blob, filename);
            }
        } catch (error) {
            console.error('Failed to get file:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className={clsx(styles.container, className, isLoading && styles.loading)}>
            <div className={styles.id}>Документ #{shortenId(doc.id)}</div>
            <div className={styles.comment}>{doc.comment}</div>
            <div className={styles.module}>{getModuleLabel(doc.module)}</div>
            <div className={styles.type}>{getTypeLabel(doc.type)}</div>
            <div className={styles.date}>{formatDateTime(doc.created_at)}</div>
            
            <div className={styles.actions}>
                <Button 
                    className={styles.action}
                    variant="accent"
                    onClick={handleClick}
                    children={IS_PRODUCTION ? 'Открыть' : 'Скачать'}
                    disabled={isLoading ? true : false}
                />
            </div>
        </div>
    );
}