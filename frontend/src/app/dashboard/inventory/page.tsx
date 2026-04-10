export default function InventoryPage() {
  return (
    <>
      {/* Header & Stats Bento */}
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
              Inventory Management
            </h2>
            <p className="text-on-surface-variant font-medium">
              Monitoring 2,481 active medical units across 48 categories.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-surface-container-high text-on-surface px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export
            </button>
            <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 flex items-center gap-2 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Medication
            </button>
          </div>
        </div>

        {/* Bento Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-secondary">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Healthy</span>
            </div>
            <p className="text-4xl font-headline font-bold text-on-surface tracking-tight">84%</p>
            <p className="text-xs font-medium text-on-surface-variant mt-1">Optimum Stock Levels</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-primary">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Active</span>
            </div>
            <p className="text-4xl font-headline font-bold text-on-surface tracking-tight">1.2k</p>
            <p className="text-xs font-medium text-on-surface-variant mt-1">Dispensed Today</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-tertiary-container">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-error">warning</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Urgent</span>
            </div>
            <p className="text-4xl font-headline font-bold text-on-surface tracking-tight">14</p>
            <p className="text-xs font-medium text-on-surface-variant mt-1">Critical Expiry Alerts</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-outline">
            <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-outline">archive</span>
              <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Shortage</span>
            </div>
            <p className="text-4xl font-headline font-bold text-on-surface tracking-tight">03</p>
            <p className="text-xs font-medium text-on-surface-variant mt-1">Out of Stock SKU's</p>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <section className="bg-surface-container-low p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-lg focus:ring-2 focus:ring-primary/20 font-medium text-sm text-on-surface placeholder:text-outline"
            placeholder="Search drug name, manufacturer, or SKU..."
            type="text"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-surface-container-highest text-on-surface rounded-lg font-semibold text-sm hover:bg-outline-variant transition-colors">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Category
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-surface-container-highest text-on-surface rounded-lg font-semibold text-sm hover:bg-outline-variant transition-colors">
            <span className="material-symbols-outlined text-[18px]">sort</span>
            Status
          </button>
        </div>
      </section>

      {/* Clinical Inventory List */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant text-[11px] font-bold uppercase tracking-[0.15em]">
                <th className="px-6 py-4">Medication Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Current Stock</th>
                <th className="px-6 py-4">Min. Threshold</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y-0">
              {[
                {
                  name: "Amoxicillin 500mg",
                  sku: "AMX-500-042",
                  category: "Antibiotic",
                  stock: 12,
                  threshold: 80,
                  status: "Critical",
                  color: "error",
                  icon: "medication",
                },
                {
                  name: "Lisinopril 10mg",
                  sku: "LSN-010-881",
                  category: "Cardiology",
                  stock: 450,
                  threshold: 100,
                  status: "OK",
                  color: "secondary",
                  icon: "pill",
                },
                {
                  name: "Insulin Glargine",
                  sku: "INS-GLA-002",
                  category: "Endocrinology",
                  stock: 34,
                  threshold: 50,
                  status: "Low",
                  color: "primary",
                  icon: "vaccines",
                },
                {
                  name: "Epinephrine Pen",
                  sku: "EPI-PEN-012",
                  category: "Emergency",
                  stock: 0,
                  threshold: 15,
                  status: "Out of Stock",
                  color: "on-surface",
                  icon: "medical_services",
                },
              ].map((item, idx) => (
                <tr
                  key={idx}
                  className={`group hover:bg-surface-container-low cursor-pointer transition-colors ${
                    idx % 2 !== 0 ? "bg-surface-container-low/30" : ""
                  }`}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container-high rounded-lg flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <p className="font-headline font-bold text-on-surface">{item.name}</p>
                        <p className="text-xs text-on-surface-variant font-medium">SKU: {item.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-primary-fixed/50 text-on-primary-fixed-variant px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <p className={`font-headline font-bold ${item.stock === 0 ? 'text-error' : 'text-on-surface'} text-lg`}>
                        {item.stock.toString().padStart(2, '0')}
                      </p>
                      <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${item.color === 'on-surface' ? 'on-surface' : item.color} rounded-full`}
                          style={{ width: `${item.stock > threshold ? 100 : (item.stock / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-medium text-on-surface-variant">{item.threshold} Units</td>
                  <td className="px-6 py-5">
                    <span
                      className={`flex items-center gap-2 ${
                        item.status === 'Critical' ? 'bg-tertiary-container text-white' : 
                        item.status === 'OK' ? 'bg-secondary-container text-on-secondary-container' :
                        item.status === 'Low' ? 'bg-primary-fixed text-on-primary-fixed-variant' :
                        'bg-on-surface text-surface'
                      } px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider`}
                    >
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {item.status === 'Critical' ? 'emergency' : item.status === 'OK' ? 'check_circle' : item.status === 'Low' ? 'error' : 'cancel'}
                      </span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                      chevron_right
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="p-6 bg-surface-container flex justify-between items-center">
          <p className="text-sm font-medium text-on-surface-variant">Showing 1-4 of 1,240 medications</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-white transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-container text-white font-bold">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-white transition-colors">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-white transition-colors">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-highest text-on-surface-variant hover:bg-primary-container hover:text-white transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
const threshold = 100; // placeholder for logic
