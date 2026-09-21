import { TrackedType, TrackingDetail } from "@/apps/company/modules/wm/types";

export function getTrackingDetailLabel(trackingDetail: TrackingDetail): string {
    switch (trackingDetail) {
        case 'batch':
            return 'Партионный учет';
        case 'serial':
            return 'Поштучный учет';
        default:
            return trackingDetail;
    }
}

export function getTrackedTypeLabel(trackedType: TrackedType): string {
    switch (trackedType) {
        case 'fifo':
            return 'FIFO (первым пришел — первым ушел)';
        case 'lifo':
            return 'LIFO (последним пришел — первым ушел)';
        default:
            return trackedType;
    }
}