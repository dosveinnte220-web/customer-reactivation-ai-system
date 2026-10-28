import { Sidebar } from "@/components/layout/sidebar";
import { DEMO_CUSTOMERS, DEMO_SETTINGS } from "@/lib/demo-data";
import { getSegmentDefinitions } from "@/lib/segmentation";

export default function SegmentsPage() {
  const segments = getSegmentDefinitions(DEMO_CUSTOMERS, DEMO_SETTINGS);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-3xl font-semibold">Segments</h1>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {segments.map((segment) => (
            <div key={segment.key} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-2 text-sm font-medium text-slate-500">{segment.label}</div>
              <div className="text-3xl font-semibold">{segment.count}</div>
              <div className="mt-2 text-sm text-slate-600">{segment.description}</div>
              <div className="mt-4 text-xs text-indigo-700">Eligible: {segment.eligible}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
