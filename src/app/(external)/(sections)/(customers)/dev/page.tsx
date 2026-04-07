import clsx from 'clsx';
import { HeadBlock } from '../../(about)/slides/head/block';
import styles from './page.module.scss';
import { linksConfig } from '@/config/links.config';
import { StackBlock } from './slides/stack/block';

export default function Page() {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.grid}>
                <HeadBlock className={clsx(styles.block, styles.head)} 
                        title='Разработчикам'
                        description='Забыли про сон, но не забыли открыть репозиторий.'
                        variant='default'
                        location='center'
                        actions={[
                            {as: 'link', children: 'Github', href: linksConfig.developerFrontGithub, variant: 'contrast'}
                        ]}
                    />
                <StackBlock className={styles.block} />
                <div className={styles.intervalFlex}>
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </div>
        </>
    )
}