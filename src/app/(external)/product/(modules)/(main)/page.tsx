import clsx from 'clsx';
import styles from './page.module.scss';
import { Slide } from '@/app/(external)/components/slide/slide';
import StartSlide from './slides/start-slide/slide';

export default function ModulesMainPage() {
    return (
        <>
        <Slide className={clsx(styles.slide)}><StartSlide className={styles.slideContent} /></Slide>
        </>
    )
}