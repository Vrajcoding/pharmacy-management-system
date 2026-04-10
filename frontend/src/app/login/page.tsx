"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex items-center justify-center p-6 selection:bg-primary-fixed selection:text-on-primary-fixed">
      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-surface-container-low rounded-xl overflow-hidden shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)]">
        <section className="hidden md:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-secondary-container rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-primary-container rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  medical_services
                </span>
              </div>
              <span className="font-headline font-extrabold tracking-widest text-white uppercase text-xl">
                VitalTrace Pro
              </span>
            </div>
            <h1 className="font-headline text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
              Precision Pharmacy Management
            </h1>
            <p className="text-on-primary-container text-lg max-w-sm font-medium leading-relaxed">
              A clinical sanctuary for high-performance inventory tracking and medication security.
            </p>
          </div>
          <div className="relative z-10 mt-auto">
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary-fixed text-sm">verified_user</span>
                <span className="text-white text-xs font-bold uppercase tracking-widest">Enterprise Security</span>
              </div>
              <p className="text-white/80 text-sm italic">
                "The surgical precision of VitalTrace Pro has transformed our daily pharmacy workflow."
              </p>
            </div>
          </div>
          {/* Note: In a real app, use next/image. For now using img tag to match provided source exactly but with modern next.js best practices in mind, I'll keep it as is for demonstration or use a generic placeholder if it fails */}
          <img
            alt="Sterile medical environment"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTGDzD0YzViNihD4BTa5v9Li0TakSMmJcrbIf_J1QI2BpdfQR6F8FwRg1zKY7cexpos3Y35arDb5ioo-npkD0aRsjq2krSk2mLIKesP2B-mfobONTIEk-eBqgjjeB8f-1223wOyQdB5lWIQKuVkBody4j1XPHVHFqF0Amjwb7U7RdzhRJMp-6sIBqTRSFzaBCSBxYKzI9vJugYIL68a7L_9Hwp3AcGlpdHFgTR6rkfqBw1TT4jnPkglq2AETT98q7qbXkBLmsMqBg"
          />
        </section>
        <section className="p-8 md:p-16 flex flex-col justify-center bg-surface-container-lowest">
          <div className="mb-10 block md:hidden">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-2xl">medical_services</span>
              <span className="font-headline font-extrabold tracking-widest text-primary uppercase text-lg">
                VitalTrace Pro
              </span>
            </div>
          </div>
          <header className="mb-10">
            <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight mb-2">Welcome Back</h2>
            <p className="text-on-surface-variant font-medium">Please enter your credentials to access the terminal.</p>
          </header>
          <form className="space-y-6">
            <div className="space-y-2">
              <label
                className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200 text-on-surface font-body placeholder:text-outline/60"
                  id="email"
                  placeholder="pharmacist@vitaltrace.com"
                  required
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1"
                htmlFor="password"
              >
                Security Key
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </div>
                <input
                  className="w-full pl-12 pr-12 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all duration-200 text-on-surface font-body"
                  id="password"
                  placeholder="••••••••••••"
                  required
                  type="password"
                />
                <button
                  className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-primary transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">visibility</span>
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">
                Clinical Role
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="cursor-pointer group">
                  <input defaultChecked className="peer sr-only" name="role" type="radio" value="Pharmacist" />
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-high text-on-surface-variant peer-checked:bg-primary peer-checked:text-white transition-all duration-200 group-hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-1">prescriptions</span>
                    <span className="text-[10px] font-bold uppercase">Pharmacist</span>
                  </div>
                </label>
                <label className="cursor-pointer group">
                  <input className="peer sr-only" name="role" type="radio" value="Manager" />
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-high text-on-surface-variant peer-checked:bg-primary peer-checked:text-white transition-all duration-200 group-hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-1">manage_accounts</span>
                    <span className="text-[10px] font-bold uppercase">Manager</span>
                  </div>
                </label>
                <label className="cursor-pointer group">
                  <input className="peer sr-only" name="role" type="radio" value="Admin" />
                  <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-surface-container-high text-on-surface-variant peer-checked:bg-primary peer-checked:text-white transition-all duration-200 group-hover:bg-surface-container-highest">
                    <span className="material-symbols-outlined mb-1">admin_panel_settings</span>
                    <span className="text-[10px] font-bold uppercase">Admin</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  className="w-5 h-5 rounded-md border-none bg-surface-container-high text-primary focus:ring-offset-0 focus:ring-primary/20"
                  type="checkbox"
                />
                <span className="text-sm text-on-surface-variant font-medium">Remember terminal</span>
              </label>
              <a className="text-sm font-semibold text-primary hover:underline decoration-2 underline-offset-4" href="#">
                Forgot ID?
              </a>
            </div>
            <button
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-lg shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 group"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/dashboard/pharmacist";
              }}
            >
              <span>Initialize Secure Session</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </form>
          <footer className="mt-12 text-center">
            <p className="text-outline text-xs font-medium">
              © 2024 Clinical Sanctuary Systems. All access is logged and encrypted.
            </p>
            <div className="mt-4 flex justify-center gap-6">
              <a
                className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary"
                href="#"
              >
                System Status
              </a>
              <a
                className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary"
                href="#"
              >
                Legal Protocols
              </a>
            </div>
          </footer>
        </section>
      </main>
      <div className="fixed top-8 right-8 z-50 pointer-events-none">
        <div className="glass-card p-4 rounded-xl shadow-lg border border-white/40 flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <div className="text-[11px] font-bold text-on-surface uppercase tracking-tighter">
            Server Status: <span className="text-secondary">Optimal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
