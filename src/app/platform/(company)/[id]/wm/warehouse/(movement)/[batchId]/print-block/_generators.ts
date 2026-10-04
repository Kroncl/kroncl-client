import { PositionWithUnit } from '@/apps/company/modules/wm/types';
import { PrinterSettings, PrinterLanguage } from './_types';

// --------
// TSPL (TSC, Xprinter, Godex, Rongta)
// --------

export function generateTSPL(pos: PositionWithUnit, cfg: PrinterSettings): string {
    const lines: string[] = [];
    lines.push(`SIZE ${cfg.widthMm} mm, ${cfg.heightMm} mm`);
    lines.push('GAP 2 mm, 0 mm');
    lines.push('DIRECTION 1');
    lines.push(`DENSITY ${cfg.density}`);
    lines.push('CLS');
    lines.push(`TEXT 10,10,"3",0,1,1,"${escapeTSPL(pos.unit.name)}"`);
    lines.push(`TEXT 10,40,"2",0,1,1,"${escapeTSPL(pos.short_code)}"`);
    lines.push(`BARCODE 10,70,"128",80,1,0,2,2,"${escapeTSPL(pos.short_code)}"`);
    lines.push(`PRINT ${cfg.copies},1`);
    return lines.join('\n') + '\n';
}

// TSPL не любит двойные кавычки в тексте — заменяем
function escapeTSPL(s: string): string {
    return s.replace(/"/g, "'");
}

// --------
// ZPL (Zebra)
// --------

export function generateZPL(pos: PositionWithUnit, cfg: PrinterSettings): string {
    // размеры в точках (203 dpi = 8 точек/мм, 300 dpi = 12 точек/мм)
    // используем 203 dpi — самый распространённый
    const DOTS_PER_MM = 8;
    const widthDots = Math.round(cfg.widthMm * DOTS_PER_MM);
    const heightDots = Math.round(cfg.heightMm * DOTS_PER_MM);

    const lines: string[] = [];
    lines.push('^XA');
    lines.push(`^PW${widthDots}`);
    lines.push(`^LL${heightDots}`);
    lines.push(`^MD${cfg.density}`);                     // density
    lines.push('^PR2');                                  // speed
    lines.push('^CI28');                                 // UTF-8
    lines.push('^FO10,10^A0N,30,30');
    lines.push(`^FD${escapeZPL(pos.unit.name)}^FS`);
    lines.push('^FO10,50^A0N,25,25');
    lines.push(`^FD${escapeZPL(pos.short_code)}^FS`);
    lines.push('^FO10,85^BY2,2,80');
    lines.push(`^BCN,80,Y,N,N`);
    lines.push(`^FD${escapeZPL(pos.short_code)}^FS`);
    lines.push(`^PQ${cfg.copies}`);
    lines.push('^XZ');
    return lines.join('\n') + '\n';
}

// ZPL не любит спецсимволы ^ и ~ в данных — экранируем
function escapeZPL(s: string): string {
    return s.replace(/\^/g, '').replace(/~/g, '');
}

// --------
// EPL (старые Zebra)
// --------

export function generateEPL(pos: PositionWithUnit, cfg: PrinterSettings): string {
    const DOTS_PER_MM = 8;
    const widthDots = Math.round(cfg.widthMm * DOTS_PER_MM);
    const heightDots = Math.round(cfg.heightMm * DOTS_PER_MM);

    const lines: string[] = [];
    lines.push('N');                                     // очистка
    lines.push(`q${widthDots}`);                         // ширина
    lines.push(`Q${heightDots},24`);                     // высота + gap
    lines.push(`D${cfg.density}`);                       // density
    lines.push(`S2`);                                    // speed
    lines.push('A10,10,0,3,1,1,N,"' + escapeEPL(pos.unit.name) + '"');
    lines.push('A10,40,0,2,1,1,N,"' + escapeEPL(pos.short_code) + '"');
    lines.push('B10,70,0,1,2,4,80,N,"' + escapeEPL(pos.short_code) + '"');
    lines.push(`P${cfg.copies}`);
    return lines.join('\n') + '\n';
}

function escapeEPL(s: string): string {
    return s.replace(/"/g, "'");
}

// --------
// REGISTRY
// --------

export type LabelGenerator = (pos: PositionWithUnit, cfg: PrinterSettings) => string;

export const generators: Record<PrinterLanguage, LabelGenerator> = {
    tspl: generateTSPL,
    zpl: generateZPL,
    epl: generateEPL,
};

/**
 * Возвращает команды для всей партии позиций.
 */
export function generateCommands(
    positions: PositionWithUnit[],
    cfg: PrinterSettings,
): string {
    const generator = generators[cfg.language];
    if (!generator) {
        throw new Error(`Неизвестный язык принтера: ${cfg.language}`);
    }
    return positions.map(p => generator(p, cfg)).join('');
}