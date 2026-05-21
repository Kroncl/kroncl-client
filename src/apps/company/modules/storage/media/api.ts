import { CompanyApi } from "../../../api";
import { MediaFile, MediaBucketStats, PresignedURLResponse } from "./types";

export const storageMediaModule = (companyApi: CompanyApi) => ({
    async getBucketStats() {
        return companyApi.get<MediaBucketStats>('/storage/media');
    },
    async getFile(path: string) {
        return companyApi.getBlob(`/storage/media/file?path=${encodeURIComponent(path)}`);
    },
    async getPresignedURL(path: string, expiry?: number) {
        const params: Record<string, string> = { path };
        if (expiry) params.expiry = `${expiry}`;
        return companyApi.get<PresignedURLResponse>('/storage/media/presigned-url', { params });
    },
    async uploadFile(file: File, tag?: string) {
        const formData = new FormData();
        formData.append('file', file);
        if (tag) formData.append('tag', tag);
        return companyApi.upload<MediaFile>('/storage/media/upload', formData);
    },
    async getFileUrl(path: string, expiry?: number): Promise<string> {
        const env = process.env.NEXT_PUBLIC_ENV || process.env.ENV || 'development';
        
        if (env === 'production') {
            const response = await this.getPresignedURL(path, expiry);
            return response.data.url;
        } else {
            return `${process.env.NEXT_PUBLIC_API_URL}/companies/${companyApi.companyId}/storage/media/file?path=${encodeURIComponent(path)}`;
        }
    },
});