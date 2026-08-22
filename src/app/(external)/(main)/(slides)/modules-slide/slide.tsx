'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';
import Link from 'next/link';
import React from 'react';
import Wallet from '@/assets/ui-kit/icons/wallet';

interface ModuleProps {
    className?: string;
    name: string;
    description: string;
    icon?: React.ReactNode;
    link: string;
}

function Module({
    className,
    name,
    description,
    icon,
    link
}: ModuleProps) {
    return (
        <Link href={link} className={className}>
            <div className={styles.name}>{name}</div>
            <div className={styles.description}>{description}</div>
            <div className={styles.actions}>
                <Button
                    children='Читать больше'
                    text='bold'
                    variant='contrast'
                    border='round'
                    className={styles.action}
                />
            </div>
        </Link>
    )
}

export default function ModulesSlide({
    className
}: PageBlockProps) {
    const modules: ModuleProps[] = [
        {
            name: 'Финансы',
            description: 'Вы всегда видите реальное состояние бизнеса: баланс, доходы и расходы, долги. Ошиблись в проводке? Не нужно ничего удалять — достаточно сделать сторно. Вы знаете, кто из сотрудников принёс деньги, а кто создал расход. Аналитика помогает вовремя заметить кассовый разрыв.',
            icon: <Wallet />,
            link: '/',
        },
        {
            name: 'Сотрудники',
            description: 'Сотрудник появляется в отчётности сразу — не нужно ждать регистрации в системе. Назначили должность — права доступа подтянулись автоматически. Уволился? Деактивируйте карточку, данные не теряются. Привязали аккаунт — сотрудник работает сам. Не привязали — вы ведёте учёт за него. Полный контроль даже без компьютеров у сотрудников.',
            icon: <Wallet />,
            link: '/',
        },
        {
            name: 'Каталог & Склад',
            description: 'Стройте ассортимент удобно: категории, единицы измерения, цены. Учитывайте товары поштучно или партиями (FIFO/LIFO). История поставок и отгрузок даёт точный остаток в реальном времени. Видите, что залёживается, а что уходит — вовремя корректируете закупки.',
            icon: <Wallet />,
            link: '/',
        },
        {
            name: 'Клиенты',
            description: 'Вся база клиентов с историей и статусами в одном месте. Знаете, откуда пришёл каждый клиент — оцениваете эффективность каналов привлечения. Отслеживаете динамику: новые, активные, ушедшие. Планируете продажи на реальных данных.',
            icon: <Wallet />,
            link: '/',
        },
        {
            name: 'Сделки',
            description: 'Ведите заказы в канбане от первого обращения до закрытия. В карточке всё вместе: клиент, состав, ответственные, финансы. Меняете состав заказа за пару кликов. Каждая сделка автоматически влияет на финансовую отчётность — без двойного ввода.',
            icon: <Wallet />,
            link: '/',
        },
        {
            name: 'Контрагенты',
            description: 'Ведите заказы в канбане от первого обращения до закрытия. В карточке всё вместе: клиент, состав, ответственные, финансы. Меняете состав заказа за пару кликов. Каждая сделка автоматически влияет на финансовую отчётность — без двойного ввода.',
            icon: <Wallet />,
            link: '/',
        },
    ];

    return (
        <>
        <div className={clsx(styles.slide, className)}>
            <div className={styles.info}>
                <div className={styles.capture}>6 модулей <br />вашего предприятия<br />в облаке</div>
                <div className={styles.description}>
                    Важной особенностью платформы является мультиорганизационная архитектура, благодаря которой вы можете иметь один аккаунт в системе и десятки (а иногда и больше) организаций.
                </div>
                <div className={styles.actions}>
                    <Button
                        as='link'
                        href='/'
                        children='Подробно о модулях'
                        text='bold'
                        variant='contrast'
                        border='round'
                        className={styles.action}
                    />
                </div>
            </div>
            <div className={styles.grid}>
                {modules.map((item, index) => (
                    <Module className={styles.col} {...item} key={index} />
                ))}
            </div>
        </div>
        </>
    )
}