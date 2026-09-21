import type { Variants } from 'framer-motion';

export const plugVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

export const actionsVariants: Variants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: 'auto' },
    exit: { opacity: 0, width: 0 },
};

export const plugTransition = {
    duration: 0.2,
} as const;

export const actionsTransition = {
    duration: 0.25,
    ease: 'easeOut',
} as const;