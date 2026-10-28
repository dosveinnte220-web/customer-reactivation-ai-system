import Link from "next/link";
import { ArrowRight, BarChart3, FileUp, Mail, Sparkles, Users } from "lucide-react";

const stats = [
  { label: "Customers tracked", value: "25", icon: Users },
  { label: "Inactive segments", value: "5", icon: BarChart3 },
  { label: "Campaigns ready", value: "2", icon: Mail },
  { label: "AI templates", value: "3", icon: Sparkles },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#eef2ff,_#f8fafc_35%,_#f8fafc_100%)] px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">R</div>
            <div>
              <p className="text-lg font-semibold">ReactivationIQ</p>
              <p className="text-xs text-slate-500">AI-powered customer reactivation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium">Dashboard</Link>
            <Link href="/signup" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Get started</Link>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="mb-4 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">Demo workspace · no live credentials required</p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Bring inactive customers back with smarter segmentation and outreach.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              ReactivationIQ helps teams identify dormant customers, generate personalized messages, review campaign performance, and maintain compliant outreach without paid AI or messaging dependencies.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-500">
                Open demo dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/customers" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700">
                <FileUp className="h-4 w-4" /> Import customers
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-200">Demo snapshot</p>
            <div className="mt-6 space-y-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-800/80 p-4">
                  <div>
                    <div className="text-2xl font-semibold">{value}</div>
                    <div className="text-sm text-slate-300">{label}</div>
                  </div>
                  <Icon className="h-7 w-7 text-indigo-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
