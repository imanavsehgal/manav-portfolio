import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  Terminal,
  UserRound,
  X,
} from "lucide-react";
import { profile, skills, projects, experience, education } from "./data";
import Reveal from "./components/Reveal";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Charts from "./components/Charts";

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["stats", "Stats"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: [0.05, 0.2, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    let start;
    const duration = 1200;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <strong>{count}{suffix}</strong>;
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <Reveal className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

function App() {
  const active = useActiveSection();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState({ type: "", message: "" });

  const phrases = useMemo(
    () => ["MERN-Stack Developer", "DSA Enthusiast", "AI & Data Science Builder"],
    []
  );

  useEffect(() => {
    if (reduceMotion) {
      setTyped(phrases[0]);
      return;
    }

    let phrase = 0;
    let index = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const current = phrases[phrase];
      index += deleting ? -1 : 1;
      setTyped(current.slice(0, index));

      let delay = deleting ? 45 : 85;
      if (!deleting && index === current.length) {
        deleting = true;
        delay = 1300;
      } else if (deleting && index === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        delay = 420;
      }

      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, [phrases, reduceMotion]);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const visibleProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setFormState({ type: "error", message: "Please complete all fields." });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormState({ type: "error", message: "Enter a valid email address." });
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setFormState({
      type: "success",
      message: "Your email client should open with the message prepared.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <ScrollProgress />
      <CustomCursor />

      <motion.div
        className="page-loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.75, delay: 0.35 }}
      >
        <div className="loader-mark"><span>M</span></div>
      </motion.div>

      <header className="navbar">
        <div className="container nav-inner">
          <button className="brand" onClick={() => scrollTo("home")} aria-label="Go to home">
            <span className="brand-mark">M</span>
            <span>Manav<span className="brand-dot">.</span></span>
          </button>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                className={active === id ? "active" : ""}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          <a className="nav-cta" href={`mailto:${profile.email}`}>
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>

          <button
            className="menu-button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-grid" aria-hidden="true" />
          <div className="orb orb-one" aria-hidden="true" />
          <div className="orb orb-two" aria-hidden="true" />
          <div className="container hero-content">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 25 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="status-pill">
                <span className="status-dot" /> Available for opportunities
              </div>
              <p className="hero-kicker">AI &amp; Data Science • Chandigarh, India</p>
              <h1>
                Building digital products
                <span className="accent-line"> with intent.</span>
              </h1>
              <div className="typed-line" aria-live="polite">
                <Terminal size={17} /> <span>{typed}</span><span className="caret" />
              </div>
              <p className="hero-copy">{profile.bio}</p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => scrollTo("projects")}>
                  View Projects <ArrowDown size={17} />
                </button>
                <a className="button secondary" href={profile.resume} target="_blank" rel="noreferrer">
                  Download Resume <Download size={17} />
                </a>
              </div>
              <div className="hero-meta">
                <span><MapPin size={15} /> {profile.location}</span>
                <a href={`mailto:${profile.email}`}><Mail size={15} /> {profile.email}</a>
              </div>
            </motion.div>

            <motion.div
              className="hero-card"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 24 }}
              animate={reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
            >
              <div className="code-window">
                <div className="window-top">
                  <div className="window-dots"><i /><i /><i /></div>
                  <span>manav.tsx</span>
                </div>
                <pre>
{`const developer = {
  name: "Manav Sehgal",
  focus: ["MERN", "DSA"],
  mindset: "build + iterate",
  location: "Chandigarh, IN"
};`}
                </pre>
                <div className="code-footer">
                  <span><span className="pulse" /> Open to building</span>
                  <span>01 / 01</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <SectionHeading
              eyebrow="01 — About"
              title="A developer who likes the details."
              text="I combine a software-engineering mindset with an eye for interfaces that feel simple, intentional, and fast."
            />

            <div className="about-grid">
              <Reveal className="profile-card">
                <div className="profile-placeholder" role="img" aria-label="Profile photo placeholder">
                  <span>MS</span>
                </div>
                <div className="profile-caption">
                  <div>
                    <h3>{profile.name}</h3>
                    <p>{profile.title}</p>
                  </div>
                  <span className="availability">Open</span>
                </div>
              </Reveal>

              <Reveal className="about-copy" delay={0.1}>
                <p className="large-copy">
                  I&apos;m an AI &amp; Data Science undergraduate focused on full-stack development,
                  problem solving, and building projects that solve practical problems.
                </p>
                <p>
                  My recent work spans social platforms, healthcare discovery systems,
                  responsive websites, and machine-learning applications. I enjoy taking a
                  product from an idea to a working interface and then improving the details.
                </p>
                <div className="mini-grid">
                  <div><Code2 size={18} /><span>Clean architecture</span></div>
                  <div><Terminal size={18} /><span>DSA-first thinking</span></div>
                  <div><UserRound size={18} /><span>UX-aware development</span></div>
                  <div><CheckCircle2 size={18} /><span>Practical delivery</span></div>
                </div>
              </Reveal>
            </div>

            <div className="counter-grid">
              {[
                ["02+", "Core internships / roles"],
                ["04+", "Featured projects"],
                ["200+", "DSA problems"],
                ["7.3", "Current CGPA"],
              ].map(([value, label], index) => (
                <Reveal key={label} delay={index * 0.07} className="counter-card">
                  <Counter value={Number(value.replace("+", ""))} suffix={value.includes("+") ? "+" : ""} />
                  <span>{label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section section-muted">
          <div className="container">
            <SectionHeading
              eyebrow="02 — Skills"
              title="Tools I use to turn ideas into products."
              text="A practical stack across interfaces, APIs, databases, version control, and problem solving."
            />

            <div className="skills-layout">
              {Object.entries(skills).map(([group, values], groupIndex) => (
                <Reveal key={group} className="skill-group" delay={groupIndex * 0.08}>
                  <div className="skill-group-head">
                    <span>0{groupIndex + 1}</span>
                    <h3>{group}</h3>
                  </div>
                  <div className="skill-list">
                    {values.map(([name, score], index) => (
                      <div className="skill-row" key={name}>
                        <div className="skill-label"><span>{name}</span><span>{score}%</span></div>
                        <div className="progress"><motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: `${score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        /></div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="stats" className="section">
          <div className="container">
            <SectionHeading
              eyebrow="03 — Stats"
              title="Progress, visualized."
              text="These charts use illustrative portfolio data to make the interface feel alive. Replace the datasets in src/data.js with your real metrics."
            />
            <Charts />
          </div>
        </section>

        <section id="projects" className="section section-muted">
          <div className="container">
            <SectionHeading
              eyebrow="04 — Projects"
              title="Selected work."
              text="A compact selection of systems and interfaces I have built or developed."
            />

            <div className="filter-row" aria-label="Project filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={filter === category ? "filter active" : "filter"}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <motion.div layout className="projects-grid">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project) => (
                  <motion.article
                    layout
                    key={project.title}
                    className="project-card"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`project-visual visual-${project.tone}`}>
                      <div className="project-image-wrap">
                        <img
                          src={project.image}
                          alt={`${project.title} project preview`}
                          className="project-image"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="project-content">
                      <div className="project-topline">
                        <span>{project.category}</span>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${project.title}`}
                          className="project-external"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tag-list">
                        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <div className="project-links">
                        <a href={project.live} target="_blank" rel="noreferrer">Live <ArrowUpRight size={15} /></a>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <SectionHeading
              eyebrow="05 — Experience"
              title="Where I have been learning by building."
              text="Experience and education are presented as a simple timeline. Replace or extend these entries in src/data.js."
            />

            <div className="timeline">
              {[...experience, ...education].map((item, index) => (
                <Reveal key={`${item.title}-${item.year}`} className="timeline-item" delay={index * 0.08}>
                  <div className="timeline-dot" />
                  <div className="timeline-date">{item.year}</div>
                  <div className="timeline-card">
                    <span>{index < experience.length ? "Experience" : "Education"}</span>
                    <h3>{item.title}</h3>
                    <h4>{item.company}</h4>
                    <p>{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-muted">
          <div className="container">
            <SectionHeading
              eyebrow="06 — Contact"
              title="Have a project in mind?"
              text="Send a message and I&apos;ll get back to you. The form validates locally and opens your email client with the message prepared."
            />

            <div className="contact-grid">
              <Reveal className="contact-info">
                <div className="contact-big">
                  <span>Let&apos;s build</span>
                  <strong>something useful.</strong>
                </div>
                <div className="contact-links">
                  <a href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>
                  <a href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
                  <a href="https://leetcode.com/u/manavx24/" target="_blank" rel="noreferrer" aria-label="LeetCode">
                  <span className="leetcode-contact-icon">LC</span>
                    LeetCode
                  </a>
                </div>
              </Reveal>

              <Reveal className="contact-form-wrap" delay={0.1}>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="field-grid">
                    <label>
                      <span>Name</span>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </label>
                    <label>
                      <span>Email</span>
                      <input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        type="email"
                        autoComplete="email"
                      />
                    </label>
                  </div>
                  <label>
                    <span>Message</span>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me what you are building..."
                      rows="6"
                    />
                  </label>
                  <button className="button primary submit-button" type="submit">
                    Send message <Send size={16} />
                  </button>
                  {formState.message && (
                    <p className={`form-message ${formState.type}`}>
                      {formState.type === "success" ? <CheckCircle2 size={16} /> : <X size={16} />}
                      {formState.message}
                    </p>
                  )}
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Manav Sehgal. Built with React.</span>
          <div className="footer-socials">
  <a
    href={profile.github}
    target="_blank"
    rel="noreferrer"
    aria-label="GitHub"
  >
    <Github size={18} />
  </a>

  <a
    href={profile.linkedin}
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
  >
    <Linkedin size={18} />
  </a>

  <a
    href="https://leetcode.com/u/manavx24/"
    target="_blank"
    rel="noreferrer"
    aria-label="LeetCode"
    className="leetcode-link"
  >
    <span>LC</span>
  </a>

  <a
    href={`mailto:${profile.email}`}
    aria-label="Email"
  >
    <Mail size={18} />
  </a>
</div>
          <button className="back-top" onClick={() => scrollTo("home")} aria-label="Back to top">
            <ArrowUp size={17} />
          </button>
        </div>
      </footer>
    </>
  );
}

export default App;