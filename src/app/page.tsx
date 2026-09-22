import { Cookie, Landmark, Lock, MonitorSmartphone, RefreshCw, Zap } from "lucide-react";
import { ToolsExplorer } from "@/components/home/ToolsExplorer";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

const TRUST_BADGES = [
  { icon: Cookie, label: "Cero cookies invasivas" },
  { icon: MonitorSmartphone, label: "100% en tu navegador" },
  { icon: RefreshCw, label: "Normativa actualizada" },
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
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
      />

      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Herramientas de cálculo fiscal, laboral y cotizaciones sin complicaciones
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Calculadoras gratuitas y privadas para autónomos y micropymes en España: se ejecutan 100% en tu
          navegador y están adaptadas a la normativa vigente.
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {TRUST_BADGES.map((badge) => (
            <li key={badge.label} className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
              <badge.icon className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              {badge.label}
            </li>
          ))}
        </ul>
      </section>

      <section id="herramientas" className="mt-12 scroll-mt-24">
        <ToolsExplorer />
      </section>

      <section aria-labelledby="por-que-heading" className="mt-24">
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
    </div>
  );
}
