export interface Unit {
    value: string;
    label: string;
    description?: string;
}

export const _units: Unit[] = [
    { value: 'pcs', label: 'Штука (pcs)' },
    { value: 'kg', label: 'Килограмм (кг)' },
    { value: 'g', label: 'Грамм (г)' },
    { value: 'l', label: 'Литр (л)' },
    { value: 'ml', label: 'Миллилитр (мл)' },
    { value: 'm', label: 'Метр (м)' },
    { value: 'cm', label: 'Сантиметр (см)' }
];