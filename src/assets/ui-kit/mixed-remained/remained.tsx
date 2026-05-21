import clsx from 'clsx';
import styles from './remained.module.scss';
import { useState } from 'react';
import { ModalTooltip } from '@/app/components/tooltip/tooltip';

export interface MixedSegment {
    value: number;
    limit: number;
    label: string;
    color: string;
    formatter?: (value: number) => string;
}

export interface MixedRemainedProps {
    className?: string;
    segments: MixedSegment[];
    loading?: boolean;
    children?: React.ReactNode;
}

export function MixedRemained({
    className,
    segments,
    loading = false,
    children
}: MixedRemainedProps) {
    const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
    
    const defaultFormatter = (value: number) => value.toLocaleString('ru-RU');
    
    const getPercent = (value: number, limit: number) => {
        if (limit <= 0) return 0;
        return Math.min((value / limit) * 100, 100);
    };
    
    return (
        <div className={clsx(styles.container, className)}>
            {children && (<div className={styles.text}>{children}</div>)}
            <div className={clsx(styles.mixedSlug, loading && styles.loading)}>
                {segments.map((segment, index) => {
                    const percent = getPercent(segment.value, segment.limit);
                    const formatter = segment.formatter || defaultFormatter;
                    const isExceed = segment.value > segment.limit;
                    
                    return (
                        <div
                            key={index}
                            className={styles.segmentWrapper}
                            onMouseEnter={() => setHoveredSegment(index)}
                            onMouseLeave={() => setHoveredSegment(null)}
                        >
                            <ModalTooltip content={segment.label} side='bottom' compact> 
                            <div className={styles.segmentBar}>
                                <div 
                                    className={clsx(styles.segmentFill, isExceed && styles.exceed)}
                                    style={{ 
                                        width: `${percent}%`,
                                        backgroundColor: segment.color 
                                    }}
                                />
                            </div>
                            </ModalTooltip>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}