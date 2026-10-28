import { Sidebar } from "@/components/layout/sidebar";
import { DEMO_CAMPAIGNS } from "@/lib/demo-data";

export default function CampaignsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-3xl font-semibold">Campaigns</h1>
        <div className="space-y-4">
          {DEMO_CAMPAIGNS.map((campaign) => (
            <div key={campaign.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold">{campaign.name}</div>
                  <div className="text-sm text-slate-500">{campaign.channel} · {campaign.status}</div>
                </div>
                <button className="rounded-full border border-slate-300 px-3 py-2 text-sm">Review</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
