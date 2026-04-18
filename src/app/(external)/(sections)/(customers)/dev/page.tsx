import clsx from 'clsx';
import { HeadBlock } from '../../(about)/slides/head/block';
import styles from './page.module.scss';
import { linksConfig } from '@/config/links.config';
import { StackBlock } from './slides/stack/block';
import { ReadyToStartBlock } from '../businessmans/blocks/ready-to-start/block';

export default function Page() {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.grid}>
                <HeadBlock className={clsx(styles.block, styles.startHead, styles.head)} 
                        title='Что внутри Kroncl?'
                        description='Забыли про сон, но не забыли открыть репозиторий.'
                        variant='default'
                        location='center'
                        actions={[
                            {as: 'link', children: 'Github', href: linksConfig.developerGithub, variant: 'contrast'}
                        ]}
                    />
                <div className={styles.intervalFlex}>
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
                <StackBlock className={styles.block} />
                <div className={styles.intervalFlex}>
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
                <HeadBlock className={clsx(styles.block, styles.head)} 
                        title='Присоединиться?'
                        description='Присоединиться к созданию Kroncl.'
                        variant='default'
                        location='left'
                        actions={[
                            {as: 'link', children: 'Напишите нам', href: linksConfig.developerGithub, variant: 'accent'}
                        ]}
                    />
                <ReadyToStartBlock className={styles.block} />
            </div>
        </div>
        </>
    )
}