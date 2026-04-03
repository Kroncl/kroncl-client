import { AccountPublic } from "@/apps/account/types";
import { PaginationMeta } from "@/apps/shared/pagination/types";

export type TicketStatus = "pending" | "closed" | "revoked";

export type TicketTheme = 
    | "technical_issue" 
    | "billing_payment" 
    | "access_rights" 
    | "feature_request" 
    | "consultation";
    
export const TicketThemeTitle: Record<TicketTheme, string> = {
    technical_issue: 'Техническая проблема',
    billing_payment: 'Биллинг и оплата',
    access_rights: 'Доступ и права',
    feature_request: 'Предложение по функционалу',
    consultation: 'Консультация'
};

export interface Link {
    id: string;
    message_id: string;
    link: string;
    capture: string;
    created_at: string;
    updated_at: string;
}

export interface Message {
    id: string;
    account_id: string;
    ticket_id: string;
    text: string;
    read: boolean;
    created_at: string;
    updated_at: string;
    account: AccountPublic;
    links?: Link[];
}

export interface Ticket {
    id: string;
    company_id: string;
    initiator_id: string;
    theme: string;
    status: TicketStatus;
    created_at: string;
    updated_at: string;
    initiator: AccountPublic;
    last_message: Message;
}

export interface TicketsResponse {
    tickets: Ticket[];
    pagination: PaginationMeta;
}

export interface MessagesResponse {
    messages: Message[];
    pagination: PaginationMeta;
}

export interface CreateTicketRequest {
    theme: string;
    text: string;
}

export interface CreateMessageRequest {
    text: string;
}

export interface UpdateTicketRequest {
    status: TicketStatus;
}

export interface UpdateMessageReadRequest {
    read: boolean;
}