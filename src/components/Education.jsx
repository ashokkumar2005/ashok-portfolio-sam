import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useProfile } from "../context/ProfileContext";

export default function Education() {
  const { education } = useProfile();
  return (
    <section id="education" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="04" eyebrow="Education" title="Timeline" />

        <div className="mt-12 relative pl-8 border-l border-border">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute -left-[38px] top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan" />
              <p className="font-mono text-xs text-accent-cyan mb-1.5">
                {item.period}
              </p>
              <h3 className="font-display font-semibold text-xl">
                {item.degree}
              </h3>
              <p className="text-text-muted mt-1">{item.school}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
