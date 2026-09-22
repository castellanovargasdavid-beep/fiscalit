"use client";

import { useState, type FormEvent } from "react";
import { BellRing } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BoeAlertSignupProps {
  className?: string;
}

type EstadoSuscripcion = "idle" | "enviando" | "enviado" | "error";

/**
 * Tarjeta de alta a alertas del BOE. Envía el email a
 * `siteConfig.newsletterEndpoint` (un proveedor externo tipo Buttondown,
 * MailerLite o Formspree que acepte un POST con un campo `email`); si no
 * hay endpoint configurado, cae a un `mailto:` al email de contacto del
 * sitio para que el alta se pueda gestionar a mano mientras tanto.
 */
export function BoeAlertSignup({ className }: BoeAlertSignupProps) {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<EstadoSuscripcion>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (siteConfig.newsletterEndpoint) {
      setEstado("enviando");
      try {
        await fetch(siteConfig.newsletterEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email }),
        });
        setEstado("enviado");
      } catch {
        setEstado("error");
      }
      return;
    }

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
      "Alta en alertas del BOE — Fiscalit",
    )}&body=${encodeURIComponent(`Quiero suscribirme a las alertas del BOE con este email: ${email}`)}`;
    setEstado("enviado");
  };

  if (estado === "enviado") {
    return (
      <div
        className={cn("rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-sm", className)}
      >
        <p className="text-sm font-semibold text-emerald-700">✓ Te avisaremos de las novedades</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <BellRing className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Alertas oficiales del BOE sin spam</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Te avisamos por email el día exacto en que Hacienda o la Seguridad Social publiquen cambios en cuotas
            RETA, IRPF o plazos de VeriFactu.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="boe-alert-email" className="sr-only">
          Email
        </label>
        <input
          id="boe-alert-email"
          required
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:flex-1"
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {estado === "enviando" ? "Enviando…" : "Suscribirme gratis"}
        </button>
      </form>

      {estado === "error" && (
        <p className="mt-2 text-sm text-rose-600">
          No hemos podido procesar la suscripción. Escríbenos a{" "}
          <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
            {siteConfig.contactEmail}
          </a>
          .
        </p>
      )}

      <p className="mt-3 text-xs text-slate-400">Tus datos no se ceden a terceros. Baja en un clic.</p>
    </div>
  );
}
