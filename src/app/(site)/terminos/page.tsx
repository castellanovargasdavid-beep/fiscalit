import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { formatFechaISO } from "@/lib/format";

const PATH = "/terminos";

export const metadata: Metadata = buildPageMetadata({
  title: "Términos y condiciones de uso",
  description:
    "Condiciones de uso de Fiscalit: naturaleza divulgativa y no vinculante del servicio, ámbito territorial, exención de responsabilidad y uso de los informes descargables.",
  path: PATH,
});

export default function TerminosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Términos y condiciones de uso
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        Última actualización: {formatFechaISO(siteConfig.lastMethodologyReview)}
      </p>

      <div className="mt-8 space-y-8 text-sm leading-6 text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Naturaleza del servicio</h2>
          <p className="mt-2">
            Fiscalit es un conjunto de calculadoras y simuladores fiscales, laborales y de cotización, de acceso
            gratuito y carácter <strong>divulgativo, orientativo y no vinculante</strong>. Los resultados que
            obtienes son una estimación basada en los datos que introduces y en una interpretación general de la
            normativa vigente en el momento de la consulta: no constituyen una liquidación tributaria, una nómina,
            ni ningún otro documento con validez oficial ante la AEAT, la TGSS o cualquier otro organismo.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            2. Ausencia de relación contractual de asesoramiento
          </h2>
          <p className="mt-2">
            El uso de Fiscalit no genera ninguna relación contractual de asesor-cliente, ni de prestación de
            servicios profesionales de asesoría fiscal, laboral, contable o jurídica. Fiscalit no revisa tu
            situación particular, no responde por escrito consultas individualizadas sobre tu caso, y no asume
            frente a ti ninguna de las obligaciones (deber de diligencia profesional, responsabilidad civil
            profesional, secreto profesional reforzado...) propias de una gestoría o un despacho de asesoramiento.
            Si necesitas una respuesta vinculante para tu caso concreto, contrata a un profesional cualificado.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. Ámbito geográfico</h2>
          <p className="mt-2">
            Las calculadoras de Fiscalit están construidas para el <strong>territorio común español</strong>{" "}
            (Península y Baleares). No contemplan las especialidades forales del País Vasco y Navarra ni los
            regímenes tributarios especiales de Canarias (IGIC), Ceuta o Melilla (IPSI). Si tu actividad se
            desarrolla en alguno de estos territorios, sus resultados no son de aplicación: consulta la normativa
            foral o insular correspondiente.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">4. Alcance y límites de las simulaciones</h2>
          <p className="mt-2">
            FiscalIT es una plataforma divulgativa e informativa que ofrece simulaciones estimativas basadas en
            supuestos matemáticos generales. El uso de sus herramientas no sustituye el juicio ni la contratación
            de un profesional cualificado.
          </p>
          <p className="mt-2">
            La normativa fiscal y laboral española cambia con frecuencia. Cada calculadora indica la fecha de su
            última revisión técnica (ver{" "}
            <Link href="/metodologia" className="text-blue-700 underline underline-offset-2">
              metodología y fuentes
            </Link>
            ), pero Fiscalit no garantiza que el resultado siga siendo exacto si la normativa aplicable ha
            cambiado con posterioridad a esa fecha. Es tu responsabilidad verificar que sigues usando una
            calculadora actualizada, especialmente antes de tomar decisiones con impacto económico.
          </p>
          <p className="mt-2">
            FiscalIT no garantiza que las proyecciones coincidan con las liquidaciones, inspecciones o resoluciones
            definitivas de la Agencia Tributaria o la Tesorería General de la Seguridad Social para situaciones
            particulares.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">
            5. Responsabilidad sobre decisiones mercantiles
          </h2>
          <p className="mt-2">
            Decisiones como constituir una sociedad, darte de alta como autónomo, cambiar de tramo de cotización o
            adaptar tu sistema de facturación tienen consecuencias legales, fiscales y económicas que dependen de
            tu situación particular. Fiscalit no se hace responsable de las decisiones mercantiles, laborales o
            fiscales que adoptes basándote únicamente en el resultado de una calculadora, sin contrastarlo con un
            profesional cualificado.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">6. Propiedad intelectual</h2>
          <p className="mt-2">
            El código, el diseño, los textos, la lógica de cálculo y los demás elementos de Fiscalit están
            protegidos por la normativa de propiedad intelectual e industrial y son titularidad de Fiscalit o de
            terceros que han autorizado su uso. Puedes consultar el detalle completo en el{" "}
            <Link href="/aviso-legal" className="text-blue-700 underline underline-offset-2">
              Aviso legal
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">7. Uso de los informes descargables (PDF/CSV)</h2>
          <p className="mt-2">
            Las calculadoras que lo permiten generan, íntegramente en tu navegador, un informe descargable en
            PDF o CSV/Excel con el resumen de tu simulación. Puedes descargar, imprimir y compartir libremente
            estos informes para tu uso personal o el de tu negocio, incluido enseñárselos a tu gestor o asesor.
            No están pensados para su reventa ni para presentarse como un documento oficial ante ningún organismo.
            Al igual que el resultado en pantalla, el contenido del informe queda sujeto a la fecha de generación
            que él mismo indica: si lo conservas y lo usas más adelante, ten en cuenta que la normativa puede
            haber cambiado desde entonces.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">8. Modificaciones</h2>
          <p className="mt-2">
            Podemos actualizar estos términos para adaptarlos a cambios normativos o del propio servicio. La fecha
            de la última actualización figura al inicio de esta página. El uso continuado de Fiscalit tras una
            actualización implica la aceptación de los términos vigentes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">9. Contacto</h2>
          <p className="mt-2">
            Para cualquier duda sobre estos términos, escríbenos a{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-blue-700 underline underline-offset-2">
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
