import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { formatFechaISO } from "@/lib/format";

const PATH = "/privacidad";

export const metadata: Metadata = buildPageMetadata({
  title: "Política de privacidad",
  description:
    "Qué datos trata Fiscalit y con qué finalidad: los datos financieros de las calculadoras nunca salen de tu navegador. Derechos RGPD y cómo ejercerlos.",
  path: PATH,
});

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Política de privacidad</h1>
      <p className="mt-3 text-sm text-slate-500">
        Última actualización: {formatFechaISO(siteConfig.lastMethodologyReview)}
      </p>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-800">
        <p>
          <strong>Resumen:</strong> cálculo 100% en local. Los datos financieros que introduces en las
          calculadoras (ingresos, gastos, salarios, cuotas...) no se envían a ningún servidor ni se almacenan en
          bases de datos: todo el cálculo se ejecuta en tu propio navegador. Solo tratamos datos personales cuando
          tú, voluntariamente, rellenas y envías un formulario de contacto o de alta a las alertas por email.
        </p>
      </div>

      <div className="mt-8 space-y-8 text-sm leading-6 text-slate-600">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Responsable del tratamiento</h2>
          <p className="mt-2">
            {siteConfig.legalName || "El titular de Fiscalit.es (ver Aviso Legal)"}, contactable en{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-blue-700 underline underline-offset-2">
              {siteConfig.contactEmail}
            </a>
            , es responsable del tratamiento de los datos personales que se describen en esta política. Consulta
            la identificación completa del titular en el{" "}
            <Link href="/aviso-legal" className="text-blue-700 underline underline-offset-2">
              Aviso legal
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">2. Datos de las calculadoras: nunca salen de tu navegador</h2>
          <p className="mt-2">
            Las cifras que introduces en cualquier calculadora de Fiscalit (facturación, gastos, salarios, cuotas,
            kilómetros...) se procesan íntegramente con JavaScript en tu propio dispositivo. Fiscalit no envía
            esos datos a ningún servidor propio ni de terceros, ni los almacena en ninguna base de datos: no
            existe backend que los reciba. Si cierras la pestaña o recargas la página, esos datos desaparecen sin
            dejar rastro en ningún sistema de Fiscalit.
          </p>
          <p className="mt-2">
            Las funciones de descarga de informe (PDF y CSV/Excel) y de «Compartir simulación» también se generan
            íntegramente en tu navegador: la primera crea el archivo localmente para que lo descargues, y la
            segunda codifica tus valores en la propia URL, sin pasar por ningún servidor de Fiscalit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. Formularios que sí envían datos</h2>
          <p className="mt-2">
            Algunas secciones opcionales de Fiscalit sí implican el envío voluntario de datos personales a un
            tercero o por correo electrónico:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong>Alertas del BOE por email:</strong> si te suscribes, tu dirección de email se envía a
              nuestro proveedor de newsletter configurado, o —si no hay ninguno configurado— se prepara un correo
              con tu dirección dirigido a nosotros. Finalidad: enviarte avisos sobre cambios normativos. Base
              legal: tu consentimiento. Puedes darte de baja en cualquier momento.
            </li>
            <li>
              <strong>Solicitud de auditoría gratuita (leads de alto valor):</strong> si rellenas este formulario
              (visible solo en escenarios de facturación elevada de la calculadora Autónomo vs SL), tu nombre,
              email, teléfono y la facturación estimada se envían a nuestro webhook configurado o, en su defecto,
              por correo electrónico. Finalidad: que un asesor mercantil se ponga en contacto contigo. Base legal:
              tu consentimiento.
            </li>
          </ul>
          <p className="mt-2">
            En ambos casos, el envío solo ocurre si tú rellenas el formulario y pulsas el botón de envío: nunca se
            transmite nada de forma automática ni oculta.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">4. Datos técnicos de navegación</h2>
          <p className="mt-2">
            Como cualquier sitio web, el proveedor de alojamiento que sirve los archivos estáticos de Fiscalit
            puede registrar de forma automática datos técnicos de acceso (dirección IP, fecha y hora, user-agent)
            por motivos de seguridad y funcionamiento del servicio, con independencia de Fiscalit. Este
            tratamiento es inherente a la prestación de cualquier servicio de hosting en internet y no implica un
            seguimiento o perfilado por nuestra parte. Fiscalit no utiliza cookies propias de analítica ni de
            publicidad: consulta la{" "}
            <Link href="/cookies" className="text-blue-700 underline underline-offset-2">
              Política de cookies
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">5. Enlaces de afiliados</h2>
          <p className="mt-2">
            Fiscalit incluye enlaces de colaboración a servicios de terceros (software de facturación, gestorías,
            bancos online...). Al hacer clic en uno de estos enlaces, sales de Fiscalit y pasas a regirte por la
            política de privacidad de ese tercero, sobre la que no tenemos control. Te recomendamos revisarla
            antes de facilitarle tus datos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">6. Conservación de los datos</h2>
          <p className="mt-2">
            Los datos financieros de las calculadoras no se conservan en ningún sistema de Fiscalit, porque nunca
            llegan a él. Los emails de alta a las alertas se conservan mientras no solicites la baja. Los datos de
            un formulario de contacto o de auditoría gratuita se conservan mientras dure la gestión de tu
            solicitud comercial.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">7. Tus derechos</h2>
          <p className="mt-2">
            Conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, puedes ejercer tus derechos de
            acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de los datos
            que nos hayas facilitado voluntariamente, escribiendo a{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-blue-700 underline underline-offset-2">
              {siteConfig.contactEmail}
            </a>
            . Si consideras que el tratamiento no se ajusta a la normativa, tienes derecho a presentar una
            reclamación ante la Agencia Española de Protección de Datos (
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline underline-offset-2"
            >
              www.aepd.es
            </a>
            ).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">8. Cambios en esta política</h2>
          <p className="mt-2">
            Podemos actualizar esta política para adaptarla a novedades legislativas o cambios en el
            funcionamiento del sitio. La fecha de la última actualización figura al inicio de esta página.
          </p>
        </section>
      </div>
    </div>
  );
}
