'use client';

import clsx from 'clsx';
import styles from './block.module.scss';

export interface Component {
    name: string;
    is_ready: boolean;
    stage: string;
}

export interface ProvisioningBlockProps {
    className?: string;
    components: Component[];
}

function ComponentItem({
    name,
    is_ready,
    stage
}: Component) {
    return (
        <div className={clsx(styles.item, is_ready && styles.ready)}>
            <div className={clsx(styles.name)}>
                {name}
            </div>
            <div className={clsx(styles.stage)}>
                {is_ready ? 'Готово' : stage}
            </div>
        </div>
    )
}

export function ProvisioningBlock({
    className,
    components
}: ProvisioningBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            {components.map((component, index) => (
                <ComponentItem key={index} {...component} />
            ))}
        </div>
    )
}