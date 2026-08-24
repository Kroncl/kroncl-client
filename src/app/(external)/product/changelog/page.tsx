import clsx from 'clsx';
import styles from './page.module.scss';
import { Slide } from '../../components/slide/slide';

export default function ChangelogPage() {
    return (
        <>
        <Slide className={clsx(styles.slide)}>changelog</Slide>
        </>
    )
}