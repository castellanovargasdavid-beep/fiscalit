"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, TrendingUp, X } from "lucide-react";
import { mainNav } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5 transition-all duration-150 hover:opacity-95">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 shadow-sm shadow-blue-500/20 ring-1 ring-black/5">
            <TrendingUp className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <span className="flex items-center">
            <span className="text-lg font-extrabold tracking-tight text-slate-900">Fiscal</span>
            <span className="text-lg font-black tracking-tight text-blue-600">it</span>
            <span className="ml-1 rounded-md border border-slate-200/80 bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              .es
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex"
        >
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-slate-900">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Navegación móvil" className="border-t border-slate-200 px-4 py-3 sm:hidden">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
