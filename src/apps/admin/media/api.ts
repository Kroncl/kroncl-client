import { api } from '@/apps/shared/bridge/api';
import { ApiResponse } from '@/apps/shared/bridge/types';
import { PaginationParams } from '@/apps/shared/pagination/types';
import { SystemMediaStats, MediaMetricsHistoryItem, GetBucketsResponse, BucketInfo } from './types';

export class AdminMediaApi {
    private basePath = '/admin/media';

    async getSystemStats(): Promise<ApiResponse<SystemMediaStats>> {
        return api.get<SystemMediaStats>(`${this.basePath}/sys`);
    }

    async getMetricsHistory(params?: {
        start_date?: string;
        end_date?: string;
        limit?: number;
    }): Promise<ApiResponse<MediaMetricsHistoryItem[]>> {
        const queryParams = new URLSearchParams();
        if (params?.start_date) queryParams.append('start_date', params.start_date);
        if (params?.end_date) queryParams.append('end_date', params.end_date);
        if (params?.limit) queryParams.append('limit', String(params.limit));
        
        const url = queryParams.toString() 
            ? `${this.basePath}/history?${queryParams.toString()}`
            : `${this.basePath}/history`;
        
        return api.get<MediaMetricsHistoryItem[]>(url);
    }

    async getBuckets(params?: {
        search?: string;
    } & PaginationParams): Promise<ApiResponse<GetBucketsResponse>> {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append('search', params.search);
        if (params?.page) queryParams.append('page', String(params.page));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        
        const url = queryParams.toString() 
            ? `${this.basePath}/buckets?${queryParams.toString()}`
            : `${this.basePath}/buckets`;
        
        return api.get<GetBucketsResponse>(url);
    }

    async getBucket(bucketName: string): Promise<ApiResponse<BucketInfo>> {
        return api.get<BucketInfo>(`${this.basePath}/buckets/${bucketName}/sys`);
    }
}

export const adminMediaApi = new AdminMediaApi();