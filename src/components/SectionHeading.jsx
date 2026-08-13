import { motion } from "framer-motion";

export default function SectionHeading({ number, eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      {number && (
        <p className="editorial-number text-3xl text-accent-cyan mb-2">
          {number}.
        </p>
      )}
      {eyebrow && (
        <p className="mono-label text-xs uppercase text-accent-violet mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-text-muted mt-3 max-w-2xl">{description}</p>
      )}
    </motion.div>
  );
}
