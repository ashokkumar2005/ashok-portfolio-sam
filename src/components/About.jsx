import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useProfile } from "../context/ProfileContext";

const stats = [
  { label: "Projects Shipped", value: "2+" },
  { label: "Core Stack", value: "MERN" },
  { label: "Focus", value: "Full Stack" },
];

export default function About() {
  const { profile } = useProfile();
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="01" eyebrow="About" title="A bit about me" />

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 mt-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-text-muted text-lg leading-relaxed"
          >
            {profile.summary} My work centers on the MERN stack — designing
            REST APIs on the backend, and building interfaces on the frontend
            that feel fast and deliberate rather than assembled from a
            template. I care about clean, reusable code and about the small
            interaction details that make a product feel finished.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-3 md:grid-cols-1 gap-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-5">
                <div className="font-mono text-2xl text-gradient font-semibold">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted mt-1 mono-label uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
