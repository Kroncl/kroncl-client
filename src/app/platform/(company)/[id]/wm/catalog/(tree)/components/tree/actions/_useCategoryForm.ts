'use client';

import { useState } from 'react';
import { CategoryFormData } from './_types';

const initialCategoryForm: CategoryFormData = {
    name: '',
    comment: '',
};

export function useCategoryForm() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<CategoryFormData>(initialCategoryForm);

    const setName = (name: string) => setData(p => ({ ...p, name }));
    const setComment = (comment: string) => setData(p => ({ ...p, comment }));

    const reset = () => {
        setStep(0);
        setData(initialCategoryForm);
    };

    return {
        step,
        setStep,
        data,
        setName,
        setComment,
        reset,
    };
}