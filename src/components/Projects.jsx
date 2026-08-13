import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { useProfile } from "../context/ProfileContext";

export default function Projects() {
  const { projects, loading } = useProfile();

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          number="03"
          eyebrow="Projects"
          title="Things I've built"
          description="Full-stack builds, end to end — data model, API, and interface."
        />

        {loading ? (
          <p className="mt-12 text-sm text-text-muted">Loading projects…</p>
        ) : projects.length === 0 ? (
          <p className="mt-12 text-sm text-text-muted">No projects available right now.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            {projects.map((project, i) => (
              <ProjectCard project={project} index={i} key={project._id || project.id || project.slug} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
