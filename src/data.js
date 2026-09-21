export const profile = {
  name: "Manav Sehgal",
  title: "MERN-Stack Developer",
  location: "Chandigarh, India",
  email: "i.manavsehgal@gmail.com",
  resume:
    "https://drive.google.com/file/d/1VmNoh6QdCwM-pACQVLZdG7KpweV7dWVk/view?usp=drive_link",
  linkedin: "https://www.linkedin.com/in/imanavsehgal",
  github: "https://github.com/imanavsehgal",
  bio:
    "AI & Data Science undergraduate who enjoys turning ideas into polished, useful products. I build full-stack interfaces with a strong focus on clean UX, practical problem solving, and DSA-driven engineering.",
};

export const skills = {
  Frontend: [
    ["React / Next.js", 88],
    ["JavaScript / TypeScript", 84],
    ["HTML / CSS / Tailwind", 91],
  ],
  Backend: [
    ["Node.js / Express", 76],
    ["REST APIs", 82],
    ["MySQL / MongoDB", 72],
  ],
  Tools: [
    ["Git / GitHub", 88],
    ["Python / Data", 78],
    ["DSA / Problem Solving", 82],
  ],
};

export const projects = [
  {
    title: "SquadUp",
    category: "Full Stack",
    description:
      "A social activity matching platform where users can create, discover, search, and join squads for study, fitness, gaming, travel, and more.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind"],
    live: "https://coruscating-gumdrop-1c7494.netlify.app/",
    image: "/projects/squadup.png",
    tone: "01",
  },
  {
    title: "Medical Aggregator",
    category: "Full Stack",
    description:
      "A data-driven platform for discovering nearby hospitals, comparing diagnostic test prices, and managing appointment workflows.",
    tags: ["Python", "Flask", "SQL", "JavaScript"],
    live: "https://bookmytest1.onrender.com/",
    image: "/projects/bookmytest.png",
    tone: "02",
  },
];

export const experience = [
  {
    year: "Jun 2025 — Jul 2025",
    title: "Data Science Intern",
    company: "ThinkNEXT Technologies",
    description:
      "Worked with industrial datasets, preprocessing, exploratory analysis, predictive modelling, and visual reporting.",
  },
  {
    year: "Jan 2024 — Jun 2024",
    title: "Web Developer",
    company: "CGC Landran",
    description:
      "Built a responsive hotel booking website with dynamic workflows, data validation, and operationally focused UI.",
  },
];

export const education = [
  {
    year: "2023 — 2027",
    title: "B.Tech — AI & Data Science",
    company: "Chandigarh Engineering College, Landran",
    description:
      "Coursework across software engineering, data structures, databases, machine learning, and analytics.",
  },
];

export const growthData = [
  { month: "Jan", value: 24 },
  { month: "Feb", value: 31 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 45 },
  { month: "May", value: 57 },
  { month: "Jun", value: 64 },
  { month: "Jul", value: 73 },
  { month: "Aug", value: 82 },
  { month: "Sep", value: 91 },
];

export const stackData = [
  { name: "Frontend", value: 38 },
  { name: "Backend", value: 27 },
  { name: "DSA", value: 21 },
  { name: "Data / ML", value: 14 },
];

export const radarData = [
  { subject: "Frontend", score: 91 },
  { subject: "Backend", score: 76 },
  { subject: "DSA", score: 82 },
  { subject: "Python", score: 78 },
  { subject: "SQL", score: 80 },
  { subject: "Git", score: 88 },
];

export function makeHeatmap() {
  const total = 182;
  return Array.from({ length: total }, (_, i) => {
    const wave = Math.sin(i * 0.21) + Math.sin(i * 0.07);
    const probability = (wave + 2) / 4;
    return Math.max(0, Math.min(4, Math.floor(probability * 5)));
  });
}