import { PricingPlan } from "@/apps/pricing/types";
import { PaginationMeta } from "@/apps/shared/pagination/types";

// --------
// COMPANY PRICING PLAN
// --------

export interface CompanyPricingPlan {
  is_trial: boolean;
  expires_at: string;
  days_left: number;
  days_total: number;
  current_plan: PricingPlan;
  next_plan?: PricingPlan;
}

// --------
// MIGRATE PLAN
// --------

export interface MigratePlanRequest {
  plan_code: string;
  period: "month" | "year";
  success_url?: string;
}

export interface InitPaymentResponse {
  transaction: PricingTransaction;
  payment_page_url: string;
  payment_id: string;
}

// --------
// TRANSACTIONS
// --------

export type TransactionStatus = "success" | "pending" | "unsuccess" | "revoked";

export interface PricingTransaction {
  id: string;
  company_id: string;
  account_id: string;
  amount: number | null;
  currency: "RUB";
  status: TransactionStatus;
  plan_code: string | null;
  is_trial: boolean;
  next_plan_code: string | null;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface PricingTransactionsResponse {
  transactions: PricingTransaction[];
  pagination: PaginationMeta;
}