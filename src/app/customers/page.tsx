import { Sidebar } from "@/components/layout/sidebar";
import { DEMO_CUSTOMERS } from "@/lib/demo-data";

export default function CustomersPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Customers</h1>
          <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Import CSV</button>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last activity</th>
                <th className="px-4 py-3">Value</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium">{customer.first_name} {customer.last_name}</td>
                  <td className="px-4 py-3 text-slate-600">{customer.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{customer.customer_status}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{customer.last_activity_at ? new Date(customer.last_activity_at).toLocaleDateString() : "No activity"}</td>
                  <td className="px-4 py-3">${customer.lifetime_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
