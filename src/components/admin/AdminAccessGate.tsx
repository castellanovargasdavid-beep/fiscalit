"use client";

import { useSyncExternalStore, useState, type FormEvent, type ReactNode } from "react";
import { Lock, LogOut, ShieldAlert } from "lucide-react";
import { ADMIN_ACCESS_TOKEN, ADMIN_UNLOCKED_STORAGE_KEY } from "@/config/adminOps";

/** Evento sintético para que useSyncExternalStore reaccione a cambios de localStorage hechos por este mismo documento (el evento nativo "storage" solo se dispara en OTRAS pestañas). */
const UNLOCK_CHANGE_EVENT = "fiscalit-admin-unlock-change";

function subscribeToUnlockState(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(UNLOCK_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(UNLOCK_CHANGE_EVENT, callback);
  };
}

function getUnlockedSnapshot(): boolean {
  try {
    return window.localStorage.getItem(ADMIN_UNLOCKED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** En el HTML estático (build/SSR) no hay `window`: se asume bloqueado hasta que el cliente confirme lo contrario. */
function getServerUnlockedSnapshot(): boolean {
  return false;
}

function setUnlockedFlag(unlocked: boolean): void {
  try {
    if (unlocked) {
      window.localStorage.setItem(ADMIN_UNLOCKED_STORAGE_KEY, "1");
    } else {
      window.localStorage.removeItem(ADMIN_UNLOCKED_STORAGE_KEY);
    }
  } catch {
    // Si no se puede persistir (navegación privada...), el desbloqueo solo dura esta carga de página.
  }
  window.dispatchEvent(new Event(UNLOCK_CHANGE_EVENT));
}

interface AdminAccessGateProps {
  children: ReactNode;
}

/**
 * Barrera de acceso en cliente para el panel interno. IMPORTANTE: esto no
 * es autenticación real (ver el aviso en `src/config/adminOps.ts`) — es una
 * exportación estática sin backend, así que el token vive en el JavaScript
 * público del sitio. Su función es evitar el acceso casual, no proteger
 * secretos; por eso ninguna sección del panel muestra datos que no puedan
 * verse ya en el código fuente o en las páginas públicas del sitio.
 */
export function AdminAccessGate({ children }: AdminAccessGateProps) {
  const unlocked = useSyncExternalStore(subscribeToUnlockState, getUnlockedSnapshot, getServerUnlockedSnapshot);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input === ADMIN_ACCESS_TOKEN) {
      setError(false);
      setUnlockedFlag(true);
    } else {
      setError(true);
    }
  };

  const handleLock = () => {
    setInput("");
    setUnlockedFlag(false);
  };

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div className="flex items-center gap-2 text-slate-400">
            <Lock className="h-5 w-5" aria-hidden="true" />
            <p className="text-xs font-medium tracking-wide uppercase">Acceso restringido</p>
          </div>
          <h1 className="mt-3 text-xl font-semibold text-white">Operaciones FiscalIT</h1>
          <p className="mt-1 text-sm text-slate-400">
            Panel interno de uso exclusivo del equipo. Introduce la clave de acceso para continuar.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="password"
              autoFocus
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setError(false);
              }}
              placeholder="Clave de acceso"
              aria-label="Clave de acceso"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-rose-400">
                <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                Clave incorrecta.
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Entrar
            </button>
          </form>

          <p className="mt-6 text-xs leading-5 text-slate-500">
            Este bloqueo se ejecuta en el navegador y no sustituye una autenticación real de servidor: cualquiera
            con acceso al código fuente del sitio puede leer la clave. No es una vía para proteger secretos, solo
            para evitar el acceso casual.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-800 bg-slate-900/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">FiscalIT · Operaciones internas</p>
          <button
            type="button"
            onClick={handleLock}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
