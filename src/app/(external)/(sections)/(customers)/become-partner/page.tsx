import Input from '@/assets/ui-kit/input/input';
import { HeadBlock } from '../../(about)/slides/head/block';
import styles from './page.module.scss';

import clsx from 'clsx';
import { PlatformFormBody, PlatformFormInput, PlatformFormSection, PlatformFormTextarea, PlatformFormVariants } from '@/app/platform/components/lib/form';
import Earth from '@/assets/ui-kit/icons/earth';
import Guard from '@/assets/ui-kit/icons/guard';
import Button from '@/assets/ui-kit/button/button';
import { ReadyToStartBlock } from '../businessmans/blocks/ready-to-start/block';

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                <HeadBlock className={clsx(styles.block, styles.head)} 
                        title='Станьте партнёром'
                        description='Станьте партнёром, внесите вклад в развитие Kroncl и получите бессрочный доступ ко всем возможностям для своей организации.'
                        variant='default'
                        location='center'
                    />
                <div className={styles.intervalFlex}>
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
                <div className={clsx(styles.block, styles.form)}>
                    <div className={styles.focus}>
                        <PlatformFormBody>
                            <PlatformFormSection title='Название организации'>
                                <PlatformFormInput placeholder='' />
                            </PlatformFormSection>
                            <PlatformFormSection title='Тип организации'>
                                <PlatformFormVariants
                                    value='public'
                                    options={[
                                        { 
                                            icon: <Earth />,
                                            value: 'public', 
                                            label: 'Публичная компания', 
                                            description: 'Широко известный бренд, открытая информация о деятельности, готов к публичным интеграциям.' 
                                        },
                                        { 
                                            icon: <Guard />,
                                            value: 'private', 
                                            label: 'Частная компания', 
                                            description: 'Непубличный бизнес, требуются индивидуальные условия партнёрства.' 
                                        }
                                    ]} />
                            </PlatformFormSection>
                            <PlatformFormSection title='Почта для связи'>
                                <PlatformFormInput placeholder='' type='email' />
                            </PlatformFormSection>
                            <PlatformFormSection title='Текст заявки' description='Немного о потребностях организации'>
                                <PlatformFormTextarea />
                            </PlatformFormSection>
                        </PlatformFormBody>
                        <div className={styles.warning}>
                            Соблюдайте <span className={styles.accent}>официально-деловой</span> стиль обращения. Мы привыкли к оскорблениям, но от постоянных клиентов.
                        </div>
                        <div className={styles.actions}>
                            <Button 
                                className={styles.action} 
                                variant='accent'>
                                Отправить заявку
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={styles.intervalFlex}>
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
                <ReadyToStartBlock className={styles.block} />
            </div>
        </div>
    )
}