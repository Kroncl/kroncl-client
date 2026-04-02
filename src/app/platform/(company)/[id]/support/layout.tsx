'use client';

import React from 'react';
import styles from './layout.module.scss';
import { TicketCard } from './components/ticket-card/card';
import Button from '@/assets/ui-kit/button/button';
import Edit from '@/assets/ui-kit/icons/edit';
import { useParams } from 'next/navigation';
import { Panel } from './components/panel/panel';

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.container}>
            <Panel className={styles.panel} />
            <div className={styles.content}>{children}</div>
        </div>
    )
}