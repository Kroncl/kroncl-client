import { PaginationMeta } from '@/apps/shared/pagination/types';

export interface SystemMediaStats {
    total_buckets: number;
    total_objects: number;
    total_size_mb: number;
    public_bucket_objects: number;
    public_bucket_size_mb: number;
    temp_bucket_objects: number;
    temp_bucket_size_mb: number;
    tenant_buckets_count: number;
    tenant_total_objects: number;
    tenant_total_size_mb: number;
    avg_tenant_objects: number;
    avg_tenant_size_mb: number;
    largest_bucket_name: string;
    largest_bucket_objects: number;
    largest_bucket_size_mb: number;
    last_snapshot_time: string | null;
}

export interface MediaMetricsHistoryItem {
    id: number;
    recorded_at: string;
    total_buckets: number;
    total_objects: number;
    total_size_mb: number;
    tenant_buckets_count: number;
    tenant_total_objects: number;
    tenant_total_size_mb: number;
    public_bucket_objects: number;
    public_bucket_size_mb: number;
    temp_bucket_objects: number;
    temp_bucket_size_mb: number;
}

export interface BucketInfo {
    name: string;
    creation_date: string;
    objects_count: number;
    size_mb: number;
    is_public: boolean;
    is_temp: boolean;
    is_tenant: boolean;
    tenant_id: string | null;
}

export interface GetBucketsResponse {
    buckets: BucketInfo[];
    pagination: PaginationMeta;
}