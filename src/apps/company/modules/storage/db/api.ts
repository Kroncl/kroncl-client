import { CompanyApi } from "../../../api";
import { DatabaseStorage } from "../types";
import { DatabaseStorageSources, StorageModulesData } from "./types";
import { useQuery } from '@tanstack/react-query';

export const storageDbKeys = {
    all: (companyId: string) => ['storage-db', companyId] as const,
    sources: (companyId: string) => [...storageDbKeys.all(companyId), 'sources'] as const,
    modules: (companyId: string) => [...storageDbKeys.all(companyId), 'modules'] as const,
};

export const storageDbModule = (companyApi: CompanyApi) => ({
    async get() {
        return companyApi.get<DatabaseStorage>('/storage/db');
    },
    async getSources() {
        return companyApi.get<DatabaseStorageSources>('/storage/db/sources');
    },
    async getModules() {
        return companyApi.get<StorageModulesData>('/storage/db/sources/modules');
    },
    useSources: (companyId: string) => {
        return useQuery({
            queryKey: storageDbKeys.sources(companyId),
            queryFn: () => companyApi.get<DatabaseStorageSources>('/storage/db/sources'),
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
        });
    },
    useModules: (companyId: string) => {
        return useQuery({
            queryKey: storageDbKeys.modules(companyId),
            queryFn: () => companyApi.get<StorageModulesData>('/storage/db/sources/modules'),
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
        });
    },
});