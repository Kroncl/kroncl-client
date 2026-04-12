import clsx from 'clsx';
import styles from './widget.module.scss';
import Input from '@/assets/ui-kit/input/input';
import Button from '@/assets/ui-kit/button/button';
import Package from '@/assets/ui-kit/icons/package';

export interface MailingSubscribeWidgetProps {
    className?: string;
}

export function MailingSubscribeWidget({
    className
}: MailingSubscribeWidgetProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <Input className={styles.input} placeholder='Подписаться на рассылку' variant='glass' />
            <Button className={styles.action} variant='contrast' icon={<Package />} />
        </div>
    )
}