import { DEMO_CAMPAIGNS, DEMO_CUSTOMERS, DEMO_MESSAGES, DEMO_SETTINGS } from "@/lib/demo-data";
import type { BusinessSettings, Campaign, Customer, Message } from "@/lib/types";

const STORAGE_KEY = "reactivationiq-demo-state";

export function readDemoState() {
  if (typeof window === "undefined") {
    return {
      customers: DEMO_CUSTOMERS,
      campaigns: DEMO_CAMPAIGNS,
      messages: DEMO_MESSAGES,
      settings: DEMO_SETTINGS,
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      customers: DEMO_CUSTOMERS,
      campaigns: DEMO_CAMPAIGNS,
      messages: DEMO_MESSAGES,
      settings: DEMO_SETTINGS,
    };
  }

  try {
    const parsed = JSON.parse(raw) as { customers?: Customer[]; campaigns?: Campaign[]; messages?: Message[]; settings?: BusinessSettings };
    return {
      customers: parsed.customers ?? DEMO_CUSTOMERS,
      campaigns: parsed.campaigns ?? DEMO_CAMPAIGNS,
      messages: parsed.messages ?? DEMO_MESSAGES,
      settings: parsed.settings ?? DEMO_SETTINGS,
    };
  } catch {
    return {
      customers: DEMO_CUSTOMERS,
      campaigns: DEMO_CAMPAIGNS,
      messages: DEMO_MESSAGES,
      settings: DEMO_SETTINGS,
    };
  }
}

export function writeDemoState(next: Partial<{ customers: Customer[]; campaigns: Campaign[]; messages: Message[]; settings: BusinessSettings }>) {
  if (typeof window === "undefined") return;

  const current = readDemoState();
  const updated = {
    customers: next.customers ?? current.customers,
    campaigns: next.campaigns ?? current.campaigns,
    messages: next.messages ?? current.messages,
    settings: next.settings ?? current.settings,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
