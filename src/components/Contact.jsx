import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { useProfile } from "../context/ProfileContext";

export default function Contact() {
  const { profile } = useProfile();

  const githubUsername = profile?.socials?.github
    ? profile.socials.github.split("/").filter(Boolean).pop()
    : "github";

  const linkedInUrl = profile?.socials?.linkedin
    ? profile.socials.linkedin.startsWith("http")
      ? profile.socials.linkedin
      : `https://${profile.socials.linkedin}`
    : "https://www.linkedin.com";

  const linkedInDisplay = profile?.socials?.linkedin
    ? profile.socials.linkedin.replace(/^https?:\/\//i, "").replace(/^www\./i, "")
    : "linkedin.com";

  const contactItems = [
    {
      icon: FiMail,
      label: "Email",
      value: profile.email || "email@example.com",
      href: profile.email ? `mailto:${profile.email}` : null,
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: profile.phone || "—",
      href: profile.phone ? `tel:${profile.phone}` : null,
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: profile.location || "Location",
      href: null,
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: profile?.socials?.github ? `@${githubUsername}` : "GitHub",
      href: profile?.socials?.github || "https://github.com",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: linkedInDisplay,
      href: linkedInUrl,
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          number="06"
          eyebrow="Contact"
          title="Let's build something"
          description="Open to full-stack roles and freelance MERN projects."
        />

        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {contactItems.map((item) => {
              const Content = (
                <div className="flex items-center gap-3 p-3.5 rounded-2xl glass hover:border-border-strong hover:bg-white/5 transition-all">
                  <span className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-accent-cyan shrink-0">
                    <item.icon size={16} />
                  </span>
                  <div>
                    <p className="text-xs text-text-faint mono-label uppercase">
                      {item.label}
                    </p>
                    <p className="text-sm text-text font-mono truncate max-w-[200px] sm:max-w-none">{item.value}</p>
                  </div>
                </div>
              );

              if (item.label === "Email" && item.href) {
                const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(
                  profile.email || ""
                )}`;

                const handleEmailClick = (e) => {
                  e.preventDefault();
                  const mailto = item.href;
                  try {
                    window.location.href = mailto;
                  } catch (err) {
                    // ignore
                  }
                  // Fallback: if no mail client responds, open Gmail compose after short delay
                  setTimeout(() => {
                    try {
                      window.open(gmailHref, "_blank", "noopener,noreferrer");
                    } catch (err) {
                      // ignore
                    }
                  }, 700);
                };

                return (
                  <div key={item.label} className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
                    <a href={item.href} onClick={handleEmailClick} className="w-full sm:flex-1 text-left block outline-none">
                      {Content}
                    </a>
                  </div>
                );
              }

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="block outline-none"
                >
                  {Content}
                </a>
              ) : (
                <div key={item.label}>{Content}</div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
