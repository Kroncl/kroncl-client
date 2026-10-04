export const STORAGE_KEY = 'kroncl.wm.printer.settings';
export type PrinterLanguage = 'tspl' | 'zpl' | 'epl';

export type PrinterDevice = {
    vendorId: number;
    productId: number;
    productName: string;
    serialNumber?: string;
};

export type PrinterSettings = {
    language: PrinterLanguage;
    widthMm: number;
    heightMm: number;
    copies: number;
    density: number;
};

export const DEFAULT_SETTINGS: PrinterSettings = {
    language: 'tspl',
    widthMm: 58,
    heightMm: 40,
    copies: 1,
    density: 7,
};