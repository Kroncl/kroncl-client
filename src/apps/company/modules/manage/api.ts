import { PaginationParams } from "@/apps/shared/pagination/types";
import { CompanyApi } from "../../api";
import { Company, UpdateCompanyRequest } from "./types";

export const manageModule = (companyApi: CompanyApi) => ({
    async updateCompany(id: string, data: UpdateCompanyRequest) {
        return companyApi.patch<Company>(`/`, data);
    }
});