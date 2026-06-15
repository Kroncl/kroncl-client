'use client';

import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';
import clsx from 'clsx';
import styles from './block.module.scss';

export interface MDXCodeBlockProps {
    className?: string;
    code: string;
    language?: string;
    title?: string;
}

export function MDXCodeBlock({
    className,
    code,
    language = 'json',
    title
}: MDXCodeBlockProps) {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current, false);
        }
    }, [code]);
    return (
        <div className={clsx(styles.container, className)}>
            {title && <div className={styles.title}>{title}</div>}
            <pre className={clsx(styles.pre, `language-${language}`)} tabIndex={-1}>
                <code ref={codeRef} className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        </div>
    );
}