import { CompanyApi } from "../../api";
import { StorageSummary } from "./types";

export const storageModule = (companyApi: CompanyApi) => ({
    async getSummary() {
        return companyApi.get<StorageSummary>('/storage');
    },
});