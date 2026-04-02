import { PlatformFormBody, PlatformFormSection, PlatformFormVariants } from "@/app/platform/components/lib/form";
import { PlatformFormVariantOption } from "@/app/platform/components/lib/form/_types";
import { PlatformHead } from "@/app/platform/components/lib/head/head";
import Button from "@/assets/ui-kit/button/button";
import Textarea from "@/assets/ui-kit/textarea/textarea";
import { Scrollable } from "../components/scrollable/content";

export default function Page() {
    const themes: PlatformFormVariantOption[] = [
        {
            value: 'technical_issue',
            label: 'Техническая проблема',
            description: 'Ошибки в работе системы, баги, некорректное отображение данных, проблемы с загрузкой',
        },
        {
            value: 'billing_payment',
            label: 'Биллинг и оплата',
            description: 'Вопросы по тарифам, списаниям, выставлению счетов, продлению подписки',
        },
        {
            value: 'access_rights',
            label: 'Доступ и права',
            description: 'Проблемы с входом, восстановление пароля, настройка прав доступа сотрудников',
        },
        {
            value: 'feature_request',
            label: 'Предложение по функционалу',
            description: 'Идеи по улучшению системы, новый функционал, доработка существующих возможностей',
        },
        {
            value: 'consultation',
            label: 'Консультация',
            description: 'Помощь в работе с системой, обучение сотрудников, рекомендации по настройке',
        },
    ];
    return (
        <Scrollable>
        <div style={{padding: '.8rem'}}>
            <PlatformHead
                title="Создание тикета"
                description="Тикет - сообщение в службу поддержки Kroncl."
            />
            <PlatformFormBody>
                <PlatformFormSection title='Тема обращения'>
                    <PlatformFormVariants
                        value='technical_issue'
                        options={themes}
                    />
                </PlatformFormSection>
                <PlatformFormSection title='Сообщение тикета'>
                    <Textarea
                        placeholder="Подробно объясните суть проблемы"
                        style={{minHeight: '10em'}}
                    />
                </PlatformFormSection>

                <section>
                    <Button
                        variant='accent'
                    >
                        Открыть тикет
                    </Button>
                </section>
            </PlatformFormBody>
        </div>
        </Scrollable>
    )
}