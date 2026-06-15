import clsx from 'clsx';
import styles from './block.module.scss';
import Code from '@/assets/ui-kit/icons/code';
import Button, { ButtonProps } from '@/assets/ui-kit/button/button';

export interface DemoBlockProps {
    className?: string;
    img: string;
    title: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    actions?: ButtonProps[];
}

export function DemoBlock({
    className,
    title,
    description,
    icon,
    img,
    actions
}: DemoBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.col}>
                {icon && (<div className={styles.icon}>{icon}</div>)}
                <div className={styles.title}>{title}</div>
                {description && (<div className={styles.description}>{description}</div>)}
                {actions && (
                    <div className={styles.actions}>
                        {actions.map((action, index) => (
                            <Button className={styles.action} {...action} key={index} />
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.col}>
                <img src={img} className={styles.img} />
            </div>
        </div>
    )
}