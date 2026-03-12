// _utils.ts
export interface Unit {
    value: string;
    label: string;
    ru: string;
    description?: string;
}

export const _units: Unit[] = [
    { value: 'pcs', label: 'Штука (pcs)', ru: 'шт.' },
    { value: 'kg', label: 'Килограмм (кг)', ru: 'кг.' },
    { value: 'g', label: 'Грамм (г)', ru: 'г.' },
    { value: 'l', label: 'Литр (л)', ru: 'л.' },
    { value: 'ml', label: 'Миллилитр (мл)', ru: 'мл.' },
    { value: 'm', label: 'Метр (м)', ru: 'м.' },
    { value: 'cm', label: 'Сантиметр (см)', ru: 'см.' }
];

export function getUnitRu(unitValue: string): string {
    const unit = _units.find(u => u.value === unitValue);
    return unit?.ru || unitValue;
}