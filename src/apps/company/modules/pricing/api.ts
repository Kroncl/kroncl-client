import { PaginationParams } from "@/apps/shared/pagination/types";
import { CompanyApi } from "../../api";
import { CompanyPricingPlan, InitPaymentResponse, MigratePlanRequest, PricingTransactionsResponse } from "./types";

export const pricingModule = (companyApi: CompanyApi) => ({
    async getPlan() {
        return companyApi.get<CompanyPricingPlan>("/pricing");
    },

    async getTransactions(
        params?: PaginationParams
    ) {
        return companyApi.get<PricingTransactionsResponse>("/pricing/transactions", {
            params: params as Record<string, string | number | boolean | undefined>
        });
    },

    async migrate(data: MigratePlanRequest) {
        return companyApi.post<InitPaymentResponse>("/pricing/migrate", data);
    },

    async revokeTransaction(id: string) {
        return companyApi.post(`/pricing/transactions/${id}/revoke`);
    },
});