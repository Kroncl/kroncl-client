'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';
import React from 'react';
import Wallet from '@/assets/ui-kit/icons/wallet';
import Team from '@/assets/ui-kit/icons/team';
import Kanban from '@/assets/ui-kit/icons/kanban';
import Package from '@/assets/ui-kit/icons/package';
import Time from '@/assets/ui-kit/icons/time';

interface ProblemProps {
    className?: string;
    title: string;
    problem: string;
    solution: string;
    icon?: React.ReactNode;
}

function Problem({
    className,
    title,
    problem,
    solution,
    icon
}: ProblemProps) {
    return (
        <div className={clsx(className)}>
            <div className={styles.info}>
                <div className={styles.title}>{title}</div>
                <div className={styles.problem}>{problem}</div>
                <div className={styles.solution}>{solution}</div>
            </div>
            {icon && (<div className={styles.icon}>{icon}</div>)}
        </div>
    )
}

export default function ProblemsSlide({
    className
}: PageBlockProps) {
    const problemsList: ProblemProps[] = [
        {
            icon: <Wallet />,
            title: 'Финансовый беспорядок',
            problem: 'Сделки есть, клиенты есть - денег под конец месяца не остаётся.',
            solution: 'Финансовый модуль Kroncl учитывает все финансовые операции предприятия для каждой сделки. Конец учётного периода - готовая отчётность о рентабельности вашего дела.'
        },
        {
            icon: <Time />,
            title: 'Избыточность тяжёлых ERP и недостаток Excel',
            problem: 'Сделки есть, клиенты есть - денег под конец месяца не остаётся.',
            solution: 'Финансовый модуль Kroncl учитывает все финансовые операции предприятия для каждой сделки. Конец учётного периода - готовая отчётность о рентабельности вашего дела.'
        },
        {
            icon: <Kanban />,
            title: 'Беспорядочность сделок',
            problem: 'Сделки есть, клиенты есть - денег под конец месяца не остаётся.',
            solution: 'Финансовый модуль Kroncl учитывает все финансовые операции предприятия для каждой сделки. Конец учётного периода - готовая отчётность о рентабельности вашего дела.'
        },
        {
            icon: <Package />,
            title: 'Складские недосдачи',
            problem: 'Сделки есть, клиенты есть - денег под конец месяца не остаётся.',
            solution: 'Финансовый модуль Kroncl учитывает все финансовые операции предприятия для каждой сделки. Конец учётного периода - готовая отчётность о рентабельности вашего дела.'
        },
    ]

    return (
        <div className={clsx(styles.slide, className)}>
            <div className={styles.capture}>Мы знаем о ваших проблемах <br /> и предлагаем решения</div>
            <div className={styles.grid}>
                {problemsList.map((item, index) => (
                    <Problem className={styles.col} {...item} key={index} />
                ))}
            </div>
        </div>
    )
}