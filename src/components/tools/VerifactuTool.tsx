"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Circle, Clock } from "lucide-react";
import {
  diagnosticarVerifactu,
  type SistemaFacturacionActual,
  type TipoCliente,
  type TipoContribuyente,
} from "@/lib/calculations/verifactu";
import { OptionGroup } from "@/components/ui/OptionGroup";
import { LegalSourceBadge } from "@/components/tools/LegalSourceBadge";
import { EmbedWidgetModal } from "@/components/EmbedWidgetModal";
import { PrintHeader } from "@/components/tools/PrintHeader";
import { AffiliateCard } from "@/components/AffiliateCard";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { useIsClient } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface VerifactuToolProps {
  faqItems: FAQItem[];
}

type SistemaBase = "papel" | "excel_manual" | "software";
type VolumenFacturacion = "menos_8m" | "mas_8m";
type RespuestaQR = "si" | "no" | "no_lo_se";
type EstadoSemaforo = "verde" | "amarillo" | "rojo";

// Fecha estable para el primer render (servidor/build); evita discrepancias de
// hidratación entre el HTML estático y el cálculo real hecho en el cliente.
const FECHA_PLACEHOLDER = new Date(2020, 0, 1);

const ESTILOS_SEMAFORO: Record<
  EstadoSemaforo,
  { icon: typeof CheckCircle2; border: string; bg: string; texto: string }
> = {
  verde: {
    icon: CheckCircle2,
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    texto: "text-emerald-700",
  },
  amarillo: {
    icon: Clock,
    border: "border-amber-200",
    bg: "bg-amber-50",
    texto: "text-amber-700",
  },
  rojo: {
    icon: AlertTriangle,
    border: "border-rose-200",
    bg: "bg-rose-50",
    texto: "text-rose-700",
  },
};

function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

export function VerifactuTool({ faqItems }: VerifactuToolProps) {
  const mounted = useIsClient();

  const [tipoContribuyente, setTipoContribuyente] = useState<TipoContribuyente>("autonomo");
  const [tipoCliente, setTipoCliente] = useState<TipoCliente>("AMBOS");
  const [sistemaBase, setSistemaBase] = useState<SistemaBase>("excel_manual");
  const [volumenFacturacion, setVolumenFacturacion] = useState<VolumenFacturacion>("menos_8m");
  const [qrGenerado, setQrGenerado] = useState<RespuestaQR>("no_lo_se");

  const sistemaActual: SistemaFacturacionActual = useMemo(() => {
    if (sistemaBase === "papel") return "sin_sistema_o_manual";
    if (sistemaBase === "excel_manual") return "hoja_calculo";
    return qrGenerado === "si" ? "software_verifactu" : "software_no_verificable";
  }, [sistemaBase, qrGenerado]);

  const facturacionAnual = volumenFacturacion === "mas_8m" ? 9_000_000 : 500_000;

  const resultado = useMemo(
    () =>
      diagnosticarVerifactu({
        tipoContribuyente,
        tipoCliente,
        facturacionAnual,
        sistemaActual,
        fechaConsulta: mounted ? new Date() : FECHA_PLACEHOLDER,
      }),
    [tipoContribuyente, tipoCliente, facturacionAnual, sistemaActual, mounted],
  );

  const estado = useMemo<{ nivel: EstadoSemaforo; titulo: string; mensaje: string }>(() => {
    const itemsCriticos = resultado.checklist.filter((item) => item.id !== "factura_electronica_b2b");
    const listo = itemsCriticos.every((item) => item.cumplido);

    if (resultado.obligadoVerifactu) {
      return listo
        ? {
            nivel: "verde",
            titulo: "Cumpliendo",
            mensaje: "Tu sistema actual cumple los requisitos técnicos de VeriFactu.",
          }
        : {
            nivel: "rojo",
            titulo: "Incumplimiento / riesgo de sanción",
            mensaje:
              "Ya estás obligado a VeriFactu y tu sistema actual no cumple los requisitos técnicos. Actúa cuanto antes.",
          };
    }

    if (listo) {
      return {
        nivel: "verde",
        titulo: "Cumpliendo",
        mensaje: `Tu sistema ya cumple los requisitos técnicos que serán obligatorios el ${formatearFecha(resultado.fechaLimiteVerifactu)}.`,
      };
    }

    return {
      nivel: "amarillo",
      titulo: "Pendiente de adaptación",
      mensaje: `Tienes hasta el ${formatearFecha(resultado.fechaLimiteVerifactu)} para adaptar tu sistema de facturación a los requisitos técnicos del Reglamento.`,
    };
  }, [resultado]);

  const EstiloEstado = ESTILOS_SEMAFORO[estado.nivel];
  const IconoEstado = EstiloEstado.icon;

  const ctaQuipu =
    estado.nivel !== "verde"
      ? {
          dynamicHeadline: "Adapta tu facturación a VeriFactu antes de tu fecha límite con Quipu.",
          promoBadgeText: "Migración asistida incluida",
        }
      : {};

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <PrintHeader toolTitle="Diagnóstico VeriFactu y Ley Crea y Crece" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Diagnóstico VeriFactu y Ley Crea y Crece
        </h1>
        <EmbedWidgetModal slug="diagnostico-verifactu" toolTitle="Diagnóstico VeriFactu y Ley Crea y Crece" />
      </div>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
        Comprueba si tu sistema actual cumple ya los requisitos técnicos de facturación exigidos por el Reglamento
        VeriFactu, de cara a su entrada en vigor obligatoria en 2027 (1 de enero para sociedades, 1 de julio para
        autónomos y el resto de obligados tributarios).
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-medium text-slate-700">Calculando para</p>
          <div className="mt-2 inline-flex rounded-full border border-slate-200 p-1 print:hidden">
            {(
              [
                { value: "autonomo", label: "Autónomo" },
                { value: "sociedad", label: "Sociedad / Empresa" },
              ] as const
            ).map((opcion) => (
              <button
                key={opcion.value}
                type="button"
                onClick={() => setTipoContribuyente(opcion.value)}
                aria-pressed={tipoContribuyente === opcion.value}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  tipoContribuyente === opcion.value
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-slate-900",
                )}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <OptionGroup
            label="1. Tipo de cliente"
            columns={3}
            value={tipoCliente}
            onChange={setTipoCliente}
            options={[
              { value: "B2B", label: "B2B", description: "Empresas y autónomos" },
              { value: "B2C", label: "B2C", description: "Particulares" },
              { value: "AMBOS", label: "Mixto", description: "B2B y B2C" },
            ]}
          />
          <OptionGroup
            label="2. Sistema actual de facturación"
            columns={3}
            value={sistemaBase}
            onChange={setSistemaBase}
            options={[
              { value: "papel", label: "Papel", description: "Factura en papel" },
              { value: "excel_manual", label: "Excel / Word", description: "Manual" },
              { value: "software", label: "Software", description: "En la nube o instalado" },
            ]}
          />
          <OptionGroup
            label="3. Volumen de facturación anual"
            columns={2}
            value={volumenFacturacion}
            onChange={setVolumenFacturacion}
            options={[
              { value: "menos_8m", label: "Menos de 8M €" },
              { value: "mas_8m", label: "Más de 8M €" },
            ]}
          />
          <OptionGroup
            label="4. ¿Tu software genera QR tributario y registro inalterable?"
            columns={3}
            value={qrGenerado}
            onChange={setQrGenerado}
            options={[
              { value: "si", label: "Sí" },
              { value: "no", label: "No" },
              { value: "no_lo_se", label: "No lo sé" },
            ]}
          />
        </div>
      </div>

      <div className={cn("mt-8 rounded-2xl border p-6 print:break-inside-avoid", EstiloEstado.border, EstiloEstado.bg)}>
        <div className="flex items-start gap-4">
          <IconoEstado className={cn("h-8 w-8 shrink-0", EstiloEstado.texto)} aria-hidden="true" />
          <div>
            <p className={cn("text-lg font-semibold", EstiloEstado.texto)}>{estado.titulo}</p>
            <p className="mt-1 text-sm text-slate-700">{estado.mensaje}</p>
          </div>
        </div>

        <dl className="mt-5 grid gap-4 border-t border-slate-900/10 pt-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-slate-500">
              Fecha límite VeriFactu ({tipoContribuyente === "autonomo" ? "autónomos" : "sociedades"})
            </dt>
            <dd className="mt-0.5 text-sm font-medium text-slate-900">
              {formatearFecha(resultado.fechaLimiteVerifactu)}
            </dd>
          </div>
          {resultado.obligadoFacturaElectronicaB2B && resultado.notaFacturaElectronicaB2B && (
            <div>
              <dt className="text-xs text-slate-500">Factura electrónica B2B (Ley Crea y Crece)</dt>
              <dd className="mt-0.5 text-sm font-medium text-slate-900">{resultado.notaFacturaElectronicaB2B}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm print:break-inside-avoid">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Checklist técnico</h2>
        <ul className="mt-4 space-y-3">
          {resultado.checklist.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              {item.cumplido ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              ) : (
                <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
              )}
              <div>
                <p className="text-sm font-medium text-slate-900">{item.titulo}</p>
                <p className="text-sm text-slate-500">{item.descripcion}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <LegalSourceBadge
        fuente="Conforme al Reglamento de requisitos de los sistemas informáticos de facturación (Orden HAC/1177/2024)."
        url="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2024-22138"
      />

      <div className="mt-10">
        <AffiliateCard partnerId="quipu" {...ctaQuipu} />
      </div>

      <FAQAccordion items={faqItems} />
    </div>
  );
}
