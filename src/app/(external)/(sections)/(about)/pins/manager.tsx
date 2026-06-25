'use client';

import { useBillingStatus } from "@/apps/status/hoos";
import { Pin as PinRates } from "./rates/pin";
import { Pin as PinBillingOff } from "./test-mode/pin";

export interface PinsManagerProps {
    className?: string;
}

export function PinsManager({
    className
}: PinsManagerProps) {
    const { data: billingStatus, isLoading: billingLoading } = useBillingStatus();
    const isBillingOff = billingStatus?.mode === 'off';

    if (isBillingOff) return <PinBillingOff className={className} />;

    return <PinRates className={className} />
}