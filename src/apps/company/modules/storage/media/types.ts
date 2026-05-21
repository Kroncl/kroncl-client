export interface MediaFile {
    path: string;
    size: number;
    preview_url?: string;
}

export interface MediaBucketStats {
    name: string;
    creation_date: string;
    size_mb: number;
    object_count: number;
}

export interface PresignedURLResponse {
    url: string;
}