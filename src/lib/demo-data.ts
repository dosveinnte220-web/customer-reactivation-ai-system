import type { BusinessSettings, Campaign, Customer, Message } from "@/lib/types";

const day = 24 * 60 * 60 * 1000;
const DEMO_REFERENCE_DATE = new Date("2025-01-15T00:00:00.000Z");

const toDateString = (daysAgo: number) => {
  const date = new Date(DEMO_REFERENCE_DATE.getTime() - daysAgo * day);
  return date.toISOString();
};

export const DEMO_SETTINGS: BusinessSettings = {
  business_name: "North Peak Fitness",
  business_type: "gym",
  default_language: "en",
  timezone: "America/Denver",
  inactivity_thresholds: {
    recently_inactive_days: 14,
    inactive_days: 30,
    highly_inactive_days: 60,
    dormant_days: 90,
  },
  default_message_tone: "friendly",
  default_channel: "email",
  ai_status: "template",
  messaging_status: "manual-only",
  privacy_notice:
    "ReactivationIQ is a demo workspace for testing customer outreach workflows. Demo data is fictional and not production data.",
  retention_days: 365,
};

export const DEMO_CUSTOMERS: Customer[] = [
  { id: "c-001", user_id: "user-demo", external_id: "CRM-101", first_name: "Maya", last_name: "Patel", email: "maya.patel@example.com", phone: "+1-303-555-0101", last_activity_at: toDateString(12), total_visits: 28, lifetime_value: 820, customer_status: "active", consent_status: "opted_in", consent_source: "site signup", notes: "Prefers early morning classes.", created_at: toDateString(520), updated_at: toDateString(12) },
  { id: "c-002", user_id: "user-demo", external_id: "CRM-102", first_name: "Daniel", last_name: "Nguyen", email: "daniel.nguyen@example.com", phone: "+1-720-555-0102", last_activity_at: toDateString(22), total_visits: 18, lifetime_value: 630, customer_status: "inactive", consent_status: "opted_in", consent_source: "member portal", notes: "Interested in strength training.", created_at: toDateString(480), updated_at: toDateString(22) },
  { id: "c-003", user_id: "user-demo", external_id: "CRM-103", first_name: "Sophia", last_name: "Martinez", email: "sophia.martinez@example.com", phone: "+1-970-555-0103", last_activity_at: toDateString(46), total_visits: 15, lifetime_value: 550, customer_status: "inactive", consent_status: "opted_in", consent_source: "in-person form", notes: "Responds well to motivational messaging.", created_at: toDateString(450), updated_at: toDateString(46) },
  { id: "c-004", user_id: "user-demo", external_id: "CRM-104", first_name: "Ethan", last_name: "Brooks", email: "ethan.brooks@example.com", phone: "+1-720-555-0104", last_activity_at: toDateString(78), total_visits: 12, lifetime_value: 490, customer_status: "inactive", consent_status: "unknown", consent_source: "check-in kiosk", notes: "No recent contact preferences on file.", created_at: toDateString(390), updated_at: toDateString(78) },
  { id: "c-005", user_id: "user-demo", external_id: "CRM-105", first_name: "Ava", last_name: "Kim", email: "ava.kim@example.com", phone: "+1-303-555-0105", last_activity_at: toDateString(135), total_visits: 9, lifetime_value: 360, customer_status: "inactive", consent_status: "opted_in", consent_source: "email sign-up", notes: "Has a favorite yoga instructor.", created_at: toDateString(400), updated_at: toDateString(135) },
  { id: "c-006", user_id: "user-demo", external_id: "CRM-106", first_name: "Luis", last_name: "Garcia", email: "luis.garcia@example.com", phone: "+1-970-555-0106", last_activity_at: toDateString(180), total_visits: 21, lifetime_value: 1200, customer_status: "inactive", consent_status: "opted_in", consent_source: "annual renewal", notes: "High-value member; check with manager before outreach.", created_at: toDateString(560), updated_at: toDateString(180) },
  { id: "c-007", user_id: "user-demo", external_id: "CRM-107", first_name: "Olivia", last_name: "Davis", email: "olivia.davis@example.com", phone: "+1-720-555-0107", last_activity_at: toDateString(43), total_visits: 17, lifetime_value: 470, customer_status: "inactive", consent_status: "opted_in", consent_source: "mobile app", notes: "Prefers SMS offers.", created_at: toDateString(420), updated_at: toDateString(43) },
  { id: "c-008", user_id: "user-demo", external_id: "CRM-108", first_name: "Noah", last_name: "Brown", email: "noah.brown@example.com", phone: "", last_activity_at: null, total_visits: 3, lifetime_value: 160, customer_status: "inactive", consent_status: "unknown", consent_source: null, notes: "Missing contact details; verify before outreach.", created_at: toDateString(250), updated_at: toDateString(200) },
  { id: "c-009", user_id: "user-demo", external_id: "CRM-109", first_name: "Emma", last_name: "Wilson", email: "emma.wilson@example.com", phone: "+1-303-555-0109", last_activity_at: toDateString(9), total_visits: 31, lifetime_value: 980, customer_status: "active", consent_status: "opted_in", consent_source: "web form", notes: "Recently started PT sessions.", created_at: toDateString(550), updated_at: toDateString(9) },
  { id: "c-010", user_id: "user-demo", external_id: "CRM-110", first_name: "Logan", last_name: "Thomas", email: "logan.thomas@example.com", phone: "+1-970-555-0110", last_activity_at: toDateString(96), total_visits: 16, lifetime_value: 610, customer_status: "inactive", consent_status: "opted_in", consent_source: "feedback form", notes: "Used to attend cycling classes.", created_at: toDateString(430), updated_at: toDateString(96) },
  { id: "c-011", user_id: "user-demo", external_id: "CRM-111", first_name: "Harper", last_name: "Lee", email: "harper.lee@example.com", phone: "+1-303-555-0111", last_activity_at: toDateString(59), total_visits: 11, lifetime_value: 440, customer_status: "inactive", consent_status: "opted_out", consent_source: "email opt-out", notes: "Suppressed from outreach.", created_at: toDateString(410), updated_at: toDateString(59) },
  { id: "c-012", user_id: "user-demo", external_id: "CRM-112", first_name: "Benjamin", last_name: "Harris", email: "benjamin.harris@example.com", phone: "+1-720-555-0112", last_activity_at: toDateString(34), total_visits: 22, lifetime_value: 760, customer_status: "inactive", consent_status: "opted_in", consent_source: "checkout", notes: "Interested in personal training packages.", created_at: toDateString(500), updated_at: toDateString(34) },
  { id: "c-013", user_id: "user-demo", external_id: "CRM-113", first_name: "Chloe", last_name: "Anderson", email: "chloe.anderson@example.com", phone: "+1-303-555-0113", last_activity_at: toDateString(150), total_visits: 5, lifetime_value: 290, customer_status: "inactive", consent_status: "unknown", consent_source: "manual import", notes: "Potential reactivation candidate.", created_at: toDateString(330), updated_at: toDateString(150) },
  { id: "c-014", user_id: "user-demo", external_id: "CRM-114", first_name: "Isaac", last_name: "Walker", email: "isaac.walker@example.com", phone: "+1-970-555-0114", last_activity_at: toDateString(204), total_visits: 4, lifetime_value: 220, customer_status: "inactive", consent_status: "opted_in", consent_source: "member feedback", notes: "May be open to a short-term trial.", created_at: toDateString(320), updated_at: toDateString(204) },
  { id: "c-015", user_id: "user-demo", external_id: "CRM-115", first_name: "Ella", last_name: "Scott", email: "ella.scott@example.com", phone: "+1-720-555-0115", last_activity_at: null, total_visits: 7, lifetime_value: 410, customer_status: "inactive", consent_status: "unknown", consent_source: null, notes: "No activity history recorded.", created_at: toDateString(300), updated_at: toDateString(210) },
  { id: "c-016", user_id: "user-demo", external_id: "CRM-116", first_name: "Jack", last_name: "Young", email: "jack.young@example.com", phone: "+1-303-555-0116", last_activity_at: toDateString(17), total_visits: 24, lifetime_value: 705, customer_status: "active", consent_status: "opted_in", consent_source: "loyalty club", notes: "Active in group fitness.", created_at: toDateString(500), updated_at: toDateString(17) },
  { id: "c-017", user_id: "user-demo", external_id: "CRM-117", first_name: "Scarlett", last_name: "King", email: "scarlett.king@example.com", phone: "+1-970-555-0117", last_activity_at: toDateString(85), total_visits: 13, lifetime_value: 500, customer_status: "inactive", consent_status: "opted_in", consent_source: "newsletter", notes: "May respond to a free orientation offer.", created_at: toDateString(390), updated_at: toDateString(85) },
  { id: "c-018", user_id: "user-demo", external_id: "CRM-118", first_name: "Leo", last_name: "Hall", email: "leo.hall@example.com", phone: "+1-303-555-0118", last_activity_at: toDateString(110), total_visits: 18, lifetime_value: 670, customer_status: "inactive", consent_status: "opted_in", consent_source: "gym app", notes: "Open to returning if the schedule fits.", created_at: toDateString(430), updated_at: toDateString(110) },
  { id: "c-019", user_id: "user-demo", external_id: "CRM-119", first_name: "Luna", last_name: "Adams", email: "luna.adams@example.com", phone: "+1-720-555-0119", last_activity_at: toDateString(60), total_visits: 9, lifetime_value: 350, customer_status: "inactive", consent_status: "opted_out", consent_source: "customer service", notes: "Do not contact.", created_at: toDateString(260), updated_at: toDateString(60) },
  { id: "c-020", user_id: "user-demo", external_id: "CRM-120", first_name: "Mateo", last_name: "Perez", email: "mateo.perez@example.com", phone: "+1-720-555-0120", last_activity_at: toDateString(42), total_visits: 27, lifetime_value: 880, customer_status: "inactive", consent_status: "opted_in", consent_source: "online booking", notes: "Good candidate for a win-back offer.", created_at: toDateString(540), updated_at: toDateString(42) },
  { id: "c-021", user_id: "user-demo", external_id: "CRM-121", first_name: "Zoe", last_name: "Mitchell", email: "zoe.mitchell@example.com", phone: "+1-303-555-0121", last_activity_at: toDateString(121), total_visits: 8, lifetime_value: 310, customer_status: "inactive", consent_status: "unknown", consent_source: "manual review", notes: "Needs consent check before messaging.", created_at: toDateString(280), updated_at: toDateString(121) },
  { id: "c-022", user_id: "user-demo", external_id: "CRM-122", first_name: "Henry", last_name: "Roberts", email: "henry.roberts@example.com", phone: "+1-970-555-0122", last_activity_at: toDateString(300), total_visits: 6, lifetime_value: 250, customer_status: "inactive", consent_status: "opted_in", consent_source: "community signup", notes: "Dormant; review before sending.", created_at: toDateString(340), updated_at: toDateString(300) },
  { id: "c-023", user_id: "user-demo", external_id: "CRM-123", first_name: "Nora", last_name: "Turner", email: "nora.turner@example.com", phone: "", last_activity_at: toDateString(73), total_visits: 10, lifetime_value: 480, customer_status: "inactive", consent_status: "opted_in", consent_source: "survey", notes: "Missing phone so prefer email outreach.", created_at: toDateString(350), updated_at: toDateString(73) },
  { id: "c-024", user_id: "user-demo", external_id: "CRM-124", first_name: "Wyatt", last_name: "Parker", email: "wyatt.parker@example.com", phone: "+1-720-555-0124", last_activity_at: toDateString(188), total_visits: 14, lifetime_value: 530, customer_status: "inactive", consent_status: "opted_in", consent_source: "email campaign", notes: "Still fits the win-back segment.", created_at: toDateString(470), updated_at: toDateString(188) },
  { id: "c-025", user_id: "user-demo", external_id: "CRM-125", first_name: "Grace", last_name: "Ward", email: "grace.ward@example.com", phone: "+1-303-555-0125", last_activity_at: toDateString(30), total_visits: 20, lifetime_value: 680, customer_status: "do_not_contact", consent_status: "opted_in", consent_source: "internal note", notes: "Do Not Contact list.", created_at: toDateString(520), updated_at: toDateString(30) },
];

export const DEMO_CAMPAIGNS: Campaign[] = [
  { id: "camp-001", user_id: "user-demo", name: "Spring Re-engagement", channel: "email", segment_rules: { segment: "inactive", tone: "friendly" }, status: "ready", created_at: toDateString(7), updated_at: toDateString(1) },
  { id: "camp-002", user_id: "user-demo", name: "High Value Win-Back", channel: "sms", segment_rules: { segment: "high_value_inactive", tone: "professional" }, status: "draft", created_at: toDateString(18), updated_at: toDateString(3) },
];

export const DEMO_MESSAGES: Message[] = [
  { id: "msg-001", user_id: "user-demo", campaign_id: "camp-001", customer_id: "c-002", channel: "email", message_body: "Hi Daniel, we miss seeing you at the gym. Want to comeback for a quick refresh and a tour of our new classes?", status: "approved", provider_message_id: null, sent_at: null, error_message: null, created_at: toDateString(6), updated_at: toDateString(5) },
  { id: "msg-002", user_id: "user-demo", campaign_id: "camp-001", customer_id: "c-003", channel: "email", message_body: "Hi Sophia, we would love to welcome you back. We have a few new classes and a quick check-in plan ready for you.", status: "queued", provider_message_id: null, sent_at: null, error_message: null, created_at: toDateString(5), updated_at: toDateString(2) },
  { id: "msg-003", user_id: "user-demo", campaign_id: "camp-001", customer_id: "c-006", channel: "email", message_body: "Hi Luis, we miss your energy at the club. We’d love to help you get back on track with a personalized plan.", status: "sent", provider_message_id: "provider-abc", sent_at: toDateString(2), error_message: null, created_at: toDateString(4), updated_at: toDateString(2) },
];

export const DEMO_ANALYTICS = {
  summary: {
    total_customers: DEMO_CUSTOMERS.length,
    inactive_customers: DEMO_CUSTOMERS.filter((customer) => customer.customer_status === "inactive").length,
    eligible_customers: DEMO_CUSTOMERS.filter((customer) => customer.customer_status !== "do_not_contact" && customer.consent_status === "opted_in").length,
    messages_generated: DEMO_MESSAGES.length,
    messages_sent: DEMO_MESSAGES.filter((message) => ["sent", "delivered", "replied"].includes(message.status)).length,
    delivered_messages: DEMO_MESSAGES.filter((message) => ["delivered", "replied"].includes(message.status)).length,
    replies: DEMO_MESSAGES.filter((message) => message.status === "replied").length,
    reactivated_customers: 2,
  },
};
