import { FiGithub, FiMail, FiArrowUp } from "react-icons/fi";
import { useProfile } from "../context/ProfileContext";

const links = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const { profile } = useProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="/#hero" className="font-display font-semibold text-lg">
            SAM
          </a>

          <nav className="flex flex-wrap items-center gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-text-muted hover:text-text transition-colors"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-text-muted hover:text-text transition-colors"
            >
              <FiMail size={18} />
            </a>
            <a
              href="/#hero"
              aria-label="Back to top"
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-border-strong transition-colors"
            >
              <FiArrowUp size={14} />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-faint">
          <p>&copy; {year} {profile.name}. All rights reserved.</p>
          <a
            href="/admin/login"
            className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-text-muted hover:border-accent-cyan hover:text-accent-cyan transition-colors"
          >
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
}
