import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-elevated/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-fg">{siteConfig.name}</p>
          <p className="mt-4 max-w-xs text-sm leading-7 text-muted">
            Real-world engineering.
            <br />
            Secure software.
            <br />
            Modern .NET.
            <br />
            AI-assisted development.
          </p>
        </div>
        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-faint">Connect</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.social.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <a href={link.href} className="text-muted hover:text-fg" rel="me noopener" target="_blank">
                    {link.label}
                  </a>
                ) : (
                  <span className="text-muted" title="Add the URL in lib/site.ts">
                    {link.label} <span className="font-mono text-xs text-faint">{link.placeholder}</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 font-mono text-xs text-faint sm:px-6 lg:px-8">
          © {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
