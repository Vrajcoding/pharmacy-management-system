export default function FEFOInventoryPage() {
  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">FEFO Inventory</h2>
          <p className="text-on-surface-variant font-medium">First-Expiry-First-Out management system.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              className="pl-10 pr-4 py-3 bg-surface-container-high border-none rounded-lg w-full md:w-64 focus:ring-2 focus:ring-primary text-sm shadow-sm"
              placeholder="Search medicine or batch..."
              type="text"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-surface-container-highest rounded-lg font-semibold text-sm hover:bg-surface-variant transition-all">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-tertiary-container text-on-tertiary-container p-6 rounded-lg flex flex-col justify-between min-h-[160px] shadow-sm">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          <div>
            <h3 className="font-headline text-5xl font-black mb-1">14</h3>
            <p className="text-sm font-bold uppercase tracking-wider opacity-80">Expiring Soon</p>
          </div>
        </div>
        <div className="lg:col-span-3 bg-surface-container-low rounded-lg p-8 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface mb-1">Critical Expiry Timeline</h3>
              <p className="text-sm text-on-surface-variant">Prioritizing stock movement for the next 30 days.</p>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-tighter bg-primary-fixed px-2 py-1 rounded">
              System Priority: High
            </span>
          </div>
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
            <div className="h-full bg-tertiary w-1/4"></div>
            <div className="h-full bg-secondary w-1/2"></div>
            <div className="h-full bg-primary-container w-1/4"></div>
          </div>
          <div className="flex justify-between mt-4 text-[11px] font-bold text-outline uppercase tracking-widest">
            <span>Expired (4)</span>
            <span>Next 30 Days (10)</span>
            <span>Stable Stock (142)</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-outline text-[11px] font-bold uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Medicine Name</th>
                <th className="px-6 py-6">Batch No</th>
                <th className="px-6 py-6 flex items-center gap-1">
                  Expiry Date
                  <span className="material-symbols-outlined text-sm text-primary">arrow_upward</span>
                </th>
                <th className="px-6 py-6 text-center">Days Left</th>
                <th className="px-6 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-transparent">
              <tr className="bg-tertiary-container/10 hover:bg-tertiary-container/20 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                        pill
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Amoxicillin 500mg</p>
                      <p className="text-xs text-on-surface-variant font-medium">Antibiotic Cluster</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="font-mono text-sm px-2 py-1 bg-surface-container-highest rounded">#AMX-90822</span>
                </td>
                <td className="px-6 py-6">
                  <p className="font-bold text-tertiary">Oct 24, 2023</p>
                </td>
                <td className="px-6 py-6 text-center">
                  <span className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-[11px] font-black uppercase tracking-tighter">
                    EXPIRED
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-md hover:opacity-90 transition-opacity flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-sm">shopping_cart</span> Place Order
                    </button>
                  </div>
                </td>
              </tr>
              {[
                { name: "Insulin Glargine", category: "Endocrine Support", batch: "#INS-44211", date: "Nov 18, 2023", days: "12", color: "tertiary" },
                { name: "Atorvastatin 20mg", category: "Cardiovascular", batch: "#ATR-11200", date: "Nov 29, 2023", days: "23", color: "tertiary" },
                { name: "Paracetamol 500mg", category: "Analgesics", batch: "#PAR-77812", date: "Jan 12, 2024", days: "67", color: "primary" },
              ].map((item, idx) => (
                <tr key={idx} className="bg-surface-container-lowest/50 hover:bg-surface-container-lowest transition-colors border-l-4 border-tertiary">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-outline">
                        <span className="material-symbols-outlined">medication</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{item.name}</p>
                        <p className="text-xs text-on-surface-variant font-medium">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-mono text-sm px-2 py-1 bg-surface-container-highest rounded">{item.batch}</span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-bold text-on-surface">{item.date}</p>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <p className={`text-xl font-headline font-black text-${item.color}`}>{item.days}</p>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-md hover:opacity-90 transition-opacity flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-sm">shopping_cart</span> Place Order
                      </button>
                      <button className="px-4 py-2 bg-surface-container-high text-on-surface text-xs font-bold rounded-md shadow-sm">
                        Mark for Use
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 bg-surface-container-highest/30 flex justify-between items-center">
          <p className="text-xs font-bold text-outline uppercase tracking-widest">Showing 4 of 156 Items</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-outline hover:bg-surface-container-high transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold">1</button>
            <button className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface font-bold">2</button>
            <button className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-outline hover:bg-surface-container-high transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
