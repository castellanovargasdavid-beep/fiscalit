"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatEUR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface HighValueLeadCardProps {
  /** Facturación bruta anual introducida por el usuario, para contextualizar el mensaje y el lead. */
  facturacionAnual: number;
  className?: string;
}

type EstadoEnvio = "idle" | "enviando" | "enviado" | "error";

/**
 * Captura de leads B2B de alto valor: se muestra en escenarios de facturación
 * elevada para derivar al usuario a una auditoría mercantil humana. Envía el
 * lead a `siteConfig.leadWebhookUrl` si está configurado; si no, cae a un
 * `mailto:` a `siteConfig.contactEmail`. El botón de WhatsApp solo aparece si
 * `siteConfig.whatsappNumber` está configurado.
 */
export function HighValueLeadCard({ facturacionAnual, className }: HighValueLeadCardProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [estado, setEstado] = useState<EstadoEnvio>("idle");

  const whatsappHref = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
        `Hola, facturo ${formatEUR(facturacionAnual)}/año y quiero una auditoría mercantil gratuita de mi caso (vía Fiscalit).`,
      )}`
    : null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (siteConfig.leadWebhookUrl) {
      setEstado("enviando");
      try {
        const response = await fetch(siteConfig.leadWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, telefono, facturacionAnual }),
        });
        if (!response.ok) throw new Error("Respuesta no OK del webhook de leads");
        setEstado("enviado");
      } catch {
        setEstado("error");
      }
      return;
    }

    const asunto = encodeURIComponent("Solicitud de auditoría mercantil gratuita — Fiscalit");
    const cuerpo = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nFacturación actual: ${formatEUR(facturacionAnual)}/año`,
    );
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${asunto}&body=${cuerpo}`;
    setEstado("enviado");
  };

  return (
    <div className={cn("mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm print:hidden", className)}>
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
        <div>
          <p className="text-base font-semibold text-amber-900">
            ¿Quieres que un asesor mercantil colegiado audite tu caso sin coste?
          </p>
          <p className="mt-1 text-sm text-amber-800/90">
            Con una facturación como la tuya, una auditoría personalizada puede detectar ahorros que esta
            calculadora no cubre: estructuras societarias, optimización fiscal y planificación patrimonial.
          </p>
        </div>
      </div>

      <details className="group mt-4">
        <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 rounded-full bg-amber-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800">
          Solicitar auditoría gratuita
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>

        <div className="mt-4 rounded-xl border border-amber-200 bg-white p-4">
          {estado === "enviado" ? (
            <p className="text-sm font-medium text-emerald-700">
              ¡Gracias! Hemos recibido tu solicitud y un asesor se pondrá en contacto contigo en breve.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                aria-label="Nombre"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label="Email"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <input
                required
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
                aria-label="Teléfono"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              <input
                readOnly
                type="text"
                value={`Facturación actual: ${formatEUR(facturacionAnual)}/año`}
                aria-label="Facturación actual"
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
              />

              <p className="col-span-full text-xs text-slate-500">
                Al enviar, tus datos de contacto y la facturación de arriba se remiten de forma segura para
                gestionar tu solicitud. El resto de la calculadora nunca sale de tu navegador.
              </p>

              <div className="col-span-full flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={estado === "enviando"}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
                >
                  {estado === "enviando" ? "Enviando…" : "Enviar solicitud"}
                </button>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-50"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Contactar por WhatsApp
                  </a>
                )}
                {estado === "error" && (
                  <p className="w-full text-sm text-rose-600">
                    No hemos podido enviar el formulario. Escríbenos directamente a{" "}
                    <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
                      {siteConfig.contactEmail}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </details>
    </div>
  );
}
