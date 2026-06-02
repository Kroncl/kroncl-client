'use client';

import { useBillingStatus } from "@/apps/status/hoos";
import { Pin as Pin2026 } from "./2026/pin";
import { Pin as PinBillingOff } from "./test-mode/pin";

export interface PinsManagerProps {
    className?: string;
}

export function PinsManager({
    className
}: PinsManagerProps) {
    const { data: billingStatus, isLoading: billingLoading } = useBillingStatus();
    const isBillingOn = billingStatus?.mode === 'on';

    if (!isBillingOn) return <PinBillingOff className={className} />

    return <Pin2026 className={className} />
}