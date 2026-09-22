"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  Handshake,
  Link2,
  Rocket,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { DeploymentLinksSection } from "@/components/admin/DeploymentLinksSection";
import { AffiliateMatrixSection } from "@/components/admin/AffiliateMatrixSection";
import { RegulatoryWatchSection } from "@/components/admin/RegulatoryWatchSection";
import { ScenarioUrlBuilderSection } from "@/components/admin/ScenarioUrlBuilderSection";
import { ComplianceChecklistSection } from "@/components/admin/ComplianceChecklistSection";
import { cn } from "@/lib/utils";

type TabId = "deployment" | "affiliates" | "regulatory" | "scenarios" | "compliance";

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "deployment", label: "Despliegue", icon: Rocket },
  { id: "affiliates", label: "Afiliados", icon: Handshake },
  { id: "regulatory", label: "Normativa", icon: ScrollText },
  { id: "scenarios", label: "Escenarios", icon: Link2 },
  { id: "compliance", label: "Cumplimiento", icon: ClipboardCheck },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("deployment");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-white">Admin & Operations Command Center</h1>
      <p className="mt-1 text-sm text-slate-400">
        Cuadro de mando interno de FiscalIT: despliegue, afiliados, vigilancia normativa y cumplimiento legal en un
        solo sitio.
      </p>

      <div className="mt-6 flex flex-wrap gap-1 rounded-xl border border-slate-800 bg-slate-900 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white",
            )}
          >
            <tab.icon className="h-4 w-4" aria-hidden="true" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
        {activeTab === "deployment" && <DeploymentLinksSection />}
        {activeTab === "affiliates" && <AffiliateMatrixSection />}
        {activeTab === "regulatory" && <RegulatoryWatchSection />}
        {activeTab === "scenarios" && <ScenarioUrlBuilderSection />}
        {activeTab === "compliance" && <ComplianceChecklistSection />}
      </div>
    </div>
  );
}
