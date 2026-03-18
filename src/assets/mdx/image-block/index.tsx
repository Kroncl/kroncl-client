'use client';

import clsx from 'clsx';
import styles from './block.module.scss';

export interface MDXImageBlockProps {
    className?: string;
    src?: string;
    label?: string;
}

export function MDXImageBlock({
    className,
    src,
    label
}: MDXImageBlockProps) {
    
    if (!src && !label) {
        label = 'Упс, изображение на загрузилось...';
    }

    const handleImageClick = () => {
        if (src) {
            window.open(src, '_blank');
        }
    };

    return (
        <div className={clsx(styles.image, className)}>
            {src ? (
                <img 
                    src={src} 
                    onClick={handleImageClick}
                    style={{ cursor: 'pointer' }}
                />
            ) : (
                <div className={styles.plug}></div>
            )}
            {label && (<div className={styles.label}>{label}</div>)}
        </div>
    )
}