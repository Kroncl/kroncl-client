import { PaginationParams } from "@/apps/shared/pagination/types";
import { CompanyApi } from "../../api";
import {
    Counterparty,
    CounterpartiesResponse,
    CreateCounterpartyRequest,
    UpdateCounterpartyRequest,
    GetCounterpartiesParams,
} from "./types";

export const cpmModule = (companyApi: CompanyApi) => ({
    async getCounterparties(params?: GetCounterpartiesParams) {
        return companyApi.get<CounterpartiesResponse>("/modules/cpm/counterparties", {
            params: params as Record<string, string | number | boolean | undefined>
        });
    },

    async getCounterparty(id: string) {
        return companyApi.get<Counterparty>(`/modules/cpm/counterparties/${id}`);
    },

    async createCounterparty(data: CreateCounterpartyRequest) {
        return companyApi.post<Counterparty>("/modules/cpm/counterparties", data);
    },

    async updateCounterparty(id: string, data: UpdateCounterpartyRequest) {
        return companyApi.patch<Counterparty>(`/modules/cpm/counterparties/${id}`, data);
    },

    async activateCounterparty(id: string) {
        return companyApi.post<Counterparty>(`/modules/cpm/counterparties/${id}/activate`);
    },

    async deactivateCounterparty(id: string) {
        return companyApi.post<Counterparty>(`/modules/cpm/counterparties/${id}/deactivate`);
    },
});