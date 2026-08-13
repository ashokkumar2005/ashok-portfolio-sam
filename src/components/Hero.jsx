import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import heroPortrait from "../assets/hero-portrait.jpg";
import { useProfile } from "../context/ProfileContext";

const stats = [
  { label: "Projects Shipped", value: "2+" },
  { label: "Core Stack", value: "MERN" },
];

function TiltPortrait() {
  const { profile } = useProfile();
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ perspective: 1000 }}
      className="relative w-full max-w-sm mx-auto md:mx-0"
    >
      {/* Ambient drop shadow that shifts opposite the tilt for real depth */}
      <motion.div
        aria-hidden
        style={{
          x: useTransform(translateX, (v) => -v * 1.4),
          y: useTransform(translateY, (v) => -v * 1.4),
        }}
        className="absolute inset-4 rounded-sm bg-text/25 blur-2xl -z-10"
      />

      <motion.div
        style={{ rotateX, rotateY, x: translateX, y: translateY, transformStyle: "preserve-3d" }}
        className="relative aspect-square rounded-sm overflow-hidden shadow-2xl"
      >
        {/* Curtain-reveal on page load */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0"
        >
          <motion.img
            src={profile.avatarUrl || heroPortrait}
            alt={profile.name || "Ashokkumar T"}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
            className="w-full h-full object-cover"
            style={{ transform: "translateZ(0)" }}
          />
        </motion.div>

        {/* Foreground sheen that tracks the tilt, sitting above the image for parallax depth */}
        <motion.div
          aria-hidden
          style={{
            x: useTransform(translateX, (v) => v * 2.2),
            y: useTransform(translateY, (v) => v * 2.2),
          }}
          className="pointer-events-none absolute -inset-2 bg-gradient-to-br from-white/25 via-transparent to-transparent mix-blend-overlay"
        />
      </motion.div>

      <motion.span
        style={{ x: translateX, y: translateY }}
        className="absolute top-6 -right-3 w-2.5 h-2.5 rounded-full bg-text"
      />
    </motion.div>
  );
}

export default function Hero() {
  const { profile } = useProfile();
  return (
    <section id="hero" className="relative pt-28 pb-16 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-surface-2/60 [clip-path:polygon(30%_0,100%_0,100%_100%,0_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[0.85fr_1.15fr] gap-16 items-center">
        <TiltPortrait />

        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mono-label text-xs uppercase text-accent-violet mb-5"
          >
            {profile.roles?.[0] || "Full Stack Developer"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl sm:text-7xl leading-[1.05] tracking-tight"
          >
            {profile.name ? profile.name.split(" ")[0].toUpperCase() : "ASHOKKUMAR"}
            <span className="italic text-accent-cyan"> {profile.roles?.[1] || "software developer"}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-text-muted text-lg max-w-lg leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex items-center gap-8"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                <div>
                  <p className="mono-label text-[10px] uppercase text-text-faint mb-1">
                    {stat.label}
                  </p>
                  <p className="font-display text-3xl">{stat.value}</p>
                </div>
                {i === 0 && <span className="w-px h-10 bg-border-strong" />}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text text-bg font-medium text-sm hover:opacity-85 transition-opacity"
            >
              Hire Me
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border-strong text-text font-medium text-sm hover:bg-surface transition-colors"
              >
                Download Resume
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
