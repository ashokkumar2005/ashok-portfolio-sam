import { useEffect, useState } from 'react';
import Navbar   from '../components/Navbar';
import Hero     from '../components/Hero';
import About    from '../components/About';
import Skills   from '../components/Skills';
import Projects from '../components/Projects';
import Address  from '../components/Address';
import Contact  from '../components/Contact';
import Footer   from '../components/Footer';
import { getUsers, getProjects } from '../api';

export default function Home() {
  const [profile,  setProfile]  = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ USE CORRECT FUNCTIONS
        const [profileData, projectData] = await Promise.all([
          getUsers(),
          getProjects()
        ]);

        setProfile(profileData);
        setProjects(projectData);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center',
        justifyContent:'center', background:'var(--bg)', flexDirection:'column', gap:16 }}>
        <div className="spinner" style={{ width:40, height:40, borderWidth:3 }} />
        <div style={{ fontFamily:'var(--font-code)', fontSize:'0.88rem', color:'var(--text-muted)' }}>
          Loading portfolio...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <Navbar profileName={profile?.name} />
      <Hero    profile={profile} />
      <About   profile={profile} />
      <Skills  profile={profile} />
      {projects.length > 0 && <Projects projects={projects} />}
      <Address profile={profile} />
      <Contact profile={profile} />
      <Footer  profile={profile} />
    </>
  );
}
