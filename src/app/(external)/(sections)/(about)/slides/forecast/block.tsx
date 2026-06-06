'use client';

import { PageBlockProps } from "@/app/(external)/_types";
import clsx from "clsx";
import styles from './block.module.scss';
import Button from "@/assets/ui-kit/button/button";
import { authLinks } from "@/config/links.config";
import { TimelineChart } from "@/app/platform/(company)/[id]/fm/forecast/components/timeline-chart/chart";
import { mockTimeline } from "./timeline";
import { APP_VERSION } from "@/config/version.config";

export function ForecastBlock({
    className
}: PageBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.focus}>
                <div className={styles.title}>
                    Загляните в будущее<br />
                    своей <span className={styles.accent}>компании.</span>
                </div>
                <div className={styles.description}>
                    Облачная учётная система <span className={styles.primary}>#1 малого бизнеса</span>. <br />От сделок до прогноза финансов организации.
                </div>
                <div className={styles.actions}>
                    <Button
                        as='link'
                        href={authLinks.login}
                        children="Войти"
                        variant="contrast"
                        className={styles.action}
                        />
                    <Button
                        as='link'
                        href='/changelog'
                        children="Что нового?"
                        variant="default"
                        className={styles.action}
                        />
                </div>
                <div className={styles.release}>Релиз {APP_VERSION} • 2026</div>
            </div>
            
            <TimelineChart data={mockTimeline} className={styles.chart} />
        </div>
    )
}