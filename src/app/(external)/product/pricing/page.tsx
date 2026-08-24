import clsx from 'clsx';
import styles from './page.module.scss';
import { Slide } from '../../components/slide/slide';

export default function PricingMainPage() {
    return (
        <>
        <Slide className={clsx(styles.slide)}>pricing</Slide>
        </>
    )
}