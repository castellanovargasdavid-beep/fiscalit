import { Cookie, Landmark, Lock, MonitorSmartphone, RefreshCw, Zap } from "lucide-react";
import { ToolsExplorer } from "@/components/home/ToolsExplorer";
import { BoeAlertSignup } from "@/components/BoeAlertSignup";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

const TRUST_BADGES = [
  { icon: Cookie, label: "Cero cookies invasivas", color: "text-emerald-600" },
  { icon: MonitorSmartphone, label: "100% en tu navegador", color: "text-blue-600" },
  { icon: RefreshCw, label: "Normativa actualizada", color: "text-emerald-600" },
];

const VALUE_PROPS = [
  {
    icon: Lock,
    title: "Privacidad total",
    description:
      "Tus cifras no se envían a ningún servidor ni se guardan en bases de datos. Todo el cálculo ocurre en tu dispositivo.",
  },
  {
    icon: Zap,
    title: "Sin formularios trampa",
    description: "Obtienes el resultado al instante, sin pedirte tu email ni obligarte a registrarte.",
  },
  {
    icon: Landmark,
    title: "Precisión legal",
    description: "Lógica basada estrictamente en la normativa de la AEAT, la TGSS y las tablas oficiales del BOE.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/70 via-slate-50 to-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(226 232 240) 1px, transparent 1px), linear-gradient(to bottom, rgb(226 232 240) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 sm:px-6 sm:pt-24 sm:pb-14">
          <section className="max-w-2xl">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Zap className="h-3 w-3" aria-hidden="true" />
              Suite Fiscal 2026 para Autónomos y Pymes
            </span>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Herramientas de cálculo fiscal, laboral y cotizaciones{" "}
              <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                sin complicaciones
              </span>
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Calculadoras gratuitas y privadas para autónomos y micropymes en España: se ejecutan 100% en tu
              navegador y están adaptadas a la normativa vigente.
            </p>

            <ul className="mt-6 flex flex-wrap gap-3">
              {TRUST_BADGES.map((badge) => (
                <li
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
                >
                  <badge.icon className={`h-3.5 w-3.5 ${badge.color}`} aria-hidden="true" />
                  {badge.label}
                </li>
              ))}
            </ul>
          </section>

          <div id="herramientas" className="mt-10 scroll-mt-24">
            <ToolsExplorer />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <section aria-labelledby="por-que-heading" className="mt-20">
          <h2 id="por-que-heading" className="text-2xl font-semibold tracking-tight text-slate-900">
            Por qué usar estas calculadoras
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <prop.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{prop.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <BoeAlertSignup />
        </section>
      </div>
    </>
  );
}
