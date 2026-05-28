'use client';

import clsx from 'clsx';
import styles from './page.module.scss';
import { LogoIco } from '@/assets/ui-kit/logo/ico/ico';

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}><LogoIco className={styles.icon} /></div>
                <div className={styles.search}><span /></div>
                <div className={styles.avatar}><span /></div>
            </div>
            <div className={styles.area}>
                <div className={styles.panel}>
                    <div className={styles.sections}>
                        <span className={styles.section} />
                        <span className={styles.section} />
                        <span className={clsx(styles.section, styles.active)} />
                        <span className={styles.section} />
                        <span className={styles.section} />
                        <span className={styles.section} />
                    </div>
                    <div className={styles.subSections}>
                        <span className={styles.section} />
                        <span className={styles.section} />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.breadcrumbs}></div>
                    <div className={styles.active}>
                        <div className={clsx(styles.title, styles.plug)} />
                        <div className={clsx(styles.about, styles.plug)} />
                        <div className={clsx(styles.about, styles.plug)} />
                        <div className={clsx(styles.about, styles.plug)} />
                        <div className={clsx(styles.about, styles.plug)} />
                        <div className={clsx(styles.about, styles.plug, styles.last)} />

                        <span className={clsx(styles.inter, styles.plug)} />
                        
                        <div className={styles.variants}>
                            <span className={styles.plug} />
                            <span className={styles.plug} />
                            <span className={styles.plug} />
                            <span className={styles.plug} />
                            <span className={styles.plug} />
                            <span className={styles.plug} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}