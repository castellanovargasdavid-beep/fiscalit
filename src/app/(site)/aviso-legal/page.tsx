import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { formatFechaISO } from "@/lib/format";

const PATH = "/aviso-legal";

export const metadata: Metadata = buildPageMetadata({
  title: "Aviso legal",
  description:
    "Identificación del titular de Fiscalit.es, condiciones de uso del sitio, propiedad intelectual y exención de responsabilidad, conforme a la LSSI-CE.",
  path: PATH,
});

const datosPendientes = !siteConfig.legalName || !siteConfig.taxId || !siteConfig.legalAddress;

export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Aviso legal</h1>
      <p className="mt-3 text-sm text-slate-500">
        Última actualización: {formatFechaISO(siteConfig.lastMethodologyReview)}
      </p>

      {datosPendientes && (
        <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p className="text-sm text-amber-800">
            <strong>Nota interna:</strong> completa la identificación del titular (razón social, NIF/CIF y
            domicilio) en <code className="rounded bg-amber-100 px-1 py-0.5 text-xs">src/config/site.ts</code>{" "}
            antes de publicar este sitio: la LSSI-CE (art. 10) exige mostrar estos datos de forma permanente,
            fácil y directamente accesible.
          </p>
        </div>
      )}

      <div className="mt-8 space-y-8 text-sm leading-6 text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Datos identificativos</h2>
          <p className="mt-2">
            En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de Servicios de
            la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:
            el sitio web <strong>fiscalit.es</strong> (en adelante, «Fiscalit») es un proyecto editorial de
            carácter divulgativo cuyo titular es{" "}
            <strong>{siteConfig.legalName || "[Pendiente de completar: razón social o nombre y apellidos]"}</strong>
            , con NIF/CIF{" "}
            <strong>{siteConfig.taxId || "[Pendiente de completar]"}</strong> y domicilio a efectos de
            notificaciones en{" "}
            <strong>{siteConfig.legalAddress || "[Pendiente de completar]"}</strong>. Para cualquier consulta,
            puedes contactar en{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-blue-700 underline underline-offset-2">
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">2. Objeto del sitio web</h2>
          <p className="mt-2">
            Fiscalit ofrece calculadoras y simuladores fiscales, laborales y de cotización gratuitos, de carácter
            divulgativo y orientativo, dirigidos a autónomos y micropymes en España. El acceso y uso del sitio
            atribuye la condición de usuario y supone la aceptación plena de las condiciones incluidas en este
            Aviso Legal.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. Condiciones de uso</h2>
          <p className="mt-2">
            El usuario se compromete a hacer un uso adecuado y lícito del sitio web, de conformidad con la
            legislación aplicable, la buena fe, el orden público y el propio Aviso Legal. Queda prohibido el uso
            del sitio con fines ilícitos o lesivos, o que de cualquier forma puedan causar perjuicio o impedir el
            normal funcionamiento del sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">4. Propiedad intelectual e industrial</h2>
          <p className="mt-2">
            El diseño del sitio web, los códigos fuente, logotipos, textos, gráficos, ilustraciones, fotografías y
            demás elementos que lo componen son titularidad de Fiscalit o de terceros que han autorizado su uso,
            y están protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
            reproducción, distribución o comunicación pública total o parcial sin autorización expresa, salvo para
            uso personal y privado.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">5. Exención de responsabilidad</h2>
          <p className="mt-2">
            Las herramientas de Fiscalit son simuladores orientativos y divulgativos: no constituyen
            asesoramiento fiscal, laboral, contable ni jurídico individualizado ni vinculante, y no sustituyen el
            análisis de un profesional colegiado. Fiscalit no garantiza la ausencia de errores en los contenidos
            ni que estén permanentemente actualizados, si bien revisa la normativa aplicable periódicamente (ver{" "}
            <a href="/metodologia" className="text-blue-700 underline underline-offset-2">
              metodología y fuentes
            </a>
            ). Fiscalit no se hace responsable de los daños y perjuicios derivados del uso de la información y las
            herramientas contenidas en este sitio, ni de las decisiones adoptadas a partir de sus resultados.
          </p>
          <p className="mt-2">
            El sitio puede incluir enlaces a páginas de terceros (proveedores de software, gestorías,
            entidades bancarias...). Fiscalit no controla ni se responsabiliza del contenido, disponibilidad o
            políticas de privacidad de esos sitios externos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">6. Legislación aplicable y jurisdicción</h2>
          <p className="mt-2">
            Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada
            del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales que resulten
            competentes conforme a la normativa de protección de consumidores y usuarios, cuando resulte
            aplicable.
          </p>
        </section>
      </div>
    </div>
  );
}
