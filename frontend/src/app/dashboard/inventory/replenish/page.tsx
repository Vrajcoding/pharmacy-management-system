export default function StockReplenishmentPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-32">
      <header>
        <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2 cursor-pointer hover:underline">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Inventory</span>
        </div>
        <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">
          Stock Replenishment
        </h1>
        <p className="text-on-surface-variant font-body">Log new batches and update current medication levels.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-surface-container-low p-8 rounded-xl shadow-sm">
            <h2 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">medication</span>
              Select Medication
            </h2>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                  Search Catalog or Dropdown
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-surface-container-high border-none rounded-lg py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline"
                    placeholder="Start typing medication name..."
                    type="text"
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary">
                    search
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-xs font-semibold cursor-pointer hover:bg-primary hover:text-white transition-colors">
                    Amoxicillin 500mg
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-semibold cursor-pointer hover:bg-primary-fixed">
                    Lisinopril 10mg
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-semibold cursor-pointer hover:bg-primary-fixed">
                    Atorvastatin 20mg
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-lg flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-primary">pill</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg">Amoxicillin Capsules</h3>
                    <p className="text-sm text-on-surface-variant">500mg • Oral Route • SKU: AMX-500-BK</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-outline uppercase tracking-tighter">Current Stock</p>
                  <p className="text-2xl font-headline font-extrabold text-primary">
                    1,240 <span className="text-sm font-normal text-on-surface-variant">units</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-low p-8 rounded-xl shadow-sm">
            <h2 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_box</span>
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Batch Number
                </label>
                <input
                  className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
                  type="text"
                  defaultValue="BCH-2024-08-12"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Supplier
                </label>
                <select className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all">
                  <option>Global Pharma Distribution</option>
                  <option>MediCare Logistics</option>
                  <option>Vitality Wholesale</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Quantity Received
                </label>
                <div className="flex items-center bg-surface-container-high rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                  <input
                    className="flex-1 bg-transparent border-none py-3 px-4 focus:ring-0"
                    type="number"
                    defaultValue="500"
                  />
                  <span className="px-4 text-xs font-bold text-outline border-l border-outline/10">UNITS</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
                    type="date"
                    defaultValue="2026-12-31"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                    calendar_today
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 bg-tertiary-container/10 rounded-lg flex items-start gap-4">
              <span className="material-symbols-outlined text-tertiary mt-0.5">info</span>
              <div>
                <p className="text-sm font-semibold text-tertiary">Cold Chain Storage Required</p>
                <p className="text-xs text-on-surface-variant">
                  This medication requires temperature monitoring (2°C - 8°C). Ensure data logger is activated.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-surface-container-lowest p-8 rounded-xl shadow-md sticky top-24 border border-outline-variant/10">
            <h2 className="font-headline font-bold text-xl mb-8">Stock Impact</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Current Inventory</span>
                <span className="font-bold">1,240</span>
              </div>
              <div className="flex justify-between items-center text-sm text-secondary">
                <span className="font-medium">New Delivery</span>
                <span className="font-bold">+ 500</span>
              </div>
              <div className="pt-6 border-t border-outline-variant/15">
                <p className="text-[10px] font-bold uppercase text-outline mb-1">Projected Total Stock</p>
                <p className="text-5xl font-headline font-black text-primary tracking-tighter">1,740</p>
                <p className="text-xs text-on-surface-variant mt-2 flex items-center gap-1 font-medium">
                  <span
                    className="material-symbols-outlined text-[14px] text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    trending_up
                  </span>
                  40.3% increase in availability
                </p>
              </div>
              <div className="space-y-3 pt-6">
                <button className="w-full bg-primary bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold py-4 rounded-lg shadow-lg hover:shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 group">
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform">check_circle</span>
                  Confirm Entry
                </button>
                <button className="w-full py-4 text-on-surface-variant font-headline font-semibold hover:bg-surface-container rounded-lg transition-colors">
                  Discard Draft
                </button>
              </div>
            </div>
          </section>

          <div className="bg-secondary-container/20 p-6 rounded-xl overflow-hidden relative group shadow-sm border border-secondary/10">
            <div className="relative z-10">
              <h3 className="font-headline font-bold text-sm text-on-secondary-container mb-2">
                Automated Inventory Scan
              </h3>
              <p className="text-xs text-on-secondary-container/80 mb-4">
                You can also use the high-speed barcode scanner to log deliveries automatically.
              </p>
              <button className="bg-white/80 backdrop-blur-sm text-secondary text-xs font-bold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-white transition-colors">
                <span className="material-symbols-outlined text-sm">barcode_scanner</span>
                Launch Scanner
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[120px]">qr_code_2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
