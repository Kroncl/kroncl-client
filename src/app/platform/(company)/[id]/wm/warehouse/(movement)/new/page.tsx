'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import Plus from "@/assets/ui-kit/icons/plus";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { StockBatch } from "@/apps/company/modules/wm/types";
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { PlatformPagination } from '@/app/platform/components/lib/pagination/pagination';
import { usePagination } from '@/apps/shared/pagination/hooks/usePagination';
import { useWm } from "@/apps/company/modules";
import clsx from "clsx";
import { PlatformEmptyCanvas } from "@/app/platform/components/lib/empty-canvas/canvas";
import TwoCards from "@/assets/ui-kit/icons/two-cards";
import { isAllowed, usePermission } from "@/apps/permissions/hooks";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PlatformError } from "@/app/platform/components/lib/error/block";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { DOCS_LINK_WM } from "@/app/docs/(v1)/internal.config";
import { useRouter } from "next/navigation";

export default function CreateBatchPage() {
    const params = useParams();
    const companyId = params.id as string;

    const wmModule = useWm();
    const pathname = usePathname();
    const ALLOW_PAGE = usePermission(PERMISSIONS.WM_STOCKS_BATCHES_CREATE);

    if (ALLOW_PAGE.isLoading) return <PlatformLoading />;

    if (!isAllowed(ALLOW_PAGE)) return (
        <PlatformNotAllowed permission={PERMISSIONS.WM_STOCKS_BATCHES_CREATE} />
    );

    return (
        <>
            <PlatformHead
                title='Новая поставка/отгрузка'
                description="Создание нового направления движения на складе."
                docsEscort={{
                    href: DOCS_LINK_WM,
                    title: 'Подробнее о каталоге & складе'
                }}
            />

        </>
    );
}