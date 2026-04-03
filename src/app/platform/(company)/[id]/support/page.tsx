'use client';

import Support from '@/assets/ui-kit/icons/support';
import styles from './layout.module.scss';
import { LogoIco } from '@/assets/ui-kit/logo/ico/ico';
import Button from '@/assets/ui-kit/button/button';
import { useParams } from 'next/navigation';

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;
    
    return (
        <div className={styles.plug}>
            <div className={styles.top}>
                {/* <Support className={styles.svg} /> */}
                <LogoIco className={styles.icon} /> 
            </div>
            <div className={styles.capture}>
                Техническая поддержка клиентов
            </div>
            <div className={styles.description}>
                Напишите нам по любому вопросу и получите ответ в течение <span className={styles.accent}>24 часов</span>
            </div>
            <div className={styles.actions}>
                <Button className={styles.action} variant='contrast' as='link' href={`/platform/${companyId}/support/new`}>Открыть тикет</Button>
            </div>
        </div>
    )
}