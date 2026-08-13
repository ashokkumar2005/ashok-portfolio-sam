import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm glass rounded-3xl p-8"
      >
        <div className="w-11 h-11 rounded-xl bg-text text-bg flex items-center justify-center mb-6">
          <FiLock size={18} />
        </div>
        <h1 className="font-display text-2xl mb-1">Admin Login</h1>
        <p className="text-text-muted text-sm mb-6">Sign in to manage your portfolio.</p>

        {error && (
          <p className="text-sm text-accent-violet bg-accent-violet/10 border border-accent-violet/30 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="text-xs text-text-faint mono-label uppercase">
              Username
            </label>
            <input
              id="username"
              required
              autoFocus
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="mt-1.5 w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-cyan/60 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs text-text-faint mono-label uppercase">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1.5 w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent-cyan/60 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 rounded-full bg-text text-bg font-medium text-sm hover:opacity-85 transition-opacity disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </motion.form>
    </div>
  );
}
