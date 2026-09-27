"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { isActivePath } from "./NavLinks";

/** Slide-out navigation for small screens, built on the native <dialog> for focus handling. */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close after navigation.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted hover:text-fg"
      >
        <MenuIcon className="size-5" />
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Site navigation"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-[min(20rem,85vw)] max-w-none border-l border-border bg-elevated p-0 text-fg open:animate-[slide-in_180ms_ease-out]"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">{siteConfig.name}</span>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close navigation menu"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted hover:text-fg"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="p-3">
          <ul className="space-y-1">
            {[...mainNav, { label: "Engineering Lessons", href: "/experience" }].map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-base",
                      active ? "bg-subtle text-fg" : "text-muted hover:bg-subtle hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </dialog>
    </>
  );
}
