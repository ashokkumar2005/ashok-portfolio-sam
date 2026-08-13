import { useEffect, useState } from "react";
import { FiFolder, FiMail, FiAward } from "react-icons/fi";
import api from "../../services/api";

export default function AdminOverview() {
  const [counts, setCounts] = useState({ projects: null, messages: null, skills: null });
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.get("/projects"), api.get("/contact"), api.get("/skills")])
      .then(([projects, messages, skills]) => {
        setCounts({
          projects: projects.data.length,
          messages: messages.data.length,
          skills: skills.data.length,
        });
      })
      .catch((err) => setError(err.response?.data?.message || "Could not load dashboard data."));
  }, []);

  const cards = [
    { label: "Projects", value: counts.projects, icon: FiFolder, to: "/admin/projects" },
    { label: "Unread-checkable Messages", value: counts.messages, icon: FiMail, to: "/admin/messages" },
    { label: "Skill Categories", value: counts.skills, icon: FiAward, to: "/admin/skills" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl mb-1">Overview</h1>
      <p className="text-text-muted text-sm mb-8">
        A snapshot of what's currently live on your portfolio.
      </p>

      {error && (
        <p className="text-sm text-accent-violet bg-accent-violet/10 border border-accent-violet/30 rounded-lg px-4 py-3 mb-6">
          {error} — make sure the backend is running and{" "}
          <code className="font-mono">VITE_API_URL</code> points to it.
        </p>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="glass rounded-2xl p-6">
            <card.icon className="text-accent-cyan mb-3" size={20} />
            <p className="font-display text-3xl">{card.value ?? "—"}</p>
            <p className="text-xs text-text-faint mono-label uppercase mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
