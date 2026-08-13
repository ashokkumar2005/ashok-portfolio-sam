import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit2, FiX, FiSave } from "react-icons/fi";
import api from "../../services/api";
import ImageUploader from "../../components/admin/ImageUploader";

const emptyProject = {
  name: "",
  slug: "",
  period: "",
  shortDescription: "",
  stack: "",
  features: "",
  status: "Live",
  githubUrl: "",
  liveUrl: "",
  frontendUrl: "",
  backendUrl: "",
  bannerUrl: "",
  overview: "",
  problemStatement: "",
  solution: "",
  architecture: "",
  challenges: "",
  futureImprovements: "",
};

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")          // Replace spaces with -
    .replace(/[^\w-]+/g, "")        // Remove all non-word chars
    .replace(/--+/g, "-")           // Replace multiple - with single -
    .replace(/^-+/, "")             // Trim - from start
    .replace(/-+$/, "");            // Trim - from end
};

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | project object

  function load() {
    setLoading(true);
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    await api.delete(`/projects/${id}`);
    load();
  }

  if (editing) {
    return <ProjectForm project={editing === "new" ? null : editing} onDone={() => { setEditing(null); load(); }} onCancel={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl mb-1">Projects</h1>
          <p className="text-text-muted text-sm">Manage what shows up in your Projects section.</p>
        </div>
        <button
          onClick={() => setEditing("new")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text text-bg font-medium text-sm hover:opacity-85 transition-opacity"
        >
          <FiPlus size={16} /> New Project
        </button>
      </div>

      {loading ? (
        <p className="text-text-muted text-sm">Loading…</p>
      ) : projects.length === 0 ? (
        <p className="text-text-muted text-sm">No projects yet — add your first one.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => (
            <div key={p._id} className="glass rounded-2xl p-5 flex items-center justify-between">
              <div>
                <p className="font-display text-lg">{p.name}</p>
                <p className="text-text-muted text-xs mt-1">{p.status} · {(p.stack || []).join(", ")}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditing(p)}
                  className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center hover:bg-surface transition-colors"
                  aria-label="Edit"
                >
                  <FiEdit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center hover:bg-accent-violet/10 hover:text-accent-violet transition-colors"
                  aria-label="Delete"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectForm({ project, onDone, onCancel }) {
  const isEdit = Boolean(project);
  const [form, setForm] = useState(() =>
    isEdit
      ? { ...emptyProject, ...project, stack: (project.stack || []).join(", "), features: (project.features || []).join("\n") }
      : emptyProject
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      slug: slugify(form.slug || form.name),
      stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (isEdit) {
        await api.put(`/projects/${project._id}`, payload);
      } else {
        await api.post("/projects", payload);
      }
      onDone();
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">{isEdit ? "Edit Project" : "New Project"}</h1>
        <button onClick={onCancel} className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center hover:bg-surface transition-colors" aria-label="Cancel">
          <FiX size={16} />
        </button>
      </div>

      {error && (
        <p className="text-sm text-accent-violet bg-accent-violet/10 border border-accent-violet/30 rounded-lg px-4 py-3 mb-6">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
        <ImageUploader label="Banner Image" value={form.bannerUrl} onChange={(url) => update("bannerUrl", url)} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Name" value={form.name} onChange={(v) => update("name", v)} required />
          <Field label="Slug (URL path)" value={form.slug} onChange={(v) => update("slug", v)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Period" value={form.period} onChange={(v) => update("period", v)} />
          <div>
            <label className="text-xs text-text-faint mono-label uppercase">Status</label>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="mt-1.5 w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-cyan/60 transition-colors"
            >
              <option>Live</option>
              <option>In Progress</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        <TextArea label="Short Description" value={form.shortDescription} onChange={(v) => update("shortDescription", v)} rows={2} />
        <Field label="Tech Stack (comma separated)" value={form.stack} onChange={(v) => update("stack", v)} />
        <TextArea label="Features (one per line)" value={form.features} onChange={(v) => update("features", v)} rows={4} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="GitHub URL" value={form.githubUrl} onChange={(v) => update("githubUrl", v)} />
          <Field label="Live Demo URL" value={form.liveUrl} onChange={(v) => update("liveUrl", v)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Frontend GitHub URL" value={form.frontendUrl} onChange={(v) => update("frontendUrl", v)} />
          <Field label="Backend GitHub URL" value={form.backendUrl} onChange={(v) => update("backendUrl", v)} />
        </div>

        <TextArea label="Overview" value={form.overview} onChange={(v) => update("overview", v)} />
        <TextArea label="Problem Statement" value={form.problemStatement} onChange={(v) => update("problemStatement", v)} />
        <TextArea label="Solution" value={form.solution} onChange={(v) => update("solution", v)} />
        <TextArea label="Architecture" value={form.architecture} onChange={(v) => update("architecture", v)} />
        <TextArea label="Challenges" value={form.challenges} onChange={(v) => update("challenges", v)} />
        <TextArea label="Future Improvements" value={form.futureImprovements} onChange={(v) => update("futureImprovements", v)} />

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text text-bg font-medium text-sm hover:opacity-85 transition-opacity disabled:opacity-50"
        >
          <FiSave size={16} />
          {saving ? "Saving…" : "Save Project"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, required }) {
  return (
    <div>
      <label className="text-xs text-text-faint mono-label uppercase">{label}</label>
      <input
        required={required}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-cyan/60 transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <div>
      <label className="text-xs text-text-faint mono-label uppercase">{label}</label>
      <textarea
        rows={rows}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-cyan/60 transition-colors resize-none"
      />
    </div>
  );
}
