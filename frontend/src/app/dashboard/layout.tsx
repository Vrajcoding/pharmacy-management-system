"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard/pharmacist", icon: "home" },
    { name: "Inventory", href: "/dashboard/inventory", icon: "package_2" },
    { name: "Orders", href: "/dashboard/orders", icon: "local_shipping" },
  ];

  return (
    <div className="bg-background text-on-surface font-body min-h-screen pb-24 md:pb-0">
      {/* TopAppBar */}
      <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-4">
          <button className="p-2 text-primary hover:bg-surface-container-low transition-colors rounded-full">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="text-primary font-extrabold tracking-widest uppercase text-sm">
            Clinical Sanctuary
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-6 mr-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-headline tracking-tight font-bold text-lg hover:bg-surface-container-low transition-colors cursor-pointer px-2 py-1 rounded-lg ${
                  pathname === item.href ? "text-primary" : "text-outline"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <img
            alt="Dr. Aris"
            className="w-10 h-10 rounded-full border-2 border-primary-fixed shadow-sm"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCthAgJF6aHH1vIidsd0A4VLSfL6gb5CBwFhvILTCRLfhuJ5MhdWx-l-PcK_gbPRVfXGCdctuW6lM19L0-Sb-FWzcvJ-Fbeaq-l3IzFT5j7chtuTxUOQiz9ANQ7lJq9Wwp-8ABG-xlRwTwq74b8kbjdzASzrp4uCugqVXyVNbJmNLfw4e2-5b7fB1fHKcnoNCz_A3ATkF3ZyXgOuSfO1eLlpy1-LvMuSXbaLFijmzu8NYRFoboBVAhDoxGWmvZwsEC7GIFLnIvgMI"
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {children}
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 backdrop-blur-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)] rounded-t-3xl md:hidden z-50">
        <Link href="/dashboard/pharmacist" className="flex flex-col items-center justify-center bg-primary-fixed/30 text-primary rounded-2xl px-6 py-2 scale-90 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="font-body text-[11px] font-medium tracking-wide">Home</span>
        </Link>
        <Link href="/dashboard/inventory" className="flex flex-col items-center justify-center text-outline px-6 py-2 scale-90 transition-transform">
          <span className="material-symbols-outlined">package_2</span>
          <span className="font-body text-[11px] font-medium tracking-wide">Stock</span>
        </Link>
        <div className="flex flex-col items-center justify-center text-outline px-6 py-2 scale-90 transition-transform">
          <span className="material-symbols-outlined">warning</span>
          <span className="font-body text-[11px] font-medium tracking-wide">Alerts</span>
        </div>
        <div className="flex flex-col items-center justify-center text-outline px-6 py-2 scale-90 transition-transform">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-body text-[11px] font-medium tracking-wide">Settings</span>
        </div>
      </nav>

      {/* Floating Action Button - Contextual */}
      <button className="fixed right-6 bottom-32 md:bottom-10 bg-primary hover:bg-primary-container text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all active:scale-95 group z-40">
        <span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform">add</span>
      </button>
    </div>
  );
}
