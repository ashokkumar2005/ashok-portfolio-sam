const API = import.meta.env.VITE_API_URL;

// ✅ USERS
export const getUsers = async () => {
  const res = await fetch(`${API}/api/users`);
  return res.json();
};

// ✅ PROJECTS
export const getProjects = async () => {
  const res = await fetch(`${API}/api/projects`);
  return res.json();
};
