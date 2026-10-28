import { describe, expect, it } from "vitest";
import { DEMO_SETTINGS } from "@/lib/demo-data";
import { calculateInactivityDays, classifyCustomerSegment } from "@/lib/segmentation";
import type { Customer } from "@/lib/types";

const customer: Customer = {
  id: "c-test",
  user_id: "user-1",
  first_name: "Test",
  total_visits: 5,
  lifetime_value: 200,
  customer_status: "inactive",
  consent_status: "opted_in",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  last_activity_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
};

describe("segmentation", () => {
  it("calculates inactivity days", () => {
    expect(calculateInactivityDays(customer, new Date())).toBeGreaterThanOrEqual(45);
  });

  it("flags inactive segment boundaries", () => {
    expect(classifyCustomerSegment(customer, DEMO_SETTINGS, new Date())).toBe("inactive");
  });
});
