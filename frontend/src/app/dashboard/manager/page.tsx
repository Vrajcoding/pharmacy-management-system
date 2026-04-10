export default function ManagerDashboard() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-2">Strategic Overview</h2>
        <p className="text-on-surface-variant text-sm max-w-2xl">
          Real-time clinical logistics and consumption metrics for the central repository.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Stock Units", value: "14,280", change: "+12% MoM", icon: "inventory", color: "primary" },
          { label: "Monthly Consumption", value: "2,845", change: "Normal Range", icon: "monitoring", color: "secondary" },
          { label: "Near Expiry", value: "14", change: "Critical", icon: "priority_high", color: "tertiary" },
          { label: "Approval Queue", value: "23", change: "8 Pending", icon: "order_approve", color: "on-surface-variant" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-surface-container-lowest p-6 rounded-xl space-y-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${stat.color === 'primary' ? 'primary/10 text-primary' : stat.color === 'secondary' ? 'secondary-container/30 text-secondary' : stat.color === 'tertiary' ? 'tertiary-container/10 text-tertiary' : 'surface-container-highest rounded-lg text-on-surface-variant'} rounded-lg`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`text-[10px] font-bold ${stat.color === 'secondary' ? 'text-secondary' : stat.color === 'tertiary' ? 'text-error' : 'text-primary'} uppercase tracking-widest`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
              <p className={`font-headline text-4xl font-extrabold ${stat.color === 'tertiary' ? 'text-tertiary' : stat.color === 'primary' ? 'text-primary' : 'text-on-surface'} tracking-tighter`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-headline font-bold text-lg">Medicine Stock Levels</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-sm bg-primary"></span> Current
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-sm bg-outline-variant"></span> Target
              </span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {[
              { label: "Antibiotics", current: 85, target: 95 },
              { label: "Cardio", current: 45, target: 80 },
              { label: "Analgesics", current: 92, target: 90 },
              { label: "Respiratory", current: 30, target: 70 },
              { label: "Diabetes", current: 65, target: 85 },
            ].map((bar, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 w-full">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div className="w-8 bg-primary rounded-t-md" style={{ height: `${bar.current}%` }}></div>
                  <div className="w-4 bg-outline-variant/30 rounded-t-sm" style={{ height: `${bar.target}%` }}></div>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low p-8 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="font-headline font-bold text-lg mb-8 w-full text-left">Expiry Distribution</h3>
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle className="stroke-secondary-container" cx="18" cy="18" fill="none" r="16" strokeDasharray="75, 100" strokeWidth="4"></circle>
              <circle className="stroke-primary-fixed" cx="18" cy="18" fill="none" r="16" strokeDasharray="15, 100" strokeDashoffset="-75" strokeWidth="4"></circle>
              <circle className="stroke-tertiary" cx="18" cy="18" fill="none" r="16" strokeDasharray="10, 100" strokeDashoffset="-90" strokeWidth="4"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-on-surface">1.2k</span>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Batches</span>
            </div>
          </div>
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span> Safe (75%)
              </div>
              <span className="text-on-surface-variant">900</span>
            </div>
            <div className="flex justify-between items-center text-xs font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-fixed"></span> Near (15%)
              </div>
              <span className="text-on-surface-variant">180</span>
            </div>
            <div className="flex justify-between items-center text-xs font-medium text-tertiary">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span> Expired (10%)
              </div>
              <span className="font-bold">120</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-headline font-bold text-lg">Inventory Summary</h3>
              <p className="text-xs text-on-surface-variant">Detailed breakdown of top active inventory groups</p>
            </div>
            <button className="text-xs font-bold text-primary hover:underline transition-all">View Full Ledger</button>
          </div>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high/30">
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    Drug Group
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    Risk
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {[
                  { name: "Amoxicillin 500mg", stock: "1,240", status: "Optimal", risk: 15, color: "secondary" },
                  { name: "Insulin Aspart", stock: "420", status: "Low Stock", risk: 75, color: "primary" },
                  { name: "Warfarin 5mg", stock: "85", status: "Expiring", risk: 90, color: "tertiary" },
                  { name: "Lisinopril 10mg", stock: "2,100", status: "Optimal", risk: 25, color: "secondary" },
                ].map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4 font-medium text-sm">{item.name}</td>
                    <td className="px-6 py-4 text-sm font-body tabular-nums">{item.stock}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 ${
                          item.color === "secondary"
                            ? "bg-secondary-container text-on-secondary-container"
                            : item.color === "primary"
                            ? "bg-primary-fixed text-on-primary-fixed-variant"
                            : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                        } text-[10px] font-bold rounded-full uppercase`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                        <div className={`bg-${item.color} h-full`} style={{ width: `${item.risk}%` }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-2 space-y-4">
          <h3 className="font-headline font-bold text-lg">Approval Queue</h3>
          <div className="space-y-3">
            {[
              { title: "Resupply: Station B", details: "Batch #TR-9921 • $4,200.00", icon: "local_shipping" },
              { title: "Emergency Refill", details: "Critical Depletion • $1,150.00", icon: "medical_services" },
              { title: "Lab Equipment", details: "Standard Recurring • $8,900.00", icon: "package_2" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between group hover:shadow-md transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-[11px] text-on-surface-variant font-medium">{item.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-error hover:bg-error-container/20 rounded-full transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                  <button className="p-2 text-secondary hover:bg-secondary-container/20 rounded-full transition-colors">
                    <span className="material-symbols-outlined">check</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors">
            Process All Queue Items
          </button>
        </div>
      </div>
    </div>
  );
}
