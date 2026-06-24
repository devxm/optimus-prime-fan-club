"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/#characters", label: "Characters" },
  { href: "/#battle", label: "The Battle" },
  { href: "/signup", label: "Sign Up Here", cta: true },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <Link href="/" className="brand">
        <span className="brand-mark" aria-hidden="true">▲</span>
        <span>Optimus Prime Fan Club</span>
      </Link>
      <ul className="nav-tabs">
        {TABS.map((tab) => {
          const active =
            (tab.href === "/" && pathname === "/") ||
            (tab.href === "/signup" && pathname === "/signup");
          const cls = [
            "nav-tab",
            tab.cta ? "nav-cta" : "",
            active ? "active" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <li key={tab.href}>
              <Link href={tab.href} className={cls}>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
