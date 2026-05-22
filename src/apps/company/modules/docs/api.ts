import { CompanyApi } from "../../api";
import { Doc, DocsResponse, GetDocsParams, DocsSettings, UpdateDocsSettingsRequest } from "./types";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const docsKeys = {
    all: (companyId: string) => ['docs', companyId] as const,
    list: (companyId: string, params?: GetDocsParams) => [...docsKeys.all(companyId), 'list', params] as const,
    detail: (companyId: string, docId: string) => [...docsKeys.all(companyId), 'detail', docId] as const,
    settings: (companyId: string) => [...docsKeys.all(companyId), 'settings'] as const,
};

export const docsModule = (companyApi: CompanyApi) => ({
    async getDocs(params?: GetDocsParams) {
        const queryParams: Record<string, string> = {};
        if (params?.page) queryParams.page = params.page.toString();
        if (params?.limit) queryParams.limit = params.limit.toString();
        if (params?.module) queryParams.module = params.module;
        if (params?.type) queryParams.type = params.type;
        if (params?.search) queryParams.search = params.search;
        
        return companyApi.get<DocsResponse>('/modules/docs', { params: queryParams });
    },
    
    async getDoc(docId: string) {
        return companyApi.get<Doc>(`/modules/docs/${docId}`);
    },
    
    async getSettings() {
        return companyApi.get<DocsSettings>('/modules/docs/settings');
    },
    
    async updateSettings(data: UpdateDocsSettingsRequest) {
        return companyApi.patch<DocsSettings>('/modules/docs/settings', data);
    },
    
    useDocs: (companyId: string, params?: GetDocsParams) => {
        return useQuery({
            queryKey: docsKeys.list(companyId, params),
            queryFn: () => companyApi.get<DocsResponse>('/docs', { params: params as Record<string, string> }),
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
        });
    },
    
    useDoc: (companyId: string, docId: string) => {
        return useQuery({
            queryKey: docsKeys.detail(companyId, docId),
            queryFn: () => companyApi.get<Doc>(`/docs/${docId}`),
            enabled: !!docId,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
        });
    },
    
    useSettings: (companyId: string) => {
        return useQuery({
            queryKey: docsKeys.settings(companyId),
            queryFn: () => companyApi.get<DocsSettings>('/modules/docs/settings'),
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
        });
    },
    
    useUpdateSettings: (companyId: string) => {
        const queryClient = useQueryClient();
        
        return useMutation({
            mutationFn: (data: UpdateDocsSettingsRequest) => companyApi.patch<DocsSettings>('/modules/docs/settings', data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: docsKeys.settings(companyId) });
            },
        });
    },
});