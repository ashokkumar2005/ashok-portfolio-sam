import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiUsers, FiBookOpen, FiStar } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import { useProfile } from "../context/ProfileContext";

export default function GitHubShowcase() {
  const { profile } = useProfile();
  const [data, setData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(false);

  const username = profile?.socials?.github
    ? profile.socials.github.split("/").filter(Boolean).pop()
    : "";

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");
        const user = await userRes.json();
        const reposJson = await reposRes.json();
        if (!cancelled) {
          setData(user);
          setRepos(Array.isArray(reposJson) ? reposJson : []);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

  const stats = [
    { label: "Followers", value: data?.followers ?? "—", icon: FiUsers },
    { label: "Repositories", value: data?.public_repos ?? "—", icon: FiBookOpen },
    { label: "Stars", value: error ? "—" : totalStars, icon: FiStar },
  ];

  return (
    <section id="github" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading number="05" eyebrow="GitHub" title="Where the code lives" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 rounded-3xl p-8 sm:p-10 glass border-gradient overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent-violet/20 blur-[100px]" />

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden glass shrink-0">
                {data?.avatar_url ? (
                  <img
                    src={data.avatar_url}
                    alt={`${username} GitHub avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiGithub size={24} className="text-text-muted" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-display font-semibold text-xl">
                  @{username}
                </p>
                <p className="text-text-muted text-sm">
                  {data?.bio || "Full Stack MERN Developer"}
                </p>
              </div>
            </div>

            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:border-border-strong transition-colors shrink-0 w-fit"
            >
              <FiGithub className="group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium">View Profile</span>
            </a>
          </div>

          <div className="relative grid grid-cols-3 gap-4 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-surface/60 border border-border p-5 text-center"
              >
                <stat.icon className="mx-auto mb-2 text-accent-cyan" size={18} />
                <div className="font-mono text-2xl font-semibold">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted mono-label uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {repos.length > 0 && (
            <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {repos.slice(0, 6).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-surface/60 border border-border p-4 hover:border-border-strong transition-colors"
                >
                  <p className="font-mono text-sm truncate">{repo.name}</p>
                  <p className="text-text-muted text-xs mt-1 flex items-center gap-1">
                    <FiStar size={12} /> {repo.stargazers_count}
                    {repo.language && <span className="ml-2">{repo.language}</span>}
                  </p>
                </a>
              ))}
            </div>
          )}

          {error && (
            <p className="relative text-text-faint text-xs mt-6 font-mono">
              Live stats unavailable right now — showing profile link only.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
