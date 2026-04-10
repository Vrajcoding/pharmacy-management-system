"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { fetchPrediction, PredictionResult } from "@/lib/api";

// Drugs available in the catalog (map to backend drug IDs)
const DRUG_CATALOG = [
  { label: "Amoxicillin 500mg", drugId: "drug_A", sku: "AMX-500-BK", route: "Oral", dose: "500mg", currentStock: 1240 },
  { label: "Lisinopril 10mg", drugId: "drug_B", sku: "LSN-010-881", route: "Oral", dose: "10mg", currentStock: 450 },
  { label: "Insulin Glargine", drugId: "drug_C", sku: "INS-GLA-002", route: "Subcutaneous", dose: "100U/mL", currentStock: 34 },
];

type LoadingState = "idle" | "loading" | "success" | "error";

export default function StockReplenishmentPage() {
  const [selectedDrug, setSelectedDrug] = useState(DRUG_CATALOG[0]);
  const [quantity, setQuantity] = useState(500);
  const [batchNumber, setBatchNumber] = useState("BCH-2024-08-12");
  const [expiryDate, setExpiryDate] = useState("2026-12-31");
  const [searchQuery, setSearchQuery] = useState("");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const loadPrediction = useCallback(async (drugId: string) => {
    setLoadingState("loading");
    setErrorMsg(null);
    setPrediction(null);
    try {
      const result = await fetchPrediction(drugId);
      setPrediction(result);
      setLoadingState("success");
      // Auto-fill quantity with suggested order from AI
      if (result.suggested_order && result.suggested_order > 0) {
        setQuantity(Math.ceil(result.suggested_order));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch prediction";
      setErrorMsg(message);
      setLoadingState("error");
    }
  }, []);

  useEffect(() => {
    loadPrediction(selectedDrug.drugId);
  }, [selectedDrug.drugId, loadPrediction]);

  const filteredDrugs = DRUG_CATALOG.filter((d) =>
    d.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const projectedTotal = selectedDrug.currentStock + quantity;
  const percentChange = ((quantity / selectedDrug.currentStock) * 100).toFixed(1);

  const getTrendIcon = (trend: string) => {
    if (trend === "increasing") return "trending_up";
    if (trend === "decreasing") return "trending_down";
    return "trending_flat";
  };

  const getTrendColor = (trend: string) => {
    if (trend === "increasing") return "text-secondary";
    if (trend === "decreasing") return "text-error";
    return "text-primary";
  };

  const getConfidenceBadgeClass = (confidence: string) => {
    if (confidence === "high") return "bg-secondary-container text-on-secondary-container";
    if (confidence === "low") return "bg-primary-fixed text-on-primary-fixed-variant";
    return "bg-surface-container-highest text-on-surface-variant";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-32">
      <header>
        <Link
          href="/dashboard/inventory"
          className="flex items-center gap-2 text-primary font-semibold text-sm mb-2 hover:underline w-fit"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Inventory</span>
        </Link>
        <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-2">
          Stock Replenishment
        </h1>
        <p className="text-on-surface-variant font-body">
          Log new batches and update current medication levels — with AI-powered demand predictions.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Section 1: Select Medication */}
          <section className="bg-surface-container-low p-8 rounded-xl shadow-sm">
            <h2 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">medication</span>
              Select Medication
            </h2>
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                  Search Catalog
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-surface-container-high border-none rounded-lg py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all placeholder:text-outline"
                    placeholder="Start typing medication name..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="medication-search"
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary">
                    search
                  </span>
                </div>
                {/* Drug chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {filteredDrugs.map((drug) => (
                    <button
                      key={drug.drugId}
                      id={`drug-chip-${drug.drugId}`}
                      onClick={() => {
                        setSelectedDrug(drug);
                        setConfirmed(false);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        selectedDrug.drugId === drug.drugId
                          ? "bg-primary text-white shadow-md"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed"
                      }`}
                    >
                      {drug.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Drug Info */}
              <div className="bg-surface-container-lowest p-6 rounded-lg flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-primary">pill</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg">{selectedDrug.label}</h3>
                    <p className="text-sm text-on-surface-variant">
                      {selectedDrug.dose} • {selectedDrug.route} Route • SKU: {selectedDrug.sku}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-outline uppercase tracking-tighter">Current Stock</p>
                  <p className="text-2xl font-headline font-extrabold text-primary">
                    {selectedDrug.currentStock.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-on-surface-variant">units</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: AI Prediction Card */}
          <section className="rounded-xl overflow-hidden shadow-sm border border-outline-variant/20">
            <div className="bg-gradient-to-br from-primary to-primary-container p-6 text-white">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-headline font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  AI Demand Prediction
                </h2>
                <button
                  id="refresh-prediction-btn"
                  onClick={() => loadPrediction(selectedDrug.drugId)}
                  disabled={loadingState === "loading"}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
                  title="Refresh prediction"
                >
                  <span className={`material-symbols-outlined text-sm ${loadingState === "loading" ? "animate-spin" : ""}`}>
                    refresh
                  </span>
                </button>
              </div>
              <p className="text-white/70 text-xs">Linear regression forecast • 20% safety buffer applied</p>
            </div>

            <div className="bg-surface-container-lowest p-6">
              {loadingState === "loading" && (
                <div className="flex items-center gap-3 text-on-surface-variant py-4">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium">Fetching prediction from backend...</span>
                </div>
              )}

              {loadingState === "error" && (
                <div className="flex items-start gap-3 bg-tertiary-container/20 rounded-lg p-4">
                  <span className="material-symbols-outlined text-error mt-0.5">error</span>
                  <div>
                    <p className="font-bold text-error text-sm">Backend Unreachable</p>
                    <p className="text-xs text-on-surface-variant mt-1">{errorMsg}</p>
                    <p className="text-xs text-outline mt-1">Make sure the Flask server is running on port 5000.</p>
                    <button
                      id="retry-prediction-btn"
                      onClick={() => loadPrediction(selectedDrug.drugId)}
                      className="mt-3 text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span>
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {loadingState === "success" && prediction && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      Predicted Demand
                    </p>
                    <p className="text-2xl font-headline font-black text-on-surface">
                      {prediction.predicted_next_month.toLocaleString()}
                    </p>
                    <p className="text-xs text-outline">units / next month</p>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      Suggested Order
                    </p>
                    <p className="text-2xl font-headline font-black text-primary">
                      {Math.ceil(prediction.suggested_order).toLocaleString()}
                    </p>
                    <p className="text-xs text-outline">+20% safety buffer</p>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      Trend
                    </p>
                    <div className={`flex items-center gap-1 ${getTrendColor(prediction.trend)}`}>
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {getTrendIcon(prediction.trend)}
                      </span>
                      <span className="font-headline font-bold capitalize">{prediction.trend}</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-4 rounded-lg">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      Confidence
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase ${getConfidenceBadgeClass(prediction.confidence)}`}>
                      {prediction.confidence}
                    </span>
                    <p className="text-xs text-outline mt-1">{prediction.status}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 3: Delivery Details */}
          <section className="bg-surface-container-low p-8 rounded-xl shadow-sm">
            <h2 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">add_box</span>
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="batch-number" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Batch Number
                </label>
                <input
                  id="batch-number"
                  className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
                  type="text"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="supplier-select" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Supplier
                </label>
                <select
                  id="supplier-select"
                  className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
                >
                  <option>Global Pharma Distribution</option>
                  <option>MediCare Logistics</option>
                  <option>Vitality Wholesale</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="quantity-input" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Quantity Received
                  {loadingState === "success" && prediction && (
                    <span className="ml-2 text-secondary normal-case font-normal">(AI suggested: {Math.ceil(prediction.suggested_order)})</span>
                  )}
                </label>
                <div className="flex items-center bg-surface-container-high rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary">
                  <input
                    id="quantity-input"
                    className="flex-1 bg-transparent border-none py-3 px-4 focus:ring-0"
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <span className="px-4 text-xs font-bold text-outline border-l border-outline/10">UNITS</span>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="expiry-date" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Expiry Date
                </label>
                <div className="relative">
                  <input
                    id="expiry-date"
                    className="w-full bg-surface-container-high border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
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
                  This medication requires temperature monitoring (2°C – 8°C). Ensure data logger is activated.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Stock Impact */}
          <section className="bg-surface-container-lowest p-8 rounded-xl shadow-md sticky top-24 border border-outline-variant/10">
            <h2 className="font-headline font-bold text-xl mb-8">Stock Impact</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Current Inventory</span>
                <span className="font-bold">{selectedDrug.currentStock.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-secondary">
                <span className="font-medium">New Delivery</span>
                <span className="font-bold">+ {quantity.toLocaleString()}</span>
              </div>
              {loadingState === "success" && prediction && (
                <div className="flex justify-between items-center text-sm text-error">
                  <span className="font-medium">Est. Next Month Usage</span>
                  <span className="font-bold">− {prediction.predicted_next_month.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-6 border-t border-outline-variant/15">
                <p className="text-[10px] font-bold uppercase text-outline mb-1">Projected Total Stock</p>
                <p className="text-5xl font-headline font-black text-primary tracking-tighter">
                  {projectedTotal.toLocaleString()}
                </p>
                <p className="text-xs text-on-surface-variant mt-2 flex items-center gap-1 font-medium">
                  <span
                    className="material-symbols-outlined text-[14px] text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    trending_up
                  </span>
                  {percentChange}% increase in availability
                </p>
              </div>

              {/* Confirm / Discard */}
              <div className="space-y-3 pt-6">
                {confirmed ? (
                  <div className="w-full py-4 bg-secondary-container text-on-secondary-container font-headline font-bold rounded-lg flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Entry Confirmed!
                  </div>
                ) : (
                  <button
                    id="confirm-entry-btn"
                    onClick={() => setConfirmed(true)}
                    className="w-full bg-primary bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold py-4 rounded-lg shadow-lg hover:shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">check_circle</span>
                    Confirm Entry
                  </button>
                )}
                <button
                  id="discard-draft-btn"
                  onClick={() => {
                    setQuantity(500);
                    setBatchNumber("BCH-2024-08-12");
                    setExpiryDate("2026-12-31");
                    setConfirmed(false);
                  }}
                  className="w-full py-4 text-on-surface-variant font-headline font-semibold hover:bg-surface-container rounded-lg transition-colors"
                >
                  Discard Draft
                </button>
              </div>
            </div>
          </section>

          {/* Barcode Scanner Card */}
          <div className="bg-secondary-container/20 p-6 rounded-xl overflow-hidden relative group shadow-sm border border-secondary/10">
            <div className="relative z-10">
              <h3 className="font-headline font-bold text-sm text-on-secondary-container mb-2">
                Automated Inventory Scan
              </h3>
              <p className="text-xs text-on-secondary-container/80 mb-4">
                You can also use the high-speed barcode scanner to log deliveries automatically.
              </p>
              <button
                id="launch-scanner-btn"
                className="bg-white/80 backdrop-blur-sm text-secondary text-xs font-bold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-white transition-colors"
              >
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
