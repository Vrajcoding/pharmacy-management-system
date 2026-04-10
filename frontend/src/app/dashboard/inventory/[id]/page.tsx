export default function DrugDetailsPage() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-32">
      <div className="flex-1">
        {/* Parent Drug Info Hero Section */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Drug Visual Branding */}
            <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden bg-surface-container shadow-sm group">
              <img
                alt="Medication Packaging"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpcPc-zXc7uDjln46vhb0QDFSO6yM-MezV8cKXDk3YcQEWgq0Kyw7RUNAGjjchdln8_93QYAUSp2RA2bGrxz7nkP2esoIa-xAScssvvOji5XtM03n4zeW08C345c0vnrdG7Qdezsnl7oDz4xd_3wWCZtsMrelLhe7fJg8HsOtGfmjzgJljnAmbZmW2rs2KMrkXHxNCxRFl36c8MklbmoANiZFZ3ZWscK7BG1qTmvQL4lAYxN1kEVZZNgPouC15yyTRJ_cxim6KwhI"
              />
            </div>
            {/* Drug Metadata Editorial */}
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[11px] font-bold uppercase tracking-widest">
                  In Stock
                </span>
                <span className="text-outline text-sm">SKU: VT-77042-M</span>
              </div>
              <h2 className="font-headline font-extrabold text-4xl text-primary mb-2 tracking-tight">Meropenem 1g</h2>
              <p className="text-on-surface-variant text-lg mb-6 leading-relaxed max-w-2xl">
                A broad-spectrum carbapenem antibiotic used for severe bacterial infections. Requires reconstitution and
                cold-chain monitoring during storage.
              </p>
              {/* Key Stats Bento Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-1">
                  <span className="text-outline text-xs font-semibold uppercase">Total Stock</span>
                  <span className="font-headline font-bold text-2xl text-on-surface">1,240 Units</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-1">
                  <span className="text-outline text-xs font-semibold uppercase">Active Batches</span>
                  <span className="font-headline font-bold text-2xl text-on-surface">06</span>
                </div>
                <div className="bg-tertiary-container/10 p-4 rounded-lg flex flex-col gap-1">
                  <span className="text-tertiary text-xs font-semibold uppercase">Critical Expiry</span>
                  <span className="font-headline font-bold text-2xl text-tertiary">02</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg flex flex-col gap-1">
                  <span className="text-outline text-xs font-semibold uppercase">Storage</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary scale-75">ac_unit</span>
                    <span className="font-headline font-bold text-lg text-on-surface">2-8°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEFO Batch List Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="font-headline font-bold text-xl tracking-tight">Active Batches (FEFO)</h3>
            <div className="bg-surface-container-high px-3 py-1 rounded-full flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">sort</span>
              <span className="text-[11px] font-bold text-on-surface-variant uppercase">Expiry First</span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-white px-5 py-2.5 rounded-md shadow-sm hover:opacity-90 transition-all duration-300">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span className="font-label font-semibold text-sm">Add New Batch</span>
          </button>
        </div>

        {/* Batch List (Tonal Architecture) */}
        <div className="space-y-6">
          {[
            {
              id: "#MP-1044",
              stock: "140 Units",
              expiry: "14 Oct 2024",
              received: "12 Jan 2024",
              status: "Critical Expiry",
              color: "tertiary",
              progress: 92,
              timeRemaining: "Only 12 days remaining",
            },
            {
              id: "#MP-1052",
              stock: "400 Units",
              expiry: "22 Nov 2024",
              received: "28 Feb 2024",
              status: "Warning",
              color: "primary",
              progress: 75,
              timeRemaining: "51 days remaining",
            },
            {
              id: "#MP-2019",
              stock: "700 Units",
              expiry: "08 Sep 2025",
              received: "15 Jun 2024",
              status: "Optimal",
              color: "secondary",
              progress: 15,
              timeRemaining: "Safe - 1 year+ remaining",
            },
          ].map((batch, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden transition-all duration-300 hover:shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)] group"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-${batch.color}`}></div>
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-headline font-bold text-lg">Batch {batch.id}</span>
                    <span
                      className={`px-3 py-0.5 rounded-full ${
                        batch.status === "Critical Expiry"
                          ? "bg-tertiary-container text-white"
                          : batch.status === "Warning"
                          ? "bg-primary-fixed text-on-primary-fixed-variant"
                          : "bg-secondary-container text-on-secondary-container"
                      } text-[10px] font-bold uppercase tracking-wider`}
                    >
                      {batch.status}
                    </span>
                  </div>
                  <span className="text-xs text-outline font-medium">Received: {batch.received}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">Stock Level</span>
                    <span className="font-headline font-bold text-xl">{batch.stock}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">Expiry Date</span>
                    <span className={`font-headline font-bold text-xl text-${batch.color}`}>{batch.expiry}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">
                      Expiry Timeline
                    </span>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${batch.color} w-[${batch.progress}%]`}
                        style={{ width: `${batch.progress}%` }}
                      ></div>
                    </div>
                    <span className={`text-[10px] font-medium text-${batch.color} mt-1 block`}>
                      {batch.timeRemaining}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-4 py-2 bg-surface-container-high rounded-md text-on-surface text-sm font-semibold hover:bg-surface-dim transition-colors">
                  Audit
                </button>
                <button
                  className={`flex-1 md:flex-none px-4 py-2 ${
                    batch.color === "tertiary"
                      ? "bg-tertiary-container/20 text-tertiary"
                      : "bg-surface-container-high text-on-surface"
                  } rounded-md text-sm font-semibold hover:opacity-80 transition-colors`}
                >
                  {batch.color === "tertiary" ? "Move Stock" : "Details"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contextual Information Panel (Asymmetric Sidebar Aspect) */}
      <aside className="w-full lg:w-80">
        <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 border border-white/20 sticky top-24">
          <h4 className="font-headline font-bold text-sm uppercase tracking-wider text-outline mb-4">Stock Insights</h4>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-on-surface-variant mb-2">Usage Rate (Last 30 Days)</p>
              <div className="flex items-end gap-2">
                <span className="font-headline font-extrabold text-3xl">42</span>
                <span className="text-sm font-medium text-secondary mb-1">Units/Day</span>
              </div>
              <div className="mt-2 h-1 w-full bg-surface-container-highest rounded-full">
                <div className="h-full bg-primary w-2/3"></div>
              </div>
            </div>
            <div className="p-4 bg-primary-container/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-sm">info</span>
                <span className="font-label font-bold text-xs text-primary">Ordering Note</span>
              </div>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                Lead time for this item has increased to 14 days due to supply chain delays at the regional hub.
              </p>
            </div>
            <div className="pt-4 border-t border-outline-variant/20">
              <p className="text-xs text-on-surface-variant mb-3">Manufacturers</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-semibold">PharmaCorp</span>
                <span className="px-2 py-1 bg-surface-container-high rounded text-[10px] font-semibold">MediFlow</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
