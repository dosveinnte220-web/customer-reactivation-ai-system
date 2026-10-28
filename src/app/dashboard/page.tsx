import { Sidebar } from "@/components/layout/sidebar";
import { DEMO_ANALYTICS, DEMO_CUSTOMERS, DEMO_MESSAGES } from "@/lib/demo-data";
import { getSegmentDefinitions } from "@/lib/segmentation";
import { DEMO_SETTINGS } from "@/lib/demo-data";

export default function DashboardPage() {
  const summary = DEMO_ANALYTICS.summary;
  const segments = getSegmentDefinitions(DEMO_CUSTOMERS, DEMO_SETTINGS);
  const cards = [
    { label: "Total customers", value: summary.total_customers },
    { label: "Inactive customers", value: summary.inactive_customers },
    { label: "Eligible outreach", value: summary.eligible_customers },
    { label: "Messages generated", value: summary.messages_generated },
    { label: "Messages sent", value: summary.messages_sent },
    { label: "Delivered", value: summary.delivered_messages },
    { label: "Replies", value: summary.replies },
    { label: "Reactivated", value: summary.reactivated_customers },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Overview</p>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
          </div>
          <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">Demo mode</div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-sm text-slate-500">{card.label}</div>
              <div className="mt-3 text-3xl font-semibold">{card.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Inactivity distribution</h2>
            <div className="mt-5 space-y-4">
              {segments.map((segment) => (
                <div key={segment.key}>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                    <span>{segment.label}</span>
                    <span>{segment.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${Math.max(10, (segment.count / Math.max(1, DEMO_CUSTOMERS.length)) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Recent campaign activity</h2>
            <div className="mt-4 space-y-3">
              {DEMO_MESSAGES.slice(0, 3).map((message) => (
                <div key={message.id} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  <div className="font-medium">{message.status}</div>
                  <div className="mt-1 text-xs text-slate-500">Campaign {message.campaign_id}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
