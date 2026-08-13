import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import api from "../../services/api";
import ImageUploader from "../../components/admin/ImageUploader";

const emptyProfile = {
  name: "",
  roles: [],
  tagline: "",
  summary: "",
  location: "",
  email: "",
  phone: "",
  avatarUrl: "",
  resumeUrl: "",
  socials: { github: "", linkedin: "", portfolio: "", whatsapp: "" },
};

export default function ProfileEditor() {
  const [form, setForm] = useState(emptyProfile);
  const [rolesText, setRolesText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    api
      .get("/profile")
      .then((res) => {
        setForm({ ...emptyProfile, ...res.data, socials: { ...emptyProfile.socials, ...res.data.socials } });
        setRolesText((res.data.roles || []).join(", "));
      })
      .finally(() => setLoading(false));
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateSocial(field, value) {
    setForm((f) => ({ ...f, socials: { ...f.socials, [field]: value } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    try {
      const payload = { ...form, roles: rolesText.split(",").map((r) => r.trim()).filter(Boolean) };
      await api.put("/profile", payload);
      setStatus("saved");
    } catch (err) {
      setStatus(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-text-muted text-sm">Loading profile…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl mb-1">Profile</h1>
      <p className="text-text-muted text-sm mb-8">
        Everything here feeds the Hero, About, and Contact sections on the live site.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <ImageUploader
          label="Avatar / Hero Photo"
          value={form.avatarUrl}
          onChange={(url) => update("avatarUrl", url)}
        />

        <Field label="Name" value={form.name} onChange={(v) => update("name", v)} required />
        <Field
          label="Roles (comma separated — powers the typing effect)"
          value={rolesText}
          onChange={setRolesText}
        />
        <Field label="Tagline" value={form.tagline} onChange={(v) => update("tagline", v)} />
        <TextArea label="Summary" value={form.summary} onChange={(v) => update("summary", v)} />

        <div className="grid grid-cols-2 gap-4">
          <Field label="Email" value={form.email} onChange={(v) => update("email", v)} />
          <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
        </div>
        <Field label="Location" value={form.location} onChange={(v) => update("location", v)} />

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-text-faint mono-label uppercase mb-3">Resume</p>
          <ImageUploader
            label="Resume PDF"
            value={form.resumeUrl}
            onChange={(url) => update("resumeUrl", url)}
            accept="application/pdf"
            uploadLabel="Upload Resume PDF"
            preview={false}
          />
          <Field
            label="Resume URL"
            value={form.resumeUrl}
            onChange={(v) => update("resumeUrl", v)}
            placeholder="https://.../resume.pdf"
          />
          <p className="text-xs text-text-faint mt-2">
            Upload a PDF resume here and the download button will use that file automatically.
          </p>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-text-faint mono-label uppercase mb-3">Social Links</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="GitHub" value={form.socials.github} onChange={(v) => updateSocial("github", v)} />
            <Field label="LinkedIn" value={form.socials.linkedin} onChange={(v) => updateSocial("linkedin", v)} />
            <Field label="Portfolio URL" value={form.socials.portfolio} onChange={(v) => updateSocial("portfolio", v)} />
            <Field label="WhatsApp" value={form.socials.whatsapp} onChange={(v) => updateSocial("whatsapp", v)} />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text text-bg font-medium text-sm hover:opacity-85 transition-opacity disabled:opacity-50"
        >
          <FiSave size={16} />
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {status === "saved" && <span className="ml-3 text-sm text-accent-cyan">Saved.</span>}
        {status && status !== "saved" && <span className="ml-3 text-sm text-accent-violet">{status}</span>}
      </form>
    </div>
  );
}

function Field({ label, value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="text-xs text-text-faint mono-label uppercase">{label}</label>
      <input
        required={required}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-cyan/60 transition-colors"
      />
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs text-text-faint mono-label uppercase">{label}</label>
      <textarea
        rows={4}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-cyan/60 transition-colors resize-none"
      />
    </div>
  );
}
