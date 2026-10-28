import Link from "next/link";
import { Bell, FileText, FolderKanban, LayoutDashboard, MessageSquareText, Settings, Users } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/segments", label: "Segments", icon: FolderKanban },
  { href: "/campaigns", label: "Campaigns", icon: Bell },
  { href: "/message-studio", label: "Message Studio", icon: MessageSquareText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="h-screen w-72 border-r border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">R</div>
        <div>
          <div className="font-semibold text-slate-900">ReactivationIQ</div>
          <div className="text-xs text-slate-500">Demo workspace</div>
        </div>
      </div>
      <nav className="space-y-2">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="mt-8 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
        <div className="mb-2 flex items-center gap-2 font-medium text-slate-800">
          <FileText className="h-4 w-4" /> Privacy notice
        </div>
        Demo-only data. Customer records are fictional and excluded from production systems.
      </div>
    </aside>
  );
}
