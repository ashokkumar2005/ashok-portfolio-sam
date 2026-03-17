const API = import.meta.env.VITE_API_URL;

// Debug (optional - remove later)
console.log("API URL:", API);

// ✅ GET PROFILE (users)
export const getUsers = async () => {
  const res = await fetch(`${API}/api/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

// ✅ GET PROJECTS
export const getProjects = async () => {
  const res = await fetch(`${API}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

// ✅ LOGIN (if using auth)
export const login = async (data) => {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
};
