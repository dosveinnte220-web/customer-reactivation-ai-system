import Papa from "papaparse";
import { z } from "zod";

import type { CsvImportSummary, CsvValidationIssue, ImportPreviewRow } from "@/lib/types";

const headerMap = {
  first_name: ["first_name", "firstname", "first name", "given_name", "fname"],
  last_name: ["last_name", "lastname", "last name", "surname", "family_name"],
  email: ["email", "e_mail", "customer_email"],
  phone: ["phone", "mobile", "phone_number", "cell", "telephone"],
  last_activity: ["last_activity", "last_activity_at", "last_visit", "last_activity_date", "last_visit_date"],
  visits: ["visits", "total_visits", "visit_count"],
  lifetime_value: ["lifetime_value", "total_value", "customer_value", "revenue"],
};

export const customerCsvSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required"),
  last_name: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Email must be valid").optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  last_activity_at: z.string().trim().optional().or(z.literal("")),
  total_visits: z.coerce.number().int().nonnegative().optional().or(z.literal("")),
  lifetime_value: z.coerce.number().nonnegative().optional().or(z.literal("")),
});

export function normalizePhone(value?: string) {
  if (!value) return "";
  const digits = value.replace(/[^\d+]/g, "").replace(/\+/g, "");
  if (!digits) return "";
  return digits.startsWith("1") && digits.length === 11 ? `+${digits}` : digits.length >= 10 ? `+1${digits}` : value.trim();
}

export function parseDateSafe(value?: string) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

export function findHeaderAlias(headers: string[], target: keyof typeof headerMap) {
  const normalizedHeaders = headers.map((header) => header.trim().toLowerCase());
  const aliases = headerMap[target];
  return normalizedHeaders.find((header) => aliases.includes(header));
}

export function validateCustomerCsvRow(row: Record<string, string>, rowNumber: number): { valid: boolean; normalized: Record<string, string>; issues: CsvValidationIssue[] } {
  const issues: CsvValidationIssue[] = [];
  const normalized: Record<string, string> = {};

  const firstName = row.first_name || row.firstname || row["First Name"] || "";
  if (!firstName.trim()) {
    issues.push({ rowNumber, field: "first_name", message: "First name is required.", severity: "invalid" });
  }
  normalized.first_name = firstName.trim();

  const emailValue = row.email || row.Email || "";
  const email = emailValue.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    issues.push({ rowNumber, field: "email", message: "Email is invalid.", severity: "invalid" });
  }
  normalized.email = email;

  const phoneValue = normalizePhone(row.phone || row.mobile || row.Phone || "");
  normalized.phone = phoneValue;

  const lastActivity = row.last_activity || row.last_visit || row["Last Activity"] || "";
  const parsedActivity = parseDateSafe(lastActivity);
  if (lastActivity && !parsedActivity) {
    issues.push({ rowNumber, field: "last_activity_at", message: "Date is invalid or ambiguous.", severity: "invalid" });
  }
  normalized.last_activity_at = parsedActivity ?? "";

  const visits = Number(row.visits || row.total_visits || row["Visits"] || 0);
  if (row.visits && Number.isNaN(visits)) {
    issues.push({ rowNumber, field: "total_visits", message: "Visits must be a number.", severity: "invalid" });
  }
  normalized.total_visits = `${Number.isFinite(visits) ? visits : 0}`;

  const lifetimeValue = Number(row.lifetime_value || row.total_value || row["Lifetime Value"] || 0);
  if ((row.lifetime_value || row.total_value) && Number.isNaN(lifetimeValue)) {
    issues.push({ rowNumber, field: "lifetime_value", message: "Lifetime value must be a number.", severity: "invalid" });
  }
  normalized.lifetime_value = `${Number.isFinite(lifetimeValue) ? lifetimeValue : 0}`;

  return {
    valid: issues.length === 0,
    normalized,
    issues,
  };
}

export function parseCsvPreview(csvText: string): ImportPreviewRow[] {
  const parsed = Papa.parse<Record<string, string>>(csvText, { header: true, skipEmptyLines: true, transformHeader: (header) => header.trim() });

  if (!parsed.data.length) {
    return [];
  }

  return parsed.data.slice(0, 10).map((row, index) => {
    const result = validateCustomerCsvRow(row as Record<string, string>, index + 2);
    return {
      rowNumber: index + 2,
      values: row as Record<string, string>,
      isValid: result.valid,
      issues: result.issues,
      normalized: result.normalized,
    };
  });
}

export function summarizeCsvImport(rows: Record<string, string>[], existingEmails: Set<string> = new Set()): CsvImportSummary {
  const errors: CsvValidationIssue[] = [];
  let validRows = 0;
  let invalidRows = 0;
  let duplicateRows = 0;
  let skippedRows = 0;

  rows.forEach((row, index) => {
    const result = validateCustomerCsvRow(row, index + 2);
    const email = (row.email || row.Email || "").trim().toLowerCase();
    if (result.valid) {
      if (email && existingEmails.has(email)) {
        duplicateRows += 1;
        errors.push({ rowNumber: index + 2, field: "email", message: "Duplicate customer email already exists.", severity: "duplicate" });
      } else {
        validRows += 1;
      }
    } else {
      invalidRows += 1;
      errors.push(...result.issues);
    }

    if (result.valid && email && existingEmails.has(email)) {
      skippedRows += 1;
    }
  });

  return {
    totalRows: rows.length,
    validRows,
    invalidRows,
    duplicateRows,
    skippedRows,
    errors,
  };
}

export function createErrorCsv(errors: CsvValidationIssue[]) {
  const header = ["row_number", "field", "message", "severity"];
  const rows = errors.map((error) => [error.rowNumber, error.field, error.message, error.severity]);
  return [header, ...rows].map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
}
