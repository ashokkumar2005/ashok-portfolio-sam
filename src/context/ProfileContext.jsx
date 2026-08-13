import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import {
  profile as staticProfile,
  skills as staticSkills,
  education as staticEducation,
  projects as staticProjects,
} from "../data/profile";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(staticProfile);
  const [skills, setSkills] = useState(staticSkills);
  const [education, setEducation] = useState(staticEducation);
  const [projects, setProjects] = useState(staticProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      api.get("/profile").then((res) => res.data).catch(() => null),
      api.get("/skills").then((res) => res.data).catch(() => null),
      api.get("/education").then((res) => res.data).catch(() => null),
      api.get("/projects").then((res) => res.data).catch(() => null),
    ])
      .then(([prof, sks, edu, projs]) => {
        if (!mounted) return;
        if (prof) {
          setProfile((prev) => ({
            ...prev,
            ...prof,
            socials: { ...prev.socials, ...prof.socials },
          }));
        }
        if (sks && sks.length > 0) {
          setSkills(sks);
        }
        if (edu && edu.length > 0) {
          setEducation(edu);
        }
        if (projs && projs.length > 0) {
          setProjects(projs);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, skills, education, projects, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
