import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useProfile } from "../context/ProfileContext";

export default function Skills() {
  const { skills } = useProfile();
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          number="02"
          eyebrow="Skills"
          title="Tools I reach for"
          description="Grouped the way I actually use them — not an exhaustive checklist, just what ships product."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="glass rounded-2xl p-6 hover:border-border-strong transition-colors group"
            >
              <h3 className="font-display font-semibold text-lg mb-4 flex items-center justify-between">
                {group.category}
                <span className="font-mono text-xs text-text-faint group-hover:text-accent-cyan transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-surface border border-border text-text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
