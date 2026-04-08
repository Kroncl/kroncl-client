import { PaginationParams } from "@/apps/shared/pagination/types";
import { CompanyApi } from "../../api";
import { GetLogsActivityRequest, GetLogsRequest, Log, LogActivity, LogsResponse } from "./types";

export const logsModule = (companyApi: CompanyApi) => ({
    async getLogs(
        params?: PaginationParams & GetLogsRequest
    ) {
        return companyApi.get<LogsResponse>("/modules/logs", {
            params: params as Record<string, string | number | boolean | undefined>
        });
    },
    async getLog(id: string) {
        return companyApi.get<Log>(`/modules/logs/${id}`)
    },
    async optimize() {
        return companyApi.post("/modules/logs/optimize");
    },
    async clear() {
        return companyApi.post("/modules/logs/clear");
    },
    async getActivity(
        params?: GetLogsActivityRequest
    ) {
        return companyApi.get<LogActivity[]>("/modules/logs/activity", {
            params: params as Record<string, string | number | boolean | undefined>
        });
    },
});