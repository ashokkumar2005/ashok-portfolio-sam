import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import TiltCard from "./TiltCard";

export default function ProjectCard({ project, index }) {
  const frontendHref = project.frontendUrl || project.githubUrl;
  const backendHref = project.backendUrl || project.githubUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1 }}
    >
      <TiltCard intensity={5}>
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="group glass rounded-3xl overflow-hidden hover:border-border-strong hover:shadow-2xl transition-[border-color,box-shadow]"
        >
      <div className="relative h-52 bg-surface-2 overflow-hidden">
        <div className="absolute inset-0 bg-accent-cyan/90" />
        <span className="absolute top-4 right-4 mono-label text-[10px] uppercase px-3 py-1 rounded-full bg-bg/85 border border-border text-text">
          {project.status}
        </span>
        <span className="absolute bottom-4 left-5 font-display text-2xl text-white">
          {project.name}
        </span>
      </div>

      <div className="p-6">
        <p className="text-text-muted text-sm leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-surface border border-border text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.liveUrl || frontendHref || backendHref || project.id || project._id || project.slug) && (
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent-cyan text-bg text-sm font-medium hover:opacity-85 transition-opacity"
              >
                <FiArrowUpRight size={14} /> Live Demo
              </a>
            )}

            {frontendHref && (
              <a
                href={frontendHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium text-text hover:border-accent-cyan hover:text-accent-cyan transition-colors"
              >
                <FiGithub size={14} /> Frontend Repo
              </a>
            )}

            {backendHref && (
              <a
                href={backendHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium text-text hover:border-accent-cyan hover:text-accent-cyan transition-colors"
              >
                <FiGithub size={14} /> Backend Repo
              </a>
            )}

            <Link
              to={`/projects/${project.id || project._id || project.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent-cyan text-bg text-sm font-medium hover:opacity-85 transition-opacity"
            >
              <FiArrowUpRight size={14} /> Details
            </Link>
          </div>
        )}
      </div>
        </motion.article>
      </TiltCard>
    </motion.div>
  );
}
