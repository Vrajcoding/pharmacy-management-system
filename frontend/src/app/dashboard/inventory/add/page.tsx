export default function AddDrugPage() {
  return (
    <div className="max-w-6xl mx-auto pb-32">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant font-label text-[10px] font-bold tracking-widest rounded-full mb-4">
              LOGISTICS MODULE
            </span>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-none text-primary">
              VitalTrace Pro
            </h1>
            <p className="mt-4 text-on-surface-variant max-w-md font-body leading-relaxed">
              Surgically precise inventory management. Register new pharmaceuticals and batches into the sanctuary vault.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 shadow-sm">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            <div>
              <p className="text-[10px] font-bold text-outline uppercase tracking-tighter">System Status</p>
              <p className="text-sm font-semibold text-secondary">Encrypted Connection Active</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Progress & Context (Bento Style) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-lg shadow-sm">
            <h3 className="font-headline font-bold text-xl mb-8">Registration Workflow</h3>
            <div className="space-y-10 relative">
              {/* Connector Line */}
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-surface-container-highest"></div>
              <div className="relative flex items-start gap-6 group">
                <div className="z-10 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">
                  1
                </div>
                <div>
                  <h4 className="font-headline font-bold text-primary">Drug Profile</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Core pharmacological data and classification.</p>
                </div>
              </div>
              <div className="relative flex items-start gap-6 group">
                <div className="z-10 w-8 h-8 rounded-full bg-surface-container-highest text-outline flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface-variant">Batch Logistics</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Manufacturing, expiry, and quantity mapping.</p>
                </div>
              </div>
              <div className="relative flex items-start gap-6 group">
                <div className="z-10 w-8 h-8 rounded-full bg-surface-container-highest text-outline flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface-variant">Confirmation</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Final audit and system reconciliation.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary p-8 rounded-lg text-white relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-4">inventory_2</span>
              <h4 className="font-headline font-bold text-lg mb-2">Inventory Intelligence</h4>
              <p className="text-sm opacity-80 leading-relaxed">
                New entries are automatically analyzed for expiry risk and shelf-space optimization.
              </p>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </aside>

        {/* Right Side: The Form Canvas */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-8 md:p-12 rounded-lg shadow-[0_12px_32px_-4px_rgba(25,28,30,0.04)] border border-outline-variant/5">
          <form className="space-y-12">
            {/* Section 1: Add Drug */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                <h3 className="font-headline font-bold text-2xl tracking-tight">Step 1: Add Drug Profile</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-2 px-1">
                    Drug Name (Generic / Brand)
                  </label>
                  <input
                    className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface shadow-sm"
                    placeholder="e.g. Amoxicillin Trihydrate 500mg"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-2 px-1">
                    Category
                  </label>
                  <select className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface shadow-sm appearance-none">
                    <option>Antibiotics</option>
                    <option>Analgesics</option>
                    <option>Antivirals</option>
                    <option>Cardiovascular</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-2 px-1">
                    Unit of Measure
                  </label>
                  <select className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface shadow-sm appearance-none">
                    <option>Tablets (Pcs)</option>
                    <option>Vials</option>
                    <option>Bottles (Liquid)</option>
                    <option>Ointments (Grams)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-2 px-1">
                    Minimum Safety Threshold
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-high border-none rounded-lg p-4 pr-12 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface shadow-sm"
                      placeholder="500"
                      type="number"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-tertiary">
                      LOW STOCK ALERT
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Add Batch */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-8 bg-secondary rounded-full"></span>
                <h3 className="font-headline font-bold text-2xl tracking-tight">Step 2: Add Batch Logistics</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-2 px-1">
                    Batch Number
                  </label>
                  <input
                    className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface shadow-sm"
                    placeholder="B-2024-X99"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-2 px-1">
                    Initial Quantity
                  </label>
                  <input
                    className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface shadow-sm"
                    placeholder="1000"
                    type="number"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-2 px-1">
                    Manufacture Date
                  </label>
                  <input
                    className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface shadow-sm"
                    type="date"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-2 px-1">
                    Expiry Date
                  </label>
                  <input
                    className="w-full bg-surface-container-high border-none rounded-lg p-4 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface shadow-sm"
                    type="date"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold text-outline uppercase tracking-widest mb-2 px-1">
                    Purchase Price (Per Unit)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline">$</span>
                    <input
                      className="w-full bg-surface-container-high border-none rounded-lg p-4 pl-10 focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface shadow-sm"
                      placeholder="0.00"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Form Footer */}
            <footer className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-on-surface-variant">
                <span className="material-symbols-outlined text-outline">info</span>
                <p className="text-xs max-w-xs">
                  By submitting, you confirm that pharmacological data is accurate according to the latest medical
                  standards.
                </p>
              </div>
              <button
                className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold py-4 px-10 rounded-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                type="submit"
              >
                <span>Submit & Update Stock</span>
                <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform">
                  sync_saved_locally
                </span>
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}
