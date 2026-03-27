import { Variants } from "framer-motion";

export const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
        duration: 0.3,
        ease: "easeOut"
        }
    }
};

export const titleVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
        duration: 0.4,
        ease: "easeOut"
        }
    }
};

export const sectionHoverVariants: Variants = {
    hover: {
        y: -4,
        transition: {
        duration: 0.2,
        ease: "easeOut"
        }
    }
};
