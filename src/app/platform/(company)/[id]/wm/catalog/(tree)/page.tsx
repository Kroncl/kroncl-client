'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { useSideContent } from "@/app/platform/components/side-content/context";
import Plus from "@/assets/ui-kit/icons/plus";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { sectionsList } from "../_sections";
import styles from './page.module.scss';
import { CategoryCard } from "../components/category-card/card";
import { useEffect, useState } from 'react';
import { CategoriesResponse, CatalogCategory } from '@/apps/company/modules/wm/types';
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
import { CatalogTree } from "./components/tree/block";

export default function CatalogPage() {
    const params = useParams();
    const companyId = params.id as string;

    // perms
    const ALLOW_PAGE = usePermission(PERMISSIONS.WM_CATALOG)

    if (!isAllowed(ALLOW_PAGE)) return (
        <PlatformNotAllowed permission={PERMISSIONS.WM_CATALOG} />
    )

    return (
        <>
            <PlatformHead
                title='Каталог'
                description="Управление товарным предложением компании. Структура каталога: категории, подкатегории, товарные позиции."
                sections={sectionsList(companyId)}
                docsEscort={{
                    href: DOCS_LINK_WM,
                    title: 'Подробнее о каталоге & складе'
                }}
            />
            <CatalogTree className={styles.tree} />
        </>
    );
}