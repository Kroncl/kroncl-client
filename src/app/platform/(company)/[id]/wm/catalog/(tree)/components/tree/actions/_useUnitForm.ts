'use client';

import { useMemo, useState } from 'react';
import { UnitFormData } from './_types';
import { _units } from '../../../../units/new/_units';

const initialUnitForm: UnitFormData = {
    name: '',
    comment: '',
    type: 'product',
    inventory_type: 'tracked',
    tracking_detail: 'batch',
    tracked_type: 'fifo',
    unit: '',
    sale_price: '',
    purchase_price: '',
};

export function useUnitForm() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<UnitFormData>(initialUnitForm);

    const unitOptions = useMemo(() => {
        if (data.type === 'service') {
            return _units.filter(u => u.value === 'pcs');
        }
        if (data.tracking_detail === 'serial') {
            return _units.filter(u => u.value === 'pcs');
        }
        return _units;
    }, [data.type, data.tracking_detail]);

    const patch = (partial: Partial<UnitFormData>) =>
        setData(p => ({ ...p, ...partial }));

    const reset = () => {
        setStep(0);
        setData(initialUnitForm);
    };

    return {
        step,
        setStep,
        data,
        patch,
        unitOptions,
        reset,
    };
}