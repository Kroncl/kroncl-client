'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Wallet from '@/assets/ui-kit/icons/wallet';
import Settings from '@/assets/ui-kit/icons/settings';
import Account from '@/assets/ui-kit/icons/account';
import { PlatformDivorce } from '@/app/platform/components/lib/divorce/divorce';
import { useAuth } from '@/apps/account/auth/context/AuthContext';
import Collection from '@/assets/ui-kit/icons/collection';
import Plus from '@/assets/ui-kit/icons/plus';
import Package from '@/assets/ui-kit/icons/package';
import Book from '@/assets/ui-kit/icons/book';
import Dev from '@/assets/ui-kit/icons/dev';
import { DivorceSection } from '@/app/platform/components/lib/divorce/_types';
import Business from '@/assets/ui-kit/icons/business';
import styles from './page.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import { CompanyCard } from '../companies/components/company-card/card';
import { useCompanies } from '@/apps/account/companies/hooks/useCompanies';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import Invitations from '@/assets/ui-kit/icons/invitations';
import { helpLinks } from './_help';
import { LogoFull } from '@/assets/ui-kit/logo/full/full';
import { LogoIco } from '@/assets/ui-kit/logo/ico/ico';
import { APP_VERSION } from '@/config/version.config';
import { linksConfig } from '@/config/links.config';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from './_animations';

const welcomeMessages = [
    "Добро пожаловать, {name}!",
    "С возвращением, {name}!",
    "Привет, {name}!",
    "Как настроение, {name}?",
    "Как спалось, {name}?",
    "Как дела, {name}?",
    "Рады видеть вас снова, {name}!",
    "Чем займёмся сегодня, {name}?",
    "Удачного дня, {name}!",
    "Готовы к работе, {name}?",
    "Начинаем, {name}!",
    "Вперед к сделкам, {name}!",
    "С возвращением в Kroncl, {name}!",
    "Как самочувствие, {name}?",
    "Свежие идеи, {name}?",
];

export default function Page() {
    const { user } = useAuth();
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const { companies, loading, fetchCompanies } = useCompanies();

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
        const message = welcomeMessages[randomIndex].replace("{name}", user?.name || 'Пользователь');
        setWelcomeMessage(message);
    }, [user?.name]);

    useEffect(() => {
        fetchCompanies({
            page: 1,
            limit: 10
        });
    }, [fetchCompanies]);
    
    const actions: DivorceSection[] = [
        {
            title: "Создать компанию",
            description: "Создание пространства для новой компании",
            icon: <Business />,
            accent: true,
            href: "/platform/companies/new",
        },
        {
            title: "Ваши организации",
            description: "Смотреть организации, в которых вы являетесь гостем или владельцем",
            icon: <Collection />,
            href: "/platform/companies"
        },
        {
            title: "Приглашения",
            description: "Смотреть входящие приглашения от организаций",
            icon: <Invitations />,
            href: "/platform/invitations"
        },
        {
            title: "База знаний",
            description: "Полное руководство использования платформы от авторов",
            icon: <Book />,
            href: "/docs"
        },
    ];

    const displayCompanies = companies.slice(0, 10);
    
    return (
        <motion.div 
            className={styles.container}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            <motion.div className={styles.welcome} variants={fadeInUp}>
                <div className={styles.subtitle}>Управление учётной записью</div>
                <div className={styles.title}>{welcomeMessage}</div>
                <div className={styles.about}>С чего начнём?</div>
            </motion.div>

            <motion.div className={clsx(styles.section, styles.divorce)} variants={scaleIn}>
                <div className={styles.area}>
                    {actions.map((action, index) => (
                        <Link href={action.href || '/'} key={index} className={clsx(styles.item, action.accent && styles.accent)}>
                            <div className={styles.icon}>{action.icon}</div>
                            <div className={styles.info}>
                                <div className={styles.title}>{action.title}</div>
                                <div className={styles.description}>{action.description}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.div>

            <motion.div className={clsx(styles.section, styles.companies)} variants={fadeInUp}>
                <div className={styles.title}>Организации</div>
                <div className={styles.area}>
                    {loading ? (
                        <div className={styles.plug}>
                            <Spinner variant='accent' size='lg' />
                        </div>
                    ) : displayCompanies.length > 0 ? (
                        displayCompanies.map((company) => (
                            <CompanyCard className={styles.item} key={company.id} company={company} />
                        ))
                    ) : (
                        <div className={styles.plug}>
                            <Collection className={styles.icon} />
                            <div className={styles.text}>
                                У вас пока нет организаций - <br />
                                пора исправлять
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            <motion.div className={clsx(styles.section, styles.help)} variants={fadeInUp}>
                <div className={styles.title}>Может быть полезно</div>
                <div className={styles.area}>
                    {helpLinks.map((link, index) => (
                        <Link target='_blank' href={link.href} key={index} className={styles.item}>
                            <div className={styles.name}>{link.title}</div>
                        </Link>
                    ))}
                </div>
            </motion.div>

            <motion.div className={clsx(styles.section, styles.overview)} variants={scaleIn}>
                <div className={styles.area}>
                    <LogoIco className={styles.logo} color='var(--color-accent-text-primary)' />
                    <img src='/images/mock-ups/company-overview-cut.png' className={styles.img} />
                </div>
            </motion.div>

            <motion.div className={clsx(styles.section, styles.footer)} variants={fadeIn}>
                <div className={styles.area}>
                    <div className={styles.capture}>Последняя сборка платформы</div>
                    <Link href={linksConfig.developerGithub} target='_blank' className={styles.version}>{APP_VERSION}</Link>
                </div>
            </motion.div>
        </motion.div>
    );
}