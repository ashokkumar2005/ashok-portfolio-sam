import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiGrid,
  FiUser,
  FiFolder,
  FiAward,
  FiMail,
  FiLogOut,
  FiMoon,
  FiSun,
  FiExternalLink,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin", label: "Overview", icon: FiGrid, end: true },
  { to: "/admin/profile", label: "Profile", icon: FiUser },
  { to: "/admin/projects", label: "Projects", icon: FiFolder },
  { to: "/admin/skills", label: "Skills & Education", icon: FiAward },
  { to: "/admin/messages", label: "Messages", icon: FiMail },
];

export default function AdminSidebar() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("admin-dark", dark);
  }, [dark]);

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-surface flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <p className="font-display text-xl">Admin</p>
        <p className="text-xs text-text-faint mt-0.5">
          {admin?.username ? `Signed in as ${admin.username}` : ""}
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                isActive
                  ? "bg-text text-bg font-medium"
                  : "text-text-muted hover:bg-white/5 hover:text-text"
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-muted hover:bg-white/5 hover:text-text transition-colors"
        >
          <FiExternalLink size={16} />
          View Site
        </a>
        <button
          onClick={() => setDark(!dark)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-muted hover:bg-white/5 hover:text-text transition-colors"
        >
          {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-accent-violet hover:bg-accent-violet/10 transition-colors"
        >
          <FiLogOut size={16} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
