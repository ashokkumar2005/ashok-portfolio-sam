import { useEffect, useState } from "react";
import { FiTrash2, FiMail, FiCheckCircle } from "react-icons/fi";
import api from "../../services/api";

export default function MessagesInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    api.get("/contact").then((res) => setMessages(res.data)).finally(() => setLoading(false));
  }
  useEffect(load, []);

  async function markRead(id) {
    await api.patch(`/contact/${id}/read`);
    load();
  }

  async function remove(id) {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/contact/${id}`);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-1">Messages</h1>
      <p className="text-text-muted text-sm mb-8">Submissions from your Contact form.</p>

      {loading ? (
        <p className="text-text-muted text-sm">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="text-text-muted text-sm">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m._id} className={`glass rounded-2xl p-5 ${m.read ? "opacity-70" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{m.name} <span className="text-text-faint font-normal">— {m.email}</span></p>
                  <p className="text-text-muted text-sm mt-2 leading-relaxed">{m.message}</p>
                  <p className="text-text-faint text-xs mt-2">{new Date(m.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => markRead(m._id)}
                    disabled={m.read}
                    className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center hover:bg-surface transition-colors disabled:opacity-40"
                    aria-label="Mark read"
                  >
                    {m.read ? <FiCheckCircle size={14} /> : <FiMail size={14} />}
                  </button>
                  <button
                    onClick={() => remove(m._id)}
                    className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center hover:bg-accent-violet/10 hover:text-accent-violet transition-colors"
                    aria-label="Delete"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
