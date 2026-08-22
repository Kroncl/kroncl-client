'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';

interface ProblemProps {
    className?: string;
    title: string;
    problem: string;
    solution: string;
}

function Problem({
    className,
    title,
    problem,
    solution
}: ProblemProps) {
    return (
        <div className={clsx(className)}>

        </div>
    )
}

export default function ProblemsSlide({
    className
}: PageBlockProps) {
    const problemsList: ProblemProps[] = [
        {
            title: 'Финансовый беспорядок',
            problem: 'Сделки есть, клиенты есть - денег под конец месяца не остаётся.',
            solution: 'Финансовый модуль Kroncl учитывает все финансовые операции предприятия для каждой сделки. Конец учётного периода - готовая отчётность о рентабельности вашего дела.'
        },
        {
            title: 'Финансовый беспорядок',
            problem: 'Сделки есть, клиенты есть - денег под конец месяца не остаётся.',
            solution: 'Финансовый модуль Kroncl учитывает все финансовые операции предприятия для каждой сделки. Конец учётного периода - готовая отчётность о рентабельности вашего дела.'
        },
        {
            title: 'Финансовый беспорядок',
            problem: 'Сделки есть, клиенты есть - денег под конец месяца не остаётся.',
            solution: 'Финансовый модуль Kroncl учитывает все финансовые операции предприятия для каждой сделки. Конец учётного периода - готовая отчётность о рентабельности вашего дела.'
        },
        {
            title: 'Финансовый беспорядок',
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