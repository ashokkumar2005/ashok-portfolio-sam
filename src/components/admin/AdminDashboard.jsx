import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`toast ${type}`}>
      {type === 'success' ? '✓' : '✕'} {msg}
    </div>
  );
}

// ── Sidebar Nav Item ──────────────────────────────────────────────────────────
function NavItem({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      width:'100%', padding:'11px 16px', borderRadius:8,
      display:'flex', alignItems:'center', gap:10,
      background: active ? 'var(--primary-g)' : 'transparent',
      border: active ? '1px solid var(--border-h)' : '1px solid transparent',
      color: active ? 'var(--primary)' : 'var(--text-muted)',
      fontFamily:'var(--font-code)', fontSize:'0.82rem',
      cursor:'pointer', transition:'all 0.2s', textAlign:'left'
    }}>
      <span style={{ fontSize:'1rem' }}>{icon}</span> {label}
    </button>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Panel({ title, subtitle, children }) {
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontFamily:'var(--font-head)', fontSize:'1.5rem', fontWeight:800, color:'var(--text)' }}>
          {title}
        </h2>
        {subtitle && <p style={{ color:'var(--text-muted)', fontSize:'0.88rem', marginTop:4 }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const [tab, setTab]           = useState('profile');
  const [profile, setProfile]   = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState(null);
  const [editProj, setEditProj] = useState(null);  // null = add mode, obj = edit mode
  const [showProjForm, setShowProjForm] = useState(false);

  const imgRef    = useRef();
  const resumeRef = useRef();

  const showToast = (msg, type = 'success') => setToast({ msg, type });

  useEffect(() => {
    (async () => {
      try {
        const [p, j] = await Promise.all([api.get('/profile'), api.get('/projects')]);
        setProfile(p.data);
        setProjects(j.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Save Profile ────────────────────────────────────────────────────────────
  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await api.put('/profile', profile);
      setProfile(res.data);
      showToast('Profile saved successfully!');
    } catch (err) {
      showToast(err.response?.data?.error || 'Save failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Upload Image ────────────────────────────────────────────────────────────
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append('profileImage', file);
    setSaving(true);
    try {
      const res = await api.post('/profile/upload-image', fd);
      setProfile(p => ({ ...p, profileImage: res.data.profileImage }));
      showToast('Profile image updated!');
    } catch (err) {
      showToast(err.response?.data?.error || 'Upload failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Upload Resume ───────────────────────────────────────────────────────────
  const uploadResume = async (file) => {
    const fd = new FormData();
    fd.append('resume', file);
    setSaving(true);
    try {
      const res = await api.post('/profile/upload-resume', fd);
      setProfile(p => ({ ...p, resume: res.data.resume }));
      showToast('Resume uploaded!');
    } catch (err) {
      showToast(err.response?.data?.error || 'Upload failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Project CRUD ────────────────────────────────────────────────────────────
  const saveProject = async (data, imageFile) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k,v]) => {
      if (k === 'tech') fd.append(k, Array.isArray(v) ? v.join(',') : v);
      else fd.append(k, v);
    });
    if (imageFile) fd.append('image', imageFile);
    setSaving(true);
    try {
      let res;
      if (editProj?._id) {
        res = await api.put(`/projects/${editProj._id}`, fd);
        setProjects(ps => ps.map(p => p._id === res.data._id ? res.data : p));
        showToast('Project updated!');
      } else {
        res = await api.post('/projects', fd);
        setProjects(ps => [...ps, res.data]);
        showToast('Project added!');
      }
      setShowProjForm(false); setEditProj(null);
    } catch (err) {
      showToast(err.response?.data?.error || 'Failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(ps => ps.filter(p => p._id !== id));
      showToast('Project deleted');
    } catch (err) {
      showToast(err.response?.data?.error || 'Delete failed', 'error');
    }
  };

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center', background:'var(--bg)' }}>
      <div className="spinner" style={{ width:36, height:36, borderWidth:3 }} />
    </div>
  );

  const navItems = [
    { id:'profile',  label:'Edit Profile',  icon:'👤' },
    { id:'skills',   label:'Edit Skills',   icon:'⚡' },
    { id:'media',    label:'Photo & Resume', icon:'📁' },
    { id:'projects', label:'Projects',      icon:'🚀' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex' }}>
      <div className="grid-bg" />

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside style={{ width:240, background:'var(--bg-2)', borderRight:'1px solid var(--border)',
        padding:'24px 16px', position:'fixed', top:0, bottom:0, left:0, zIndex:10,
        display:'flex', flexDirection:'column', gap:4 }}>
        {/* Logo */}
        <div style={{ padding:'12px 4px 24px', borderBottom:'1px solid var(--border)', marginBottom:8 }}>
          <div style={{ fontFamily:'var(--font-code)', fontSize:'0.88rem', color:'var(--primary)' }}>
            Admin Panel
          </div>
          <div style={{ fontFamily:'var(--font-head)', fontSize:'1rem', fontWeight:700, color:'var(--text)', marginTop:2 }}>
            {profile?.name?.split(' ')[0] || 'Ashokkumar'}
          </div>
        </div>

        {navItems.map(n => (
          <NavItem key={n.id} {...n} active={tab === n.id} onClick={() => setTab(n.id)} />
        ))}

        <div style={{ marginTop:'auto', paddingTop:16, borderTop:'1px solid var(--border)', display:'flex', flexDirection:'column', gap:8 }}>
          <button className="btn btn-ghost" style={{ width:'100%', justifyContent:'center', fontSize:'0.78rem' }}
            onClick={() => navigate('/')}>
            ← View Site
          </button>
          <button className="btn btn-ghost" style={{ width:'100%', justifyContent:'center', fontSize:'0.78rem',
            color:'#f87171', borderColor:'rgba(248,113,113,0.2)' }}
            onClick={() => { logout(); navigate('/'); }}>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <main style={{ marginLeft:240, flex:1, padding:'40px 40px', maxWidth:900, position:'relative', zIndex:1 }}>

        {/* ── PROFILE TAB ────────────────────────────────────────────────── */}
        {tab === 'profile' && (
          <Panel title="Edit Profile" subtitle="Update your name, role, bio, address and contact details.">
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div className="form-group">
                <label className="label">Full Name</label>
                <input className="input" value={profile.name || ''}
                  onChange={e => setProfile({...profile, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="label">Role / Title</label>
                <input className="input" value={profile.role || ''}
                  onChange={e => setProfile({...profile, role: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label className="label">Short Bio (Hero section)</label>
              <textarea className="input" value={profile.bio || ''}
                onChange={e => setProfile({...profile, bio: e.target.value})} rows={3} />
            </div>
            <div className="form-group">
              <label className="label">About Me (Full paragraph)</label>
              <textarea className="input" value={profile.about || ''}
                onChange={e => setProfile({...profile, about: e.target.value})} rows={5}
                placeholder="Detailed about me description..." />
            </div>

            <div className="card" style={{ marginBottom:20, padding:'20px 20px 8px' }}>
              <div style={{ fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--primary)',
                marginBottom:14, letterSpacing:'0.1em', textTransform:'uppercase' }}>Address</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {[
                  ['street','Street'],['post','Post / Area'],
                  ['district','District'],['state','State'],
                  ['pincode','Pincode'],['country','Country'],
                ].map(([k,l]) => (
                  <div key={k} className="form-group" style={{ marginBottom:8 }}>
                    <label className="label">{l}</label>
                    <input className="input" value={profile.address?.[k] || ''}
                      onChange={e => setProfile({...profile, address: {...profile.address, [k]: e.target.value}})} />
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ marginBottom:20, padding:'20px 20px 8px' }}>
              <div style={{ fontFamily:'var(--font-code)', fontSize:'0.78rem', color:'var(--primary)',
                marginBottom:14, letterSpacing:'0.1em', textTransform:'uppercase' }}>Contact</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {[['email','Email'],['github','GitHub URL'],['location','Location']].map(([k,l]) => (
                  <div key={k} className="form-group" style={{ marginBottom:8 }}>
                    <label className="label">{l}</label>
                    <input className="input" value={profile.contact?.[k] || ''}
                      onChange={e => setProfile({...profile, contact: {...profile.contact, [k]: e.target.value}})} />
                  </div>
                ))}
              </div>
            </div>

            <button className="btn btn-primary" onClick={saveProfile} disabled={saving}>
              {saving ? <><div className="spinner" />Saving...</> : '✓ Save Profile'}
            </button>
          </Panel>
        )}

        {/* ── SKILLS TAB ─────────────────────────────────────────────────── */}
        {tab === 'skills' && (
          <Panel title="Edit Skills" subtitle="Manage skill tags for each category.">
            {[
              ['frontend','Frontend'],['backend','Backend'],
              ['database','Database'],['features','Backend Features'],['tools','Tools']
            ].map(([k, label]) => (
              <div key={k} className="card" style={{ marginBottom:16, padding:'22px 24px' }}>
                <label className="label" style={{ fontSize:'0.85rem', marginBottom:10 }}>{label}</label>
                <input className="input"
                  value={(profile.skills?.[k] || []).join(', ')}
                  onChange={e => {
                    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setProfile({...profile, skills: {...profile.skills, [k]: arr }});
                  }}
                  placeholder="Skill 1, Skill 2, Skill 3..." />
                <div style={{ marginTop:10, display:'flex', flexWrap:'wrap', gap:6 }}>
                  {(profile.skills?.[k] || []).map((s,i) => (
                    <span key={i} className="tag" style={{ fontSize:'0.72rem' }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
            <button className="btn btn-primary" onClick={saveProfile} disabled={saving}>
              {saving ? <><div className="spinner" />Saving...</> : '✓ Save Skills'}
            </button>
          </Panel>
        )}

        {/* ── MEDIA TAB ──────────────────────────────────────────────────── */}
        {tab === 'media' && (
          <Panel title="Photo & Resume" subtitle="Upload your profile picture and resume PDF.">
            <input ref={imgRef} type="file" accept="image/*" style={{ display:'none' }}
              onChange={e => e.target.files[0] && uploadImage(e.target.files[0])} />
            <input ref={resumeRef} type="file" accept=".pdf" style={{ display:'none' }}
              onChange={e => e.target.files[0] && uploadResume(e.target.files[0])} />

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              {/* Profile Image */}
              <div className="card" style={{ padding:'28px', textAlign:'center' }}>
                <div style={{ width:100, height:100, borderRadius:'50%', overflow:'hidden',
                  margin:'0 auto 16px', border:'2px solid var(--border-h)',
                  background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {profile.profileImage ? (
                    <img src={profile.profileImage} alt="Profile"
                      style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  ) : (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
                    </svg>
                  )}
                </div>
                <div style={{ fontFamily:'var(--font-head)', fontWeight:600, marginBottom:6, color:'var(--text)' }}>
                  Profile Photo
                </div>
                <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', marginBottom:16 }}>
                  JPG, PNG, WebP · Max 5MB
                </div>
                <button className="btn btn-outline" style={{ width:'100%', justifyContent:'center' }}
                  onClick={() => imgRef.current.click()} disabled={saving}>
                  📷 Upload Photo
                </button>
              </div>

              {/* Resume */}
              <div className="card" style={{ padding:'28px', textAlign:'center' }}>
                <div style={{ width:100, height:100, borderRadius:16,
                  margin:'0 auto 16px', border:'2px solid var(--border-h)',
                  background:'var(--bg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={profile.resume ? 'var(--primary)' : 'var(--text-muted)'} strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div style={{ fontFamily:'var(--font-head)', fontWeight:600, marginBottom:6, color:'var(--text)' }}>
                  Resume PDF
                </div>
                <div style={{ fontSize:'0.8rem', color: profile.resume ? 'var(--accent2)' : 'var(--text-muted)', marginBottom:16 }}>
                  {profile.resume ? '✓ Resume uploaded' : 'PDF only · Max 5MB'}
                </div>
                <button className="btn btn-outline" style={{ width:'100%', justifyContent:'center' }}
                  onClick={() => resumeRef.current.click()} disabled={saving}>
                  📄 Upload Resume
                </button>
              </div>
            </div>
          </Panel>
        )}

        {/* ── PROJECTS TAB ───────────────────────────────────────────────── */}
        {tab === 'projects' && (
          <Panel title="Projects" subtitle="Add, edit or delete portfolio projects.">
            <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
              <button className="btn btn-primary"
                onClick={() => { setEditProj(null); setShowProjForm(true); }}>
                + Add Project
              </button>
            </div>

            {/* Project Form */}
            {showProjForm && (
              <ProjectForm
                initial={editProj}
                onSave={saveProject}
                onCancel={() => { setShowProjForm(false); setEditProj(null); }}
                saving={saving}
              />
            )}

            {/* Projects List */}
            {projects.length === 0 && !showProjForm && (
              <div className="card" style={{ textAlign:'center', padding:'48px', color:'var(--text-muted)' }}>
                <div style={{ fontSize:'3rem', marginBottom:12 }}>🚀</div>
                <div style={{ fontFamily:'var(--font-code)', fontSize:'0.88rem' }}>
                  No projects yet. Add your first project!
                </div>
              </div>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:12, marginTop: showProjForm ? 20 : 0 }}>
              {projects.map(proj => (
                <div key={proj._id} className="card" style={{ padding:'18px 20px',
                  display:'flex', alignItems:'center', gap:16 }}>
                  {proj.image && (
                    <img src={proj.image} alt={proj.title}
                      style={{ width:56, height:56, objectFit:'cover', borderRadius:8,
                        border:'1px solid var(--border)', flexShrink:0 }} />
                  )}
                  <div style={{ flex:1, overflow:'hidden' }}>
                    <div style={{ fontFamily:'var(--font-head)', fontWeight:600, color:'var(--text)' }}>
                      {proj.title}
                    </div>
                    <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', marginTop:3,
                      overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {proj.description}
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:8 }}>
                      {proj.tech?.slice(0,4).map((t,i) => (
                        <span key={i} className="tag" style={{ fontSize:'0.68rem', padding:'2px 8px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                    <button className="btn btn-ghost" style={{ padding:'6px 12px' }}
                      onClick={() => { setEditProj(proj); setShowProjForm(true); }}>
                      Edit
                    </button>
                    <button className="btn btn-ghost"
                      style={{ padding:'6px 12px', color:'#f87171', borderColor:'rgba(248,113,113,0.2)' }}
                      onClick={() => deleteProject(proj._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        )}
      </main>

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── Project Form ──────────────────────────────────────────────────────────────
function ProjectForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm]   = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    tech: initial?.tech?.join(', ') || '',
    github: initial?.github || '',
    demo: initial?.demo || '',
    order: initial?.order || 0,
  });
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(initial?.image || '');
  const fileRef = useRef();

  const handleImg = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImgFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form, imgFile);
  };

  return (
    <div className="card" style={{ padding:'28px 24px', marginBottom:20,
      border:'1px solid var(--border-h)' }}>
      <h3 style={{ fontFamily:'var(--font-head)', fontWeight:700, marginBottom:20, color:'var(--text)' }}>
        {initial ? 'Edit Project' : 'Add New Project'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <div className="form-group">
            <label className="label">Project Name *</label>
            <input className="input" value={form.title} required
              onChange={e => setForm({...form, title: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="label">Tech Stack (comma separated)</label>
            <input className="input" value={form.tech} placeholder="React, Node.js, MongoDB"
              onChange={e => setForm({...form, tech: e.target.value})} />
          </div>
        </div>
        <div className="form-group">
          <label className="label">Description *</label>
          <textarea className="input" value={form.description} required rows={3}
            onChange={e => setForm({...form, description: e.target.value})} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <div className="form-group">
            <label className="label">GitHub URL</label>
            <input className="input" type="url" value={form.github}
              onChange={e => setForm({...form, github: e.target.value})} />
          </div>
          <div className="form-group">
            <label className="label">Live Demo URL</label>
            <input className="input" type="url" value={form.demo}
              onChange={e => setForm({...form, demo: e.target.value})} />
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label className="label">Project Image</label>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }}
            onChange={handleImg} />
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            {preview && (
              <img src={preview} alt="Preview"
                style={{ width:64, height:64, objectFit:'cover', borderRadius:8,
                  border:'1px solid var(--border)' }} />
            )}
            <button type="button" className="btn btn-ghost"
              onClick={() => fileRef.current.click()}>
              {preview ? '🔄 Change Image' : '📷 Add Image'}
            </button>
          </div>
        </div>

        <div style={{ display:'flex', gap:12, marginTop:8 }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? <><div className="spinner" />Saving...</> : (initial ? '✓ Update Project' : '+ Add Project')}
          </button>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
