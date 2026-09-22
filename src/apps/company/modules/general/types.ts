import { Currency } from "@/apps/currency/types";

export interface CompanySummary {
    // Сотрудники
    employees_total: number;
    employees_active: number;

    // Сделки
    deals_total: number;

    // Каталог
    categories_total: number;
    units_total: number;

    // Клиенты
    clients_total: number;
    clients_active: number;

    // Баланс организации
    balance_income: number;
    balance_expense: number;
    balance_total: number;
    currency: Currency;
    balance_count: number;
}