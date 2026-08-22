import clsx from 'clsx';
import StartSlide from './(slides)/start-slide/slide';
import styles from './page.module.scss';
import { Slide } from '../components/slide/slide';
import ForkSlide from './(slides)/fork-slide/slide';
import TargetAudienceSlide from './(slides)/target-audience-slide/slide';
import ProblemsSlide from './(slides)/problems-slide/slide';

export default function MainPage() {
    return (
        <>
        <Slide className={clsx(styles.slide)}><StartSlide className={styles.slideContent} /></Slide>
        <Slide className={clsx(styles.slide)}><ForkSlide className={styles.slideContent} /></Slide>
        <Slide className={clsx(styles.slide)}><TargetAudienceSlide className={styles.slideContent} /></Slide>
        <Slide className={clsx(styles.slide)}><ProblemsSlide className={styles.slideContent} /></Slide>
        </>
    )
}