export interface StorageSummary {
    database: DatabaseStorageStatus;
    media: MediaBucketStatus;
}

export interface DatabaseStorageStatus {
    storage: DatabaseStorage | null;
    status: string;
    message: string;
    is_ready: boolean;
    schema_name: string;
    schema_exists: boolean;
}

export interface DatabaseStorage {
    id: string;
    company_id: string;
    schema_name: string;
    status: string;
    storage_type: string;
    metadata: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface MediaBucketStatus {
    is_ready: boolean;
    message: string;
    storage: MediaBucketInfo | null;
    exists: boolean;
}

export interface MediaBucketInfo {
    name: string;
    creation_date: string;
    size_mb: number;
    object_count: number;
}