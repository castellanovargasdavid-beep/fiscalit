import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { formatFechaISO } from "@/lib/format";

const PATH = "/cookies";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de cookies",
  description:
    "Fiscalit no utiliza cookies propias de analítica ni de publicidad. Consulta qué cookies pueden instalar los enlaces de terceros y cómo gestionarlas.",
  path: PATH,
});

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Política de cookies</h1>
      <p className="mt-3 text-sm text-slate-500">
        Última actualización: {formatFechaISO(siteConfig.lastMethodologyReview)}
      </p>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-800">
        <p>
          <strong>Resumen:</strong> Fiscalit no instala cookies propias de analítica, publicidad ni seguimiento.
          El sitio es un conjunto de páginas estáticas: no requiere ningún banner de consentimiento porque, hoy
          por hoy, no hay nada que consentir.
        </p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-6 text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Qué es una cookie</h2>
          <p className="mt-2">
            Una cookie es un pequeño archivo de texto que un sitio web guarda en tu navegador para recordar
            información entre visitas: preferencias, sesión, datos de seguimiento con fines estadísticos o
            publicitarios, etc.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">2. Cookies que utiliza Fiscalit</h2>
          <p className="mt-2">
            Fiscalit no instala ninguna cookie propia de analítica, publicidad ni seguimiento del comportamiento
            del usuario. Las calculadoras funcionan enteramente con JavaScript ejecutado en tu navegador, sin
            necesidad de cookies para operar. Si en algún momento tu navegador guarda información local (por
            ejemplo, para recordar que ya cerraste un aviso), se hace mediante <code>localStorage</code>, una
            tecnología distinta de las cookies que permanece exclusivamente en tu dispositivo y nunca se envía a
            ningún servidor.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. Cookies de terceros al seguir un enlace</h2>
          <p className="mt-2">
            Fiscalit incluye enlaces de colaboración a servicios de terceros (software de facturación, gestorías,
            bancos online...). Si haces clic en uno de esos enlaces y navegas al sitio del tercero, ese sitio
            puede instalar sus propias cookies conforme a su propia política, ajena a Fiscalit y fuera de nuestro
            control. Te recomendamos revisar la política de cookies de cada servicio antes de aceptarlas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">4. Si en el futuro incorporamos analítica</h2>
          <p className="mt-2">
            Si en algún momento incorporamos una herramienta de analítica o medición de audiencia, actualizaremos
            esta política, informaremos con claridad de las cookies concretas utilizadas y solicitaremos tu
            consentimiento previo mediante un banner, conforme a la Guía sobre el uso de cookies de la Agencia
            Española de Protección de Datos (AEPD).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">5. Cómo gestionar las cookies desde tu navegador</h2>
          <p className="mt-2">
            Aunque Fiscalit no instala cookies propias, puedes configurar tu navegador para bloquear o eliminar
            las cookies de cualquier sitio, incluidas las de terceros a los que enlacemos, desde el apartado de
            privacidad o cookies de la configuración de tu navegador (Chrome, Firefox, Safari, Edge...).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">6. Más información</h2>
          <p className="mt-2">
            Consulta también nuestra{" "}
            <Link href="/privacidad" className="text-blue-700 underline underline-offset-2">
              Política de privacidad
            </Link>{" "}
            o escríbenos a{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-blue-700 underline underline-offset-2">
              {siteConfig.contactEmail}
            </a>{" "}
            si tienes cualquier duda.
          </p>
        </section>
      </div>
    </div>
  );
}
