export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-2">
          <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">System Overview</h2>
          <p className="text-on-surface-variant font-body">Admin access level: Tier 1 Superuser</p>
        </div>
        <div className="flex justify-end items-end gap-3">
          <button className="bg-surface-container-highest text-on-surface px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">download</span> Export Audit
          </button>
          <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">settings</span> System Config
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Users", value: "1,284", change: "+12%", icon: "groups", color: "primary", progress: 75 },
          { label: "System Uptime", value: "142d", change: "99.9%", icon: "bolt", color: "secondary", progress: 100 },
          {
            label: "Security Alerts",
            value: "02",
            change: "8 Pending",
            icon: "warning",
            color: "tertiary",
            progress: 25,
          },
          { label: "API Efficiency", value: "84ms", change: "Optimized", icon: "database", color: "primary", progress: 80 },
        ].map((stat, idx) => (
          <div key={idx} className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10 group">
            <div className="flex justify-between items-start mb-4">
              <div
                className={`w-12 h-12 bg-${stat.color}/10 rounded-xl flex items-center justify-center text-${stat.color} group-hover:scale-110 transition-transform`}
              >
                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
              </div>
              <span
                className={`${
                  stat.color === "tertiary"
                    ? "text-tertiary bg-tertiary-fixed "
                    : "text-secondary bg-secondary-container"
                } text-[10px] font-bold px-2 py-1 rounded-full`}
              >
                {stat.change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-on-surface-variant font-body text-sm lowercase tracking-wide">{stat.label}</p>
              <h3 className="text-4xl font-headline font-black text-on-surface tracking-tight">{stat.value}</h3>
            </div>
            <div className="mt-4 w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className={`bg-${stat.color} h-full w-[${stat.progress}%] rounded-full`} style={{ width: `${stat.progress}%` }}></div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-bold text-xl text-on-surface">User Management</h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "Dr. Julian Vance",
                role: "Pharmacist",
                status: "Online",
                avatar:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjXvvN-Kx5sSmOhTdLzrNpebo3Ohuio46PSTTBqxKeNa9bn5GSxe_OSPWAwRdDEiC8vpXnobw97JoCWeB2i8lxgo-LO0yjBvLysPbg81_HezhMK2MtUi_ev04x06RTzN1-c0A4D96khzZOf6GghS9HARVncKmmKow1hQjJGYeTZmaBtFpP5eiut7ysNWFxtgOTZ4Wcn6d3c5yKRDKZfqLNJKULlW9yy5JqBzbCGlOQywdhjQ7W93EuquBBza7Wxwa5rKB2PESjyRo",
              },
              {
                name: "Sarah Jenkins",
                role: "Manager",
                status: "Online",
                avatar:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCiLvdh5aPnKsavr6wxOSiZ8PTMRvGsCL2qs8Ao6huEJQBWSEGPehhk6SFKakQRpx9bZSKmBCbKj1ie0Xw24fMa0xGRhSmYYBJqUr0o70iiC_QGBg6dJdUuqlZF6oPhzTfm2svpObv30fTMgbsRu_GJEYTXFxOawIzwM47MzhIDu1C4L6-5IZl8lc5yzMkIcSdQJ1dw8INhagWI1RMAJ6gr6K3TA2juiWD18XqgX1PTgxzSnlQwpJ_sRGeFHEEoS1WaDXt-5Z8CcnQ",
              },
              {
                name: "Dr. Michael Chen",
                role: "Pharmacist",
                status: "Away",
                avatar:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuDwlWiY537-XOFq-mlT2PW7ep9DgL6th11_LqhRk48vyVSxc8RTVzT69ATrCL2PL_wo4ZrZFr5goE8P83rTjgxf6kGszW6ncOxwmJJI3S247ZXC2s7yOVuxcKfbkwX1AbltYE_mCsn6kHSqNy0dKZiWuYY7Vp7dVq8VLHDHmjdDvSwUX8FUHlRaaO3D-NPrIrLXemxxJDyv6WpCej0PMRWMg6bMXWHzT3dphJ-6mC0pzCz0apnUbUt-ulmnkQNVRHKXmeCJHklVBjI",
              },
            ].map((user, idx) => (
              <div
                key={idx}
                className={`bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4 ${
                  user.status === "Away" ? "opacity-75" : ""
                }`}
              >
                <div className="relative">
                  <img className="w-12 h-12 rounded-full object-cover" src={user.avatar} alt={user.name} />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 ${
                      user.status === "Online" ? "bg-secondary" : "bg-outline"
                    } rounded-full border-2 border-white`}
                  ></span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-on-surface truncate">{user.name}</p>
                  <p className="text-xs text-on-surface-variant">
                    {user.role} • {user.status}
                  </p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
                  settings_account_box
                </span>
              </div>
            ))}
            <div className="bg-surface-container-lowest p-4 rounded-xl border-2 border-dashed border-outline-variant flex items-center justify-center gap-2 text-on-surface-variant hover:bg-white transition-all cursor-pointer">
              <span className="material-symbols-outlined">person_add</span>
              <span className="font-semibold text-sm">Add New User</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <h3 className="font-headline font-bold text-xl text-on-surface mb-6">Global Status</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-error/10 text-error rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">security</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">Unauthorized Access Attempt</h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Terminal #042 in East Wing reported a failed biometric handshake.
                </p>
                <span className="text-[10px] uppercase font-bold text-tertiary mt-2 inline-block">
                  Urgent Audit Required
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">sync</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">Data Sync Completed</h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Central database updated with all regional pharmacy inventory logs.
                </p>
                <span className="text-[10px] uppercase font-bold text-secondary mt-2 inline-block">
                  12,042 Records Modified
                </span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">Backup Power Test</h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Automatic maintenance scheduled for UPS systems in Cold Storage.
                </p>
                <span className="text-[10px] uppercase font-bold text-outline mt-2 inline-block">In 4 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
        <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-headline font-bold text-xl text-on-surface">Inventory Logs & Audit Trail</h3>
            <p className="text-sm text-on-surface-variant">Real-time transaction history for high-schedule narcotics</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="px-4 py-2 bg-surface-container-high rounded-lg text-sm font-semibold">
              Filter: Schedule II
            </button>
            <button className="px-4 py-2 bg-surface-container-high rounded-lg text-sm font-semibold">Today</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-widest font-bold">
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Medication</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-surface-container">
              {[
                {
                  time: "14:22:18",
                  med: "Oxycodone 10mg",
                  action: "Stock Removal (Batch #AZ42)",
                  admin: "Dr. Aris",
                  status: "Verified",
                },
                {
                  time: "13:45:02",
                  med: "Morphine Sulfate 5mg/ml",
                  action: "Bulk Inventory Intake",
                  admin: "Sarah Jenkins",
                  status: "Verified",
                },
                {
                  time: "12:10:44",
                  med: "Fentanyl Patch 25mcg",
                  action: "Waste Protocol Initiated",
                  admin: "Dr. J. Vance",
                  status: "Witness Req.",
                },
              ].map((log, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4 font-body tabular-nums">{log.time}</td>
                  <td className="px-6 py-4 font-bold text-on-surface">{log.med}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{log.action}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                    <span className="font-medium">{log.admin}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${
                        log.status === "Verified"
                          ? "bg-secondary-container text-on-secondary-container"
                          : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                      } text-xs font-bold`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {log.status === "Verified" ? "check_circle" : "pending"}
                      </span>{" "}
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-surface-container-low flex justify-center">
          <button className="text-primary font-bold text-sm hover:underline">Load more log entries</button>
        </div>
      </section>
    </div>
  );
}
