import { Sidebar } from "@/components/layout/sidebar";
import { DEMO_SETTINGS } from "@/lib/demo-data";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-3xl font-semibold">Settings</h1>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Business</div>
            <div className="mt-2 font-medium">{DEMO_SETTINGS.business_name}</div>
            <div className="mt-1 text-sm text-slate-600">{DEMO_SETTINGS.business_type}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">AI status</div>
            <div className="mt-2 font-medium capitalize">{DEMO_SETTINGS.ai_status}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Messaging provider</div>
            <div className="mt-2 font-medium capitalize">{DEMO_SETTINGS.messaging_status}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Timezone</div>
            <div className="mt-2 font-medium">{DEMO_SETTINGS.timezone}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
