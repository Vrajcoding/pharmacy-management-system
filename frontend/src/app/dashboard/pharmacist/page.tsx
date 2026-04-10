export default function PharmacistDashboard() {
  return (
    <>
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-primary">Welcome, Dr. Aris</h1>
          <p className="text-on-surface-variant font-medium">VitalTrace Pro • Shift A • Pharmacist-in-Charge</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-surface-container-low px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">calendar_today</span>
            <span className="text-sm font-semibold">Oct 24, 2023</span>
          </div>
          <div className="bg-surface-container-low px-4 py-2 rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">schedule</span>
            <span className="text-sm font-semibold">08:45 AM</span>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Grid for Alerts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Critical Alerts Panel (7/12) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">report_problem</span>
              Critical Alerts
            </h2>
            <span className="text-sm font-bold text-tertiary px-3 py-1 bg-tertiary-fixed rounded-full">
              4 Urgent Tasks
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Expiring Card */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-error shadow-sm flex flex-col justify-between h-48">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                    Expiry Warning
                  </span>
                  <span
                    className="material-symbols-outlined text-error"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    emergency
                  </span>
                </div>
                <h3 className="text-3xl font-headline font-black text-on-surface mt-2">14 Items</h3>
                <p className="text-on-surface-variant text-sm mt-1">Medications expiring within 7 days.</p>
              </div>
              <button className="w-full py-2 bg-tertiary-container text-on-tertiary-container rounded-lg font-bold text-sm transition-all active:scale-95">
                Review Batch
              </button>
            </div>
            {/* Low Stock Card */}
            <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-surface-tint shadow-sm flex flex-col justify-between h-48">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                    Inventory Low
                  </span>
                  <span className="material-symbols-outlined text-surface-tint">inventory_2</span>
                </div>
                <h3 className="text-3xl font-headline font-black text-on-surface mt-2">08 SKUs</h3>
                <p className="text-on-surface-variant text-sm mt-1">Below safety stock threshold (15%).</p>
              </div>
              <button className="w-full py-2 bg-primary-container text-on-primary-container rounded-lg font-bold text-sm transition-all active:scale-95">
                Restock Now
              </button>
            </div>
          </div>

          {/* FEFO Guide */}
          <div className="bg-surface-container-low rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-headline font-bold">FEFO Prioritization Guide</h2>
              <span className="text-xs font-medium text-on-surface-variant">First-Expired, First-Out</span>
            </div>
            <div className="space-y-3">
              {[
                {
                  name: "Amoxicillin 500mg",
                  batch: "#AMX-9021",
                  expiry: "Oct 31",
                  status: "error",
                  progress: 80,
                  icon: "pill",
                },
                {
                  name: "Insulin Glargine",
                  batch: "#INS-7742",
                  expiry: "Nov 05",
                  status: "tertiary-container",
                  progress: 60,
                  icon: "vaccines",
                },
                {
                  name: "Metformin Syrup",
                  batch: "#MET-1102",
                  expiry: "Dec 12",
                  status: "secondary",
                  progress: 25,
                  icon: "medication_liquid",
                },
              ].map((item, id) => (
                <div
                  key={id}
                  className="bg-surface-container-lowest p-4 rounded-lg flex items-center justify-between group hover:bg-white transition-all cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{item.name}</h4>
                      <p className="text-xs text-on-surface-variant">Batch: {item.batch}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-${item.status === 'error' ? 'error' : item.status === 'secondary' ? 'secondary' : 'on-tertiary-container'} font-bold text-sm`}>
                      Expires: {item.expiry}
                    </div>
                    <div className="w-24 h-1.5 bg-surface-container-highest rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-full bg-${item.status === 'tertiary-container' ? 'tertiary' : item.status} w-[${item.progress}%]`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Orders & Stats (5/12) */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              Order Status
            </h2>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
              more_horiz
            </span>
          </div>

          {/* Order Card Stack */}
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-surface-container flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary-container/30 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">ORD-99201</span>
                    <h4 className="font-bold text-primary">PharmaLogistics Co.</h4>
                  </div>
                </div>
                <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase rounded-full">
                  Delivered
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">24 Items • Vaccines, Antibiotics</span>
                <span className="font-headline font-bold text-on-surface">11:00 AM Today</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-surface-container flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-fixed/30 rounded-lg">
                    <span className="material-symbols-outlined text-primary">autorenew</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">ORD-99205</span>
                    <h4 className="font-bold text-primary">Global Health Dist.</h4>
                  </div>
                </div>
                <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-black uppercase rounded-full">
                  In Transit
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">12 Items • Chronic Care</span>
                <span className="font-headline font-bold text-on-surface">Tomorrow, 09:00 AM</span>
              </div>
            </div>
          </div>

          {/* Pharmacy Stats Visualization */}
          <div className="bg-primary p-6 rounded-xl text-white overflow-hidden relative">
            <div className="relative z-10 space-y-4">
              <h3 className="text-lg font-headline font-bold">Daily Inventory Throughput</h3>
              <div className="flex items-end gap-2 h-24">
                <div className="w-full bg-white/20 h-1/2 rounded-t-sm"></div>
                <div className="w-full bg-white/40 h-3/4 rounded-t-sm"></div>
                <div className="w-full bg-white/60 h-2/3 rounded-t-sm"></div>
                <div className="w-full bg-white/80 h-5/6 rounded-t-sm"></div>
                <div className="w-full bg-white h-full rounded-t-sm"></div>
                <div className="w-full bg-white/50 h-1/2 rounded-t-sm"></div>
                <div className="w-full bg-white/30 h-1/3 rounded-t-sm"></div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xs opacity-70">In-Flow</div>
                  <div className="font-bold text-lg">1.2k</div>
                </div>
                <div className="text-center">
                  <div className="text-xs opacity-70">Out-Flow</div>
                  <div className="font-bold text-lg">892</div>
                </div>
                <div className="text-center">
                  <div className="text-xs opacity-70">Wastage</div>
                  <div className="font-bold text-lg text-tertiary-fixed-dim">0.4%</div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-8xl">monitoring</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
