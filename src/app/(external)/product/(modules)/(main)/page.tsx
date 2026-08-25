import clsx from 'clsx';
import styles from './page.module.scss';
import { Slide } from '@/app/(external)/components/slide/slide';
import StartSlide from './slides/start-slide/slide';
import ModuleSlide from './slides/module-slide/slide';
import { modulesConfig } from './_modules';
import CommunitySlide from '@/app/(external)/(main)/(slides)/community-slide/slide';

export default function ModulesMainPage() {
    return (
        <>
        <Slide className={clsx(styles.slide)}><StartSlide className={styles.slideContent} /></Slide>
        
        {/** modules */}
        {modulesConfig.map((item, index) => (
            <Slide className={clsx(styles.slide)} key={index}><ModuleSlide {...item} className={styles.slideContent} /></Slide>
        ))}

        <Slide className={clsx(styles.slide)}><CommunitySlide className={styles.slideContent} /></Slide>
        </>
    )
}