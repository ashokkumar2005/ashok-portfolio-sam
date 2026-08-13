import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import api from "../../services/api";

export default function SkillsEducationManager() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl mb-1">Skills & Education</h1>
        <p className="text-text-muted text-sm">Grouped skill categories and your education timeline.</p>
      </div>
      <SkillsSection />
      <EducationSection />
    </div>
  );
}

function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    api.get("/skills").then((res) => setSkills(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function addCategory() {
    await api.post("/skills", { category: "New Category", items: [] });
    load();
  }

  async function saveCategory(skill) {
    await api.put(`/skills/${skill._id}`, {
      category: skill.category,
      items: skill.itemsText.split(",").map((s) => s.trim()).filter(Boolean),
    });
    load();
  }

  async function remove(id) {
    if (!confirm("Delete this skill category?")) return;
    await api.delete(`/skills/${id}`);
    load();
  }

  if (loading) return <p className="text-text-muted text-sm">Loading skills…</p>;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl">Skill Categories</h2>
        <button
          onClick={addCategory}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong text-sm hover:bg-surface transition-colors"
        >
          <FiPlus size={14} /> Add Category
        </button>
      </div>
      <div className="space-y-3">
        {skills.map((s) => (
          <SkillRow key={s._id} skill={s} onSave={saveCategory} onDelete={() => remove(s._id)} />
        ))}
      </div>
    </section>
  );
}

function SkillRow({ skill, onSave, onDelete }) {
  const [category, setCategory] = useState(skill.category);
  const [itemsText, setItemsText] = useState((skill.items || []).join(", "));

  return (
    <div className="glass rounded-2xl p-4 grid sm:grid-cols-[1fr_2fr_auto] gap-3 items-start">
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-surface border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
      />
      <input
        value={itemsText}
        onChange={(e) => setItemsText(e.target.value)}
        placeholder="Comma-separated items"
        className="bg-surface border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-accent-cyan/60"
      />
      <div className="flex gap-2">
        <button
          onClick={() => onSave({ _id: skill._id, category, itemsText })}
          className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center hover:bg-surface"
          aria-label="Save"
        >
          <FiSave size={14} />
        </button>
        <button
          onClick={onDelete}
          className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center hover:bg-accent-violet/10 hover:text-accent-violet"
          aria-label="Delete"
        >
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
}

function EducationSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    api.get("/education").then((res) => setItems(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function addItem() {
    await api.post("/education", { degree: "New Degree", school: "School Name", period: "" });
    load();
  }

  async function saveItem(item) {
    await api.put(`/education/${item._id}`, {
      degree: item.degree,
      school: item.school,
      period: item.period,
    });
    load();
  }

  async function remove(id) {
    if (!confirm("Delete this education entry?")) return;
    await api.delete(`/education/${id}`);
    load();
  }

  if (loading) return <p className="text-text-muted text-sm">Loading education…</p>;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl">Education</h2>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong text-sm hover:bg-surface transition-colors"
        >
          <FiPlus size={14} /> Add Entry
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <EducationRow key={item._id} item={item} onSave={saveItem} onDelete={() => remove(item._id)} />
        ))}
      </div>
    </section>
  );
}

function EducationRow({ item, onSave, onDelete }) {
  const [degree, setDegree] = useState(item.degree);
  const [school, setSchool] = useState(item.school);
  const [period, setPeriod] = useState(item.period || "");

  return (
    <div className="glass rounded-2xl p-4 grid sm:grid-cols-[2fr_1.5fr_1fr_auto] gap-3 items-start">
      <input value={degree} onChange={(e) => setDegree(e.target.value)} className="bg-surface border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-accent-cyan/60" />
      <input value={school} onChange={(e) => setSchool(e.target.value)} className="bg-surface border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-accent-cyan/60" />
      <input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="2022 — 2026" className="bg-surface border border-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-accent-cyan/60" />
      <div className="flex gap-2">
        <button onClick={() => onSave({ _id: item._id, degree, school, period })} className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center hover:bg-surface" aria-label="Save">
          <FiSave size={14} />
        </button>
        <button onClick={onDelete} className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center hover:bg-accent-violet/10 hover:text-accent-violet" aria-label="Delete">
          <FiTrash2 size={14} />
        </button>
      </div>
    </div>
  );
}
