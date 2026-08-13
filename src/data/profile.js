// This file is the single source of truth for portfolio content.
// In Phase 2 (backend + admin), this data will be fetched from MongoDB
// via the API instead of being hardcoded here — the component structure
// won't need to change, just the data source.

export const profile = {
  name: "SAM",
  roles: [
    "Full Stack MERN Developer",
    "REST API Builder",
    "React.js Engineer",
  ],
  tagline:
    "I build scalable full-stack web applications — clean APIs on the backend, responsive interfaces on the front.",
  summary:
    "Enthusiastic Full Stack Developer with hands-on experience in the MERN stack, specializing in building scalable REST APIs and responsive user interfaces. Seeking to contribute strong technical skills and problem-solving abilities to a growing development team.",
  location: "Ariyalur, Tamil Nadu, India",
  email: "babajiashok8637@gmail.com",
  phone: "8637446615",
  socials: {
    github: "https://github.com/ashokkumar2005",
    portfolio: "https://ashok-portfolio-sam.vercel.app/",
    linkedin: "",
  },
  resumeUrl: "/resume.pdf",
};

export const skills = [
  {
    category: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js"],
  },
  {
    category: "Database",
    items: ["MongoDB"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
  {
    category: "Deployment",
    items: ["Vercel", "Render"],
  },
  {
    category: "Core Competencies",
    items: [
      "Full Stack Web Development",
      "REST API Development",
      "MongoDB Database Design",
      "JWT & Authentication",
      "Responsive Web Design",
      "Problem Solving",
      "Code Quality & Debugging",
      "Version Control (Git)",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering (B.E) — Computer Science and Engineering",
    school: "Nelliandavar Institute of Technology",
    period: "2022 — 2026",
  },
  {
    degree: "Senior Secondary School",
    school: "Government Higher Secondary School, Ariyalur",
    period: "2020 — 2022",
  },
];

export const projects = [
  {
    id: "hospital-management-system",
    name: "Hospital Management System",
    period: "Jan 2026 — Apr 2026",
    shortDescription:
      "A full-stack hospital management platform with role-based access for admins, doctors, and patients, appointment booking, blood donation management, and an AI symptom checker.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    features: [
      "Role-based authentication for Admin, Doctor, and Patient modules",
      "Appointment booking system",
      "Blood donation and request management",
      "AI-assisted symptom checker",
      "RESTful API design with MongoDB data modeling",
      "Responsive, modern UI built with React.js",
    ],
    status: "Live",
    githubUrl: "https://github.com/ashokkumar2005",
    liveUrl: "https://ashok-portfolio-sam.vercel.app/",
    frontendUrl: "",
    backendUrl: "",
    overview:
      "A MERN-stack system designed to digitize day-to-day hospital operations — from patient intake to appointment scheduling to donor coordination — behind a single role-aware interface.",
    problemStatement:
      "Small and mid-sized hospitals often coordinate appointments, patient records, and blood donation requests manually across phone calls and paper registers, which is slow and error-prone.",
    solution:
      "A centralized web platform where each role (admin, doctor, patient) sees only the tools relevant to them, backed by a REST API and MongoDB for structured, queryable records.",
    architecture:
      "React front end communicating with an Express/Node REST API, MongoDB via Mongoose for persistence, and JWT-based auth middleware protecting role-specific routes.",
    challenges:
      "Designing a single authentication system that cleanly branches into three different role-based experiences without duplicating logic across the codebase.",
    futureImprovements:
      "Real-time notifications for appointment status, analytics dashboard for admins, and integration with SMS/email reminders.",
    gallery: [],
  },
  {
    id: "one-piece-portfolio",
    name: "One Piece Portfolio Website",
    period: "",
    shortDescription:
      "An anime-themed personal portfolio built with React and Vite, showcasing projects and skills through reusable components with smooth client-side navigation.",
    stack: ["React.js", "Vite", "React Router"],
    features: [
      "Anime-themed responsive design",
      "Reusable React component architecture",
      "Client-side routing with React Router",
      "Interactive, animated UI elements",
    ],
    status: "Live",
    githubUrl: "https://github.com/ashokkumar2005",
    liveUrl: "https://ashok-portfolio-sam.vercel.app/",
    frontendUrl: "",
    backendUrl: "",
    overview:
      "A themed take on the classic developer portfolio, built to practice component reuse and routing while giving the site a distinct personality.",
    problemStatement:
      "Generic portfolio templates tend to blend together and don't reflect any personal identity.",
    solution:
      "Built a fully custom, anime-inspired UI from scratch using Vite and React, keeping every section as an independent reusable component.",
    architecture:
      "Vite-powered React SPA with React Router handling page navigation between sections.",
    challenges:
      "Balancing a strong visual theme with usability and fast load times.",
    futureImprovements:
      "Add a blog section and dark/light theme toggle.",
    gallery: [],
  },
];

export const experience = [];

export const achievements = [];

export const certifications = [];
