'use client';

import Textarea from '@/assets/ui-kit/textarea/textarea';
import styles from './page.module.scss';
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import CheckMark from '@/assets/ui-kit/icons/check-mark';
import Upload from '@/assets/ui-kit/icons/upload';
import PaperClip from '@/assets/ui-kit/icons/paper-clip';
import Send from '@/assets/ui-kit/icons/send';
import { Scrollable } from '../components/scrollable/content';
import { MessageCard } from '../components/message-card/card';
import Button from '@/assets/ui-kit/button/button';

export default function Page() {
    return (
        <>
        <div className={styles.top}>
            <div className={styles.info}>
                <div className={styles.capture}>Техническая проблема</div>
            </div>
            <div className={styles.actions}>
                <Button className={styles.action} variant='contrast'>Закрыть тикет</Button>
            </div>
        </div>
        <Scrollable className={styles.scrollable}>
            <div className={styles.messages}>
                <MessageCard className={styles.message} />
                <MessageCard className={styles.message} />
                <MessageCard className={styles.message} />
                <MessageCard className={styles.message} />
                <MessageCard className={styles.message} />
                <MessageCard className={styles.message} />
                <MessageCard className={styles.message} />
                <MessageCard className={styles.message} />
                <MessageCard className={styles.message} />
                <MessageCard className={styles.message} />
            </div>
        </Scrollable>
        <div className={styles.textable}>
            <div className={styles.textareaWrap}>
                <Textarea className={styles.textarea} fullWidth placeholder='Ваше сообщение в поддержку' />
                <div className={styles.actions}>
                    <button className={styles.shimmer}><PaperClip /></button>
                    <button className={styles.contrast}><Send /></button>
                </div>
            </div>
            <div className={styles.subtitle}>Деловой стиль, до 2048 символов</div>
        </div>
        <span className={styles.shadow} />
        </>
    )
}