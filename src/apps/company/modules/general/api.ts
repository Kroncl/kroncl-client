import { PaginationParams } from "@/apps/shared/pagination/types";
import { CompanyApi } from "../../api";
import { AccountCompany } from "@/apps/account/companies/types";
import { CompanySummary } from "./types";

export const generalModule = (companyApi: CompanyApi) => ({
    async getSummary(currencyCode?: string) {
        const params: Record<string, string> = {};
        if (currencyCode) params.currency = currencyCode;

        return companyApi.get<CompanySummary>(`/modules/summary`, { params });
    },
});