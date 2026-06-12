import clsx from 'clsx';
import styles from './block.module.scss';
import Button from '@/assets/ui-kit/button/button';
import { linksConfig } from '@/config/links.config';
import Compass from '@/assets/ui-kit/icons/compass';

export interface StartBlockProps {
    className?: string;
}

export function StartBlock({
    className
}: StartBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>

            <div className={styles.area}>
                <div className={styles.title}>Разработчикам</div>
                <div className={styles.actions}>
                    <Button as='link' href={linksConfig.developerGithub} variant='glass' className={styles.action}>Github</Button>
                    <Button as='link' icon={<Compass />} href={linksConfig.developerApi} variant='contrast' className={styles.action}>API &nbsp;</Button>
                </div>
                <div className={styles.subTitle}>
                    <span className={styles.blue}>открытый код</span>
                    <br />для ваших проектов
                </div>
                <div className={styles.description}>Kroncl Volunteers</div>
            </div>

            <div className={styles.topLeft}>
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
            </div>
            
            <div className={styles.topRight}>
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
            </div>

            <div className={styles.bottomLeft}>
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
            </div>

            <div className={styles.bottomRight}>
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
                <span className={styles.box} />
            </div>
        </div>
    )
}