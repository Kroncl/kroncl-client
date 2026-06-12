'use client';

import clsx from 'clsx';
import styles from './block.module.scss';
import { JsonField } from './utils';

export interface MDXJsonSchemaBlockProps {
    className?: string;
    title?: string;
    app?: string;
    fields?: JsonField[];
}

export function MDXJsonSchemaBlock({
    className,
    title = 'JSON_SCHEMA',
    app = 'application/json',
    fields
}: MDXJsonSchemaBlockProps) {
    if (!fields || fields.length === 0) return null;

    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.head}>
                <div className={styles.title}>{title}:</div>
                <div className={styles.app}>{app}</div>
            </div>
            <div className={styles.body}>
                {fields.map((field, index) => (
                    <div key={index} className={styles.field}>
                        <div className={clsx(styles.col, styles.identy)}>
                            <span className={styles.code}>{field.code}</span>
                            <span className={clsx(styles.tag, field.required && styles.required)}>
                                {field.required ? 'required' : 'optional'}
                            </span>
                        </div>
                        <div className={clsx(styles.col, styles.info)}>
                            <div className={styles.type}>{field.type}</div>
                            {field.type === 'enum' && (
                                <div className={styles.enum}>
                                    {field.enum?.map((val, index) => (
                                        <span key={index} className={styles.value}>{val}</span>
                                    ))}
                                </div>
                            )}
                            <div className={styles.title}>{field.title || field.code}</div>
                            <div className={styles.description}>{field.description || ''}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}