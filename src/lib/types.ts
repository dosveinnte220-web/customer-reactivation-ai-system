export type CustomerStatus = "active" | "inactive" | "do_not_contact";
export type ConsentStatus = "unknown" | "opted_in" | "opted_out";
export type CampaignStatus = "draft" | "ready" | "scheduled" | "running" | "completed" | "cancelled";
export type MessageStatus = "draft" | "approved" | "queued" | "sent" | "delivered" | "replied" | "failed" | "skipped";
export type ImportValidationSeverity = "valid" | "invalid" | "duplicate" | "skipped";

export interface Customer {
  id: string;
  user_id: string;
  external_id?: string;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  last_activity_at?: string | null;
  total_visits: number;
  lifetime_value: number;
  customer_status: CustomerStatus;
  consent_status: ConsentStatus;
  consent_source?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  name: string;
  channel: "email" | "whatsapp" | "sms" | "manual";
  segment_rules: Record<string, unknown>;
  status: CampaignStatus;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  user_id: string;
  campaign_id?: string | null;
  customer_id: string;
  channel: string;
  message_body: string;
  status: MessageStatus;
  provider_message_id?: string | null;
  sent_at?: string | null;
  error_message?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignEvent {
  id: string;
  user_id: string;
  campaign_id?: string | null;
  customer_id?: string | null;
  event_type: string;
  event_data: Record<string, unknown>;
  created_at: string;
}

export interface BusinessSettings {
  business_name: string;
  business_type: string;
  default_language: "en" | "es";
  timezone: string;
  inactivity_thresholds: {
    recently_inactive_days: number;
    inactive_days: number;
    highly_inactive_days: number;
    dormant_days: number;
  };
  default_message_tone: "friendly" | "professional" | "empathetic" | "energetic";
  default_channel: "email" | "sms" | "whatsapp" | "manual";
  ai_status: "configured" | "template" | "disabled";
  messaging_status: "configured" | "manual-only" | "disabled";
  privacy_notice: string;
  retention_days: number;
}

export interface SegmentDefinition {
  key: string;
  label: string;
  description: string;
  count: number;
  eligible: number;
}

export interface CsvValidationIssue {
  rowNumber: number;
  field: string;
  message: string;
  severity: ImportValidationSeverity;
}

export interface CsvImportSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  duplicateRows: number;
  skippedRows: number;
  errors: CsvValidationIssue[];
}

export interface ImportPreviewRow {
  rowNumber: number;
  values: Record<string, string>;
  isValid: boolean;
  issues: CsvValidationIssue[];
  normalized?: Partial<Customer>;
}
