import clsx from 'clsx';
import styles from './content.module.scss';
import { forwardRef } from 'react';

export const Scrollable = forwardRef<HTMLDivElement, {
    className?: string;
    children: React.ReactNode;
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}>(({ className, children, onScroll }, ref) => {
    return (
        <div 
            ref={ref}
            className={clsx(styles.scrollable, className)} 
            onScroll={onScroll}
        >
            {children}
        </div>
    );
});

Scrollable.displayName = 'Scrollable';