'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import clsx from 'clsx';
import styles from './block.module.scss';

function getCssVar(name: string): string {
    if (typeof window === 'undefined') return '#333';
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || '#333';
}

function initMermaid() {
    mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
            primaryColor: getCssVar('--color-surface-glass'),
            primaryBorderColor: getCssVar('--color-stroke-primary'),
            primaryTextColor: getCssVar('--color-text-primary'),
            lineColor: getCssVar('--color-stroke-secondary'),
            secondaryColor: getCssVar('--color-surface-glass-secondary'),
            tertiaryColor: getCssVar('--color-surface-primary'),
        },
    });
}

export interface MDXMermaidBlockProps {
    className?: string;
    chart: string;
    title?: string;
}

export function MDXMermaBlock({
    className,
    chart,
    title
}: MDXMermaidBlockProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        initMermaid();
    }, []);

    useEffect(() => {
        if (!chart) return;

        const renderChart = async () => {
            try {
                const id = `mermaid-${Math.random().toString(36).substring(2, 8)}`;
                const { svg: renderedSvg } = await mermaid.render(id, chart);
                setSvg(renderedSvg);
                setError(null);
            } catch (err: any) {
                setError(err?.message || 'Failed to render chart');
                setSvg('');
            }
        };

        renderChart();
    }, [chart]);

    return (
        <div className={clsx(styles.container, className)}>
            {title && <div className={styles.title}>{title}</div>}
            <div className={styles.body}>
                {error ? (
                    <div className={styles.error}>{error}</div>
                ) : (
                    <div
                        ref={containerRef}
                        className={styles.svg}
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                )}
            </div>
        </div>
    );
}