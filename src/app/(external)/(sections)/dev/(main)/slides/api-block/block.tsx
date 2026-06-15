'use client';

import { PageBlockProps } from "@/app/(external)/_types";
import clsx from "clsx";
import styles from './block.module.scss';
import { DemoBlock } from "@/app/(external)/(sections)/(customers)/(product)/components/demo/block";
import Dev from "@/assets/ui-kit/icons/dev";
import { actions } from "@/app/platform/(company)/[id]/components/injected-panel/actions.config";

export function ApiBlock({
    className
}: PageBlockProps) {
    return (
        <DemoBlock
            className={clsx(className)}
            icon={<Dev />}
            title='API'
            description={<>
            Интегрируйте Kroncl со своими продуктами. Подключите бота в Telegram, чтобы сотрудники вносили доходы и расходы прямо из чата. Встройте учёт в мобильное приложение. Оживите свою CMS.
            </>}
            img='/images/promo/api.png'
            actions={[
                {   
                    variant: 'contrast',
                    as: 'link',
                    href: '/api/apps',
                    children: 'Создать приложение'
                }
            ]}
        />
    )
}