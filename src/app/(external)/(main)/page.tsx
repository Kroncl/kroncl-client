import clsx from 'clsx';
import StartSlide from './(slides)/start-slide/slide';
import styles from './page.module.scss';
import ForkSlide from './(slides)/fork-slide/slide';

export default function MainPage() {
    return (
        <>
        <StartSlide className={clsx(styles.slide)} />
        <ForkSlide className={clsx(styles.slide)} />
        </>
    )
}