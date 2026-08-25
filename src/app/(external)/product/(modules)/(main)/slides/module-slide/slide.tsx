'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import Button from '@/assets/ui-kit/button/button';

export interface ModuleFeature {
    className?: string;
    title: string;
    description?: string;
    icon?: React.ReactNode;
}

export interface ModuleSlideProps {
    className?: string;
    name: string;
    link: string;
    description?: string;
    icon?: React.ReactNode;
    mockUp?: string;
    features?: ModuleFeature[];
}

function ModuleFeatureBlock({
    className,
    title,
    description,
    icon,
}: ModuleFeature) {
    return (
        <div className={clsx(className)}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
        </div>
    )
}

export default function ModuleSlide({
    className,
    name,
    description,
    link,
    icon,
    features,
    mockUp
}: ModuleSlideProps) {
    return (
        <>
        <div className={clsx(styles.slide, className)}>
            <div className={styles.col}>
                <div className={styles.info}>
                    <div className={styles.subTitle}>МОДУЛЬ</div>
                    <div className={styles.title}>
                        {icon && (<span className={styles.icon}>{icon}</span>)}
                        <span className={styles.name}>{name}</span>
                    </div>
                    {description && (<div className={styles.description}>{description}</div>)}
                    <div className={styles.actions}>
                        <Button 
                            className={clsx(styles.button)}
                            as="a"
                            variant='contrast'
                            text='bold'
                            border='round'
                            href={link}
                            children='О модуле'
                        />
                    </div>
                </div>
                <div className={styles.preview}>
                    {mockUp && (<img src={mockUp} className={styles.mockUp} />)}   
                </div>
            </div>
            {features && (<div className={styles.col}>
                {features.map((item, index) => (
                    <ModuleFeatureBlock className={styles.feature} {...item} key={index} />
                ))}
            </div>)}
        </div>
        </>
    )
}