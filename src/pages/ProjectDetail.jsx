import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiGithub, FiArrowUpRight } from "react-icons/fi";
import api from "../services/api";

const detailSections = [
  { key: "overview", title: "Overview" },
  { key: "problemStatement", title: "Problem Statement" },
  { key: "solution", title: "Solution" },
  { key: "architecture", title: "Architecture" },
  { key: "challenges", title: "Challenges" },
  { key: "futureImprovements", title: "Future Improvements" },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get(`/projects`)
      .then((res) => {
        if (!mounted) return;
        const match = (res.data || []).find((item) => item.slug === id || item._id === id || item.id === id);
        setProject(match || null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return <div className="min-h-screen pt-32 pb-24 px-6 text-text-muted">Loading project…</div>;
  }

  if (!project) return <Navigate to="/" replace />;

  const frontendHref = project.frontendUrl || project.githubUrl;
  const backendHref = project.backendUrl || project.githubUrl;

  return (
    <article className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to projects
        </Link>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-64 sm:h-80 rounded-3xl overflow-hidden glass mb-8"
        >
          <div className="absolute inset-0 bg-accent-cyan/90" />
          <div className="absolute bottom-6 left-8">
            <span className="mono-label text-[10px] uppercase px-3 py-1 rounded-full bg-bg/85 border border-border text-text">
              {project.status}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl mt-3 text-white">
              {project.name}
            </h1>
            {project.period && (
              <p className="text-xs text-white/80 mt-1">{project.period}</p>
            )}
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-3 py-1.5 rounded-full bg-surface border border-border text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap gap-3 mb-12">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text text-bg font-medium text-xs hover:opacity-85 transition-opacity"
            >
              <FiArrowUpRight size={14} /> Live Demo
            </a>
          )}
          {frontendHref && (
            <a
              href={frontendHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-strong text-text font-medium text-xs hover:bg-surface transition-colors"
            >
              <FiGithub size={14} /> Frontend Repo
            </a>
          )}
          {backendHref && (
            <a
              href={backendHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-strong text-text font-medium text-xs hover:bg-surface transition-colors"
            >
              <FiGithub size={14} /> Backend Repo
            </a>
          )}
        </div>

        <div className="space-y-12">
          {detailSections.map(
            (section) =>
              project[section.key] && (
                <motion.section
                  key={section.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="font-display font-semibold text-xl mb-3">
                    {section.title}
                  </h2>
                  <p className="text-text-muted leading-relaxed">
                    {project[section.key]}
                  </p>
                </motion.section>
              )
          )}

          {project.features?.length > 0 && (
            <section>
              <h2 className="font-display font-semibold text-xl mb-4">Features</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-text-muted text-sm glass rounded-xl p-3.5"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.gallery?.length > 0 && (
            <section>
              <h2 className="font-display font-semibold text-xl mb-4">Gallery</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.name} screenshot ${i + 1}`}
                    className="rounded-2xl border border-border"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
