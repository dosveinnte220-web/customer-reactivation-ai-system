import { Sidebar } from "@/components/layout/sidebar";
import { DEMO_CUSTOMERS } from "@/lib/demo-data";
import { generateMessageVariants } from "@/lib/messages";

const firstCustomer = DEMO_CUSTOMERS[0];
const variants = generateMessageVariants({
  businessType: "gym",
  campaignObjective: "Reconnect with members before they drift away.",
  channel: "email",
  tone: "friendly",
  offer: "Free 1-week guest pass.",
  segment: "inactive",
  customer: firstCustomer,
  maxLength: 180,
});

export default function MessageStudioPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-3xl font-semibold">Message Studio</h1>
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <div key={variant} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-2 text-sm font-medium text-slate-500">Variant {index + 1}</div>
              <p className="text-slate-700">{variant}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
