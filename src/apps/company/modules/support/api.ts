import { PaginationParams } from "@/apps/shared/pagination/types";
import { CompanyApi } from "../../api";
import { 
    Ticket, 
    TicketsResponse, 
    Message, 
    MessagesResponse, 
    CreateTicketRequest, 
    CreateMessageRequest, 
    UpdateTicketRequest,
    UpdateMessageReadRequest 
} from "./types";

export const supportModule = (companyApi: CompanyApi) => ({
    // Tickets
    async getTickets(params?: PaginationParams) {
        return companyApi.get<TicketsResponse>("/modules/support/tickets", {
            params: params as Record<string, string | number | boolean | undefined>
        });
    },
    
    async createTicket(data: CreateTicketRequest) {
        return companyApi.post<Ticket>("/modules/support/tickets", data);
    },
    
    async getTicket(ticketId: string) {
        return companyApi.get<Ticket>(`/modules/support/tickets/${ticketId}`);
    },
    
    async updateTicketStatus(ticketId: string, data: UpdateTicketRequest) {
        return companyApi.patch(`/modules/support/tickets/${ticketId}`, data);
    },
    
    // Messages
    async getMessages(ticketId: string, params?: PaginationParams) {
        return companyApi.get<MessagesResponse>(`/modules/support/tickets/${ticketId}/messages`, {
            params: params as Record<string, string | number | boolean | undefined>
        });
    },
    
    async createMessage(ticketId: string, data: CreateMessageRequest) {
        return companyApi.post<Message>(`/modules/support/tickets/${ticketId}/messages`, data);
    },
    
    async updateMessageReadStatus(ticketId: string, messageId: string, data: UpdateMessageReadRequest) {
        return companyApi.patch(`/modules/support/tickets/${ticketId}/messages/${messageId}`, data);
    },
});