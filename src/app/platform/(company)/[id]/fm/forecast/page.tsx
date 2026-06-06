'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import styles from './page.module.scss';

export default function Page() {
    return (
        <>
        <PlatformHead
            title='Прогнозирование финансов'
            description='Прогноз состояния финансов на основании истории операций компании'
        />
        </>
    )
}