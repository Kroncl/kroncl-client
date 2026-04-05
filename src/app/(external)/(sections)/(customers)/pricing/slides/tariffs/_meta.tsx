import { TariffTesis } from "./card/card";

export const pricingTheses: Record<number, TariffTesis[]> = {
    3: [
        { marker: true, about: 'Финансы' },
        { marker: true, about: 'Управление персоналом' },
    ],
    2: [
        { marker: true, about: 'Клиентская база' },
        { marker: true, about: 'Каталог & Склад' },
    ],
    1: [
        { marker: true, about: 'Сделки' },
    ]
};

/**
 * Получить тезисы для тарифа по его lvl
 * @param lvl - уровень тарифа (1 — самый пиздатый, 3 — самый хуевый)
 * @param inherit - наследовать тезисы от более пиздатых тарифов (lvl 1 наследует всё)
 */
export function getThesesByLvl(lvl: number, inherit: boolean = true): TariffTesis[] {
    if (inherit) {
        // Собираем тезисы от самого пиздатого (lvl 1) до текущего
        const result: TariffTesis[] = [];
        for (let i = 3; i >= lvl; i--) {
            if (pricingTheses[i]) {
                result.push(...pricingTheses[i]);
            }
        }
        return result;
    }
    
    return pricingTheses[lvl] || [];
}