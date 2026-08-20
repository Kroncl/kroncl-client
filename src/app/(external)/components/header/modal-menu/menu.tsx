import clsx from 'clsx';
import { NavigationSubItem } from '../navigation.config';
import styles from './menu.module.scss';
import Link from 'next/link';
import Button from '@/assets/ui-kit/button/button';
import { authLinks, linksConfig } from '@/config/links.config';
import { LogoFull } from '@/assets/ui-kit/logo/full/full';
import Kanban from '@/assets/ui-kit/icons/kanban';
import Github from '@/assets/ui-kit/logos/github';

export interface ModalMenuProps {
    className?: string;
    items?: NavigationSubItem[];
}

export function ModalMenu({
    className,
    items
}: ModalMenuProps) {
    return (
        <div className={clsx(styles.menu, className)}>
            <div className={styles.preview}>
                <div className={styles.label}></div>
                <div className={styles.info}>
                    <div className={styles.title}>
                        Разъёбывайте эти опелевские генераторы
                    </div>
                    <div className={styles.description}>
                        Прежде чем приступить к программированию, сделайте домашнее задание, чтобы спроектировать и спланировать отличное приложение.
                    </div>
                </div>
                <div className={styles.actions}>
                    <Button 
                        border='round'
                        variant='accent'
                        children='Начните сейчас'
                        className={styles.action}
                    />
                </div>
            </div>
            <div className={styles.content}>

            </div>
        </div>
    )
}