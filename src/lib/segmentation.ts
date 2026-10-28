import type { BusinessSettings, Customer, SegmentDefinition } from "@/lib/types";

const dayMs = 1000 * 60 * 60 * 24;
const SEGMENT_REFERENCE_TIME = new Date("2025-01-15T00:00:00.000Z");

export function calculateInactivityDays(customer: Customer, now?: Date) {
  const currentTime = now ?? SEGMENT_REFERENCE_TIME;
  if (!customer.last_activity_at) return null;
  const lastDate = new Date(customer.last_activity_at);
  if (Number.isNaN(lastDate.getTime())) return null;
  return Math.max(0, Math.ceil((currentTime.getTime() - lastDate.getTime()) / dayMs));
}

export function classifyCustomerSegment(customer: Customer, settings: BusinessSettings, now?: Date) {
  if (customer.customer_status === "do_not_contact") return "excluded";
  if (customer.consent_status === "opted_out") return "excluded";

  const currentTime = now ?? SEGMENT_REFERENCE_TIME;
  const inactivityDays = calculateInactivityDays(customer, currentTime);
  if (inactivityDays === null) return "no_activity_date";

  const { recently_inactive_days, inactive_days, highly_inactive_days, dormant_days } = settings.inactivity_thresholds;

  if (inactivityDays >= dormant_days) return "dormant";
  if (inactivityDays >= highly_inactive_days) return "highly_inactive";
  if (inactivityDays >= inactive_days) return "inactive";
  if (inactivityDays >= recently_inactive_days) return "recently_inactive";
  return "active";
}

export function getSegmentDefinitions(customers: Customer[], settings: BusinessSettings, now?: Date): SegmentDefinition[] {
  const evaluate = (customer: Customer) => classifyCustomerSegment(customer, settings, now);
  const define = (key: string, label: string, description: string) => {
    const matches = customers.filter((customer) => evaluate(customer) === key);
    const eligible = matches.filter((customer) => customer.customer_status !== "do_not_contact" && customer.consent_status !== "opted_out").length;
    return { key, label, description, count: matches.length, eligible };
  };

  return [
    define("recently_inactive", "Recently inactive", "14–30 days since last activity"),
    define("inactive", "Inactive", "31–60 days since last activity"),
    define("highly_inactive", "Highly inactive", "61–90 days since last activity"),
    define("dormant", "Dormant", "More than 90 days since last activity"),
    define("no_activity_date", "No activity date", "Customers without a recorded activity date"),
    define("excluded", "Needs review", "Suppressed or opted-out customers"),
  ];
}

export function getEligibleCustomers(customers: Customer[], settings: BusinessSettings, now?: Date) {
  const currentTime = now ?? SEGMENT_REFERENCE_TIME;
  return customers.filter((customer) => {
    if (customer.customer_status === "do_not_contact") return false;
    if (customer.consent_status === "opted_out") return false;
    const inactivityDays = calculateInactivityDays(customer, currentTime);
    if (inactivityDays === null) return false;
    return inactivityDays >= settings.inactivity_thresholds.recently_inactive_days;
  });
}
