
import { useEffect, useRef, useState } from "react";

/*
 * QUICK CONTENT EDITING
 * - Upload local files into public/media and use paths such as "/media/showreel.mp4".
 * - You can also paste a YouTube, Vimeo, or Google Drive embed URL.
 * - Keep large/full-length videos on Vimeo, YouTube, or Cloudinary for speed.
 */
const UPWORK_URL =
  "https://www.upwork.com/freelancers/~015a17f08c4a847874?mp_source=share";
const SHOWREEL_URL = "/media/showreel.mp4";
const HERO_VIDEO_URL = "/media/creator-authority.mp4";
const PORTRAIT_URL = "/media/portrait.jpeg";

const isDirectVideo = (url) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

const VideoDisplay = ({ url, title }) =>
  isDirectVideo(url) ? (
    <video controls playsInline preload="metadata" src={url} title={title} />
  ) : (
    <iframe
      allow="autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
      loading="lazy"
      src={url}
      title={title}
    />
  );

const portfolioItems = [
  {
    title: "Momentum",
    category: "Short Form",
    format: "Social content system",
    accent: "#665cff",
    number: "01",
    embedUrl:
      "https://drive.google.com/file/d/1yYQTnuVm_xd7xKM5LLp58UnpCNuKwyWz/preview",
  },
  {
    title: "The New Standard",
    category: "Commercial",
    format: "Brand campaign",
    accent: "#b26a37",
    number: "02",
    embedUrl:
      "https://drive.google.com/file/d/1uHG7EG7Y6CF2MY8b1wyLs6rlto3ifQRU/preview",
  },
  {
    title: "Built to Convert",
    category: "Social Ads",
    format: "Performance creative",
    accent: "#267d84",
    number: "03",
    embedUrl:
      "https://drive.google.com/file/d/1LtQE935jgjspRqoHgD92hFc0FI8yR75w/preview",
  },
  {
    title: "Future in Motion",
    category: "Corporate",
    format: "Company story",
    accent: "#49719e",
    number: "04",
    embedUrl:
      "https://drive.google.com/file/d/12JUjIWUJHIqcdch6RV97QH0ySCNYA3i8/preview",
  },
  {
    title: "Quiet Luxury",
    category: "Luxury",
    format: "Editorial brand film",
    accent: "#967e58",
    number: "05",
    embedUrl:
      "https://drive.google.com/file/d/1ICevrW9JTY8VCG_1kfjbsaKhTvCBrm9u/preview",
  },
];

const serviceGroups = [
  {
    number: "01",
    title: "Short-Form / Reels",
    slug: "short-form",
    count: 6,
    description: "Hooks, pacing, captions, and visual rhythm engineered for retention.",
  },
  {
    number: "02",
    title: "DTC & E-commerce Ads",
    slug: "dtc-ads",
    count: 5,
    description: "Conversion-focused product videos and performance creative for modern online brands.",
  },
  {
    number: "03",
    title: "Social Media Content",
    slug: "social-media",
    count: 5,
    description: "Platform-native content designed to feel natural, polished, and on-brand.",
  },
  {
    number: "04",
    title: "Creative Strategy",
    slug: "creative-strategy",
    count: 5,
    description: "Concepts, content direction, and performance thinking before the timeline opens.",
  },
  {
    number: "05",
    title: "Content Repurposing",
    slug: "repurposing",
    count: 5,
    description: "One strong idea transformed into an efficient, multi-platform content system.",
  },
  {
    number: "06",
    title: "AI-Powered Video Editing",
    slug: "ai-editing",
    count: 9,
    description: "AI-assisted workflows that accelerate production while preserving creative quality.",
  },
  {
    number: "07",
    title: "AI Character Animation",
    slug: "ai-animation",
    count: 5,
    description: "AI-powered character animation and visual storytelling for campaigns and branded content.",
  },
];

const serviceReels = serviceGroups.flatMap((group) =>
  Array.from({ length: group.count }, (_, index) => ({
    ...group,
    file: `/media/${group.slug}-${String(index + 1).padStart(2, "0")}.mp4`,
    reelNumber: index + 1,
  })),
);

const strengths = [
  ["01", "Top Rated Plus", "A proven record of quality, trust, and consistent delivery on Upwork."],
  ["02", "Storytelling First", "Every cut supports the message, the emotion, and the reason to keep watching."],
  ["03", "Strategy Included", "I think beyond the timeline—audience, positioning, platform, and outcome."],
  ["04", "Reliable Delivery", "Clear updates, structured feedback, fast turnaround, and no disappearing acts."],
  ["05", "Premium Quality", "Refined pacing, sound, motion, and colour built for high-value brands."],
  ["06", "Business-Minded", "A creative partner who understands that content has a job to do."],
];

const clients = [
  "YouTubers",
  "Coaches & Consultants",
  "SaaS Companies",
  "E-commerce & DTC",
  "Marketing Agencies",
  "Personal Brands",
  "Luxury Brands",
  "Startups",
  "Real Estate",
];

const Arrow = ({ down = false }) => (
  <svg
    aria-hidden="true"
    className={down ? "icon icon-down" : "icon"}
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Quote = () => (
  <svg aria-hidden="true" className="quote-icon" viewBox="0 0 32 24">
    <path d="M0 24V13.2C0 4.8 4.2.6 12.6 0v5.4c-4 .4-6 2.6-6 6.6H12v12H0Zm20 0V13.2C20 4.8 24.2.6 32.6 0v5.4c-4 .4-6 2.6-6 6.6H32v12H20Z" />
  </svg>
);

const ServiceVideoCarousel = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const doubledReels = [...serviceReels, ...serviceReels];
  const activeReel = serviceReels[activeIndex % serviceReels.length];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    const videos = [...carousel.querySelectorAll("video")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: carousel, threshold: 0.6 },
    );

    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;
      const card = carousel.querySelector(".service-reel-card");
      if (!card) return;

      const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || "18");
      const step = card.getBoundingClientRect().width + gap;
      carousel.scrollBy({ left: step, behavior: "smooth" });

      window.setTimeout(() => {
        const halfway = carousel.scrollWidth / 2;
        if (carousel.scrollLeft >= halfway) {
          carousel.scrollLeft -= halfway;
        }
      }, 650);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [paused]);

  const updateActiveReel = () => {
    const carousel = carouselRef.current;
    const card = carousel?.querySelector(".service-reel-card");
    if (!carousel || !card) return;

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap || "18");
    const step = card.getBoundingClientRect().width + gap;
    setActiveIndex(Math.round(carousel.scrollLeft / step) % serviceReels.length);
  };

  return (
    <div
      className="service-carousel-shell"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="service-carousel-status" aria-live="polite">
        <div>
          <span>{activeReel.number} / What I offer</span>
          <h3>{activeReel.title}</h3>
        </div>
        <p>{activeReel.description}</p>
      </div>

      <div
        className="service-video-carousel"
        onScroll={updateActiveReel}
        ref={carouselRef}
      >
        {doubledReels.map((reel, index) => (
          <article
            className={`service-reel-card ${
              index % serviceReels.length === activeIndex ? "service-reel-active" : ""
            }`}
            key={`${reel.slug}-${reel.reelNumber}-${index}`}
          >
            <div className="service-video-glow" />
            <video
              aria-label={`${reel.title} example ${reel.reelNumber}`}
              loop
              muted
              playsInline
              preload="metadata"
              src={reel.file}
            />
            <div className="service-reel-shade" />
            <div className="service-reel-meta">
              <span>{reel.title}</span>
              <span>{String(reel.reelNumber).padStart(2, "0")}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="service-carousel-hint">
        <span>Auto-playing</span>
        <span>Hover to pause / Swipe to explore</span>
      </div>
    </div>
  );
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [submitted, setSubmitted] = useState(false);
  const showreelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToShowreel = () =>
    showreelRef.current?.scrollIntoView({ behavior: "smooth" });

  const filters = ["All", ...new Set(portfolioItems.map((item) => item.category))];
  const visibleWork =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <a className="monogram" href="#" aria-label="Thomas Ian A. home">
          T<span>I</span>A
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href={UPWORK_URL} target="_blank" rel="noreferrer">
          Hire Me <Arrow />
        </a>
        <button
          className="menu-button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
        </button>
        <div className={`mobile-menu ${mobileOpen ? "mobile-menu-open" : ""}`}>
          {["Work", "About", "Services", "Process", "Contact"].map((item) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={item}
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-grid" />
        <div className="floating-orbit orbit-one" />
        <div className="floating-orbit orbit-two" />

        <div className="hero-content">
          <div className="eyebrow reveal reveal-one">
            <span className="status-dot" />
            Available for select projects
          </div>
          <h1 id="hero-title" className="reveal reveal-two">
            Editing that turns
            <br />
            attention into <em>impact.</em>
          </h1>
          <p className="hero-copy reveal reveal-three">
            I help creators, brands, and agencies produce high-performing
            content through strategic editing, cinematic storytelling, and
            creative execution.
          </p>
          <div className="hero-actions reveal reveal-four">
            <a className="button button-primary" href={UPWORK_URL} target="_blank" rel="noreferrer">
              Hire Me <Arrow />
            </a>
            <button className="button button-ghost" onClick={scrollToShowreel}>
              View Portfolio <Arrow down />
            </button>
          </div>
        </div>

        <div className="hero-video-wrap reveal reveal-three" aria-label="Creator Authority">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            src={HERO_VIDEO_URL}
          />
          <div className="hero-video-overlay" />
          <div className="hero-video-label">
            <span>Creator Authority</span>
            <span>Video Editor / Creative Strategist</span>
          </div>
        </div>

        <div className="hero-side-label" aria-hidden="true">
          Video Editor <span>/</span> Creative Strategist
        </div>
        <button
          className="scroll-cue"
          onClick={scrollToShowreel}
          aria-label="Scroll to featured showreel"
        >
          <span>Scroll to explore</span>
          <span className="scroll-line" />
        </button>
      </section>

      <section className="trust-strip" aria-label="Professional credentials">
        <div className="trust-item">
          <strong>Top Rated Plus</strong>
          <span>Upwork talent</span>
        </div>
        <div className="trust-divider" />
        <div className="trust-item">
          <strong>3,178+</strong>
          <span>Hours delivered</span>
        </div>
        <div className="trust-divider" />
        <div className="trust-item">
          <strong>$20K+</strong>
          <span>Earned on Upwork</span>
        </div>
        <div className="trust-divider" />
        <div className="trust-item">
          <strong>94%</strong>
          <span>Job success score</span>
        </div>
      </section>

      <section className="showreel section" id="work" ref={showreelRef}>
        <div className="section-heading">
          <div>
            <p className="section-kicker">01 / Featured work</p>
            <h2>Stories built to <em>move.</em></h2>
          </div>
          <p>
            A selection of edits engineered to hold attention, sharpen the
            message, and make every frame earn its place.
          </p>
        </div>

        <div className="reel-frame">
          <div className="reel-visual">
            {SHOWREEL_URL ? (
              <VideoDisplay
                url={SHOWREEL_URL}
                title="Thomas Ian A. featured showreel"
              />
            ) : (
              <>
                <div className="reel-noise" />
                <div className="reel-word" aria-hidden="true">
                  SHOWREEL
                </div>
                <button className="play-button" aria-label="Play featured showreel">
                  <span />
                </button>
                <div className="reel-meta">
                  <span>Thomas Ian A.</span>
                  <span>Featured Showreel — 2026</span>
                </div>
              </>
            )}
          </div>
          {!SHOWREEL_URL && (
            <div className="reel-note">
              <span className="note-dot" />
              Ready for your Google Drive, Vimeo, or YouTube embed
            </div>
          )}
        </div>
      </section>

      <section className="client-marquee" aria-label="Clients served">
        <div className="marquee-track">
          {[...clients, ...clients].map((client, index) => (
            <span key={`${client}-${index}`}>
              {client} <i>✦</i>
            </span>
          ))}
        </div>
      </section>

      <section className="about section" id="about">
        <div className="portrait-wrap">
          <div className="portrait-card">
            {PORTRAIT_URL ? (
              <img
                alt="Thomas Ian A., Video Editor and Creative Strategist"
                className="portrait-image"
                src={PORTRAIT_URL}
              />
            ) : (
              <div className="portrait-monogram">TIA</div>
            )}
            <div className="portrait-rim" />
            <div className="portrait-caption">
              <span>Thomas Ian A.</span>
              <span>Manila / Worldwide</span>
            </div>
          </div>
          <div className="portrait-badge">
            <span className="upwork-badge-icon" aria-hidden="true">☆</span>
            <strong>Top Rated Plus</strong>
          </div>
        </div>
        <div className="about-copy">
          <p className="section-kicker">02 / The creative partner</p>
          <h2>More than an editor. <em>A strategic eye.</em></h2>
          <p className="about-lead">
            I&apos;m Thomas Ian A.—a Top Rated Plus video editor and creative
            strategist who turns raw ideas into clear, compelling content built
            to perform.
          </p>
          <p>
            My work sits at the intersection of storytelling, audience
            psychology, brand strategy, and precise execution. Clients get more
            than a polished timeline: they get a reliable creative partner who
            asks the right questions, protects the message, and understands the
            business behind the brief.
          </p>
          <div className="about-values">
            <span>Storytelling specialist</span>
            <span>Reliable communicator</span>
            <span>Premium client experience</span>
            <span>Performance-minded</span>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading services-heading">
          <div>
            <p className="section-kicker">03 / Capabilities</p>
            <h2>Creative built for <em>performance.</em></h2>
          </div>
          <p>
            From the first strategic question to the final export, every detail
            is shaped around clarity, retention, and brand value.
          </p>
        </div>
        <ServiceVideoCarousel />
      </section>

      <section className="portfolio section" aria-labelledby="portfolio-title">
        <div className="portfolio-head">
          <div>
            <p className="section-kicker">04 / Selected projects</p>
            <h2 id="portfolio-title">
              Work that earns <em>attention.</em>
            </h2>
          </div>
          <div className="filters" aria-label="Filter portfolio projects">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? "filter-active" : ""}
                key={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="portfolio-grid">
          {visibleWork.map((item) => (
            <article className="project-card" key={item.title}>
              <div
                className="project-visual"
                style={{ "--project-accent": item.accent }}
              >
                {item.embedUrl ? (
                  <VideoDisplay url={item.embedUrl} title={item.title} />
                ) : (
                  <>
                    <span className="project-number">{item.number}</span>
                    <span className="project-type">{item.category}</span>
                    <div className="project-shape" />
                    <button aria-label={`Play ${item.title}`}>
                      <span />
                    </button>
                  </>
                )}
              </div>
              <div className="project-info">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.format}</p>
                </div>
                <span className="project-arrow">
                  <Arrow />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="why section">
        <div className="why-intro">
          <p className="section-kicker">05 / Why Thomas</p>
          <h2>
            Agency thinking.
            <br />
            <em>Personal ownership.</em>
          </h2>
          <p>
            The rigour and finish of a premium creative agency—with direct,
            responsive collaboration from the person shaping every frame.
          </p>
        </div>
        <div className="strength-list">
          {strengths.map(([number, title, description]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials section">
        <div className="testimonial-title">
          <p className="section-kicker">06 / Client experience</p>
          <h2>Trusted when the work <em>matters.</em></h2>
        </div>
        <div className="testimonial-grid">
          <article className="testimonial-card testimonial-featured">
            <Quote />
            <blockquote>
              Thomas brought clarity to the story and elevated every detail.
              The process was organised, responsive, and genuinely strategic
              from the first cut to final delivery.
            </blockquote>
            <div className="testimonial-person">
              <div className="avatar">A</div>
              <div>
                <strong>Agency Partner</strong>
                <span>Creative & marketing team</span>
              </div>
            </div>
          </article>
          <article className="testimonial-card">
            <Quote />
            <blockquote>
              Fast, thoughtful, and extremely dependable. The final edit felt
              premium and kept the brand voice intact.
            </blockquote>
            <div className="testimonial-person">
              <div className="avatar">C</div>
              <div>
                <strong>Content Lead</strong>
                <span>Personal brand</span>
              </div>
            </div>
          </article>
          <article className="testimonial-card">
            <Quote />
            <blockquote>
              He doesn&apos;t just execute notes—he understands why the content
              needs to work and brings better ideas to the table.
            </blockquote>
            <div className="testimonial-person">
              <div className="avatar">F</div>
              <div>
                <strong>Founder</strong>
                <span>Growing business</span>
              </div>
            </div>
          </article>
        </div>
        <p className="testimonial-note">
          Replace these placeholders with verified client testimonials.
        </p>
      </section>

      <section className="process section" id="process">
        <div className="process-heading">
          <p className="section-kicker">07 / The process</p>
          <h2>A clear path from <em>brief to impact.</em></h2>
        </div>
        <div className="process-line">
          {[
            ["01", "Discovery", "Goals, audience, brand, and what success looks like."],
            ["02", "Strategy", "Creative direction, structure, references, and priorities."],
            ["03", "Editing", "Story, pacing, sound, motion, colour, and polish."],
            ["04", "Feedback", "Clear review rounds with focused, efficient communication."],
            ["05", "Delivery", "Final exports optimised for every required platform."],
          ].map(([number, title, description]) => (
            <article key={title}>
              <span className="process-dot">{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-grid" />
        <p className="section-kicker">The next great edit starts here</p>
        <h2>
          Let&apos;s create something
          <br />
          worth <em>watching.</em>
        </h2>
        <a className="button button-primary cta-button" href={UPWORK_URL} target="_blank" rel="noreferrer">
          Hire Me <Arrow />
        </a>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-intro">
          <p className="section-kicker">08 / Start a project</p>
          <h2>Tell me what you&apos;re <em>building.</em></h2>
          <p>
            Share the project, the goal, and where you want to take it. I&apos;ll
            respond with the best next step.
          </p>
          <div className="contact-links">
            <a href={UPWORK_URL} target="_blank" rel="noreferrer" aria-label="Upwork profile">
              Upwork <Arrow />
            </a>
            <a href="#" aria-label="LinkedIn profile">
              LinkedIn <Arrow />
            </a>
            <a href="mailto:hello@thomasian.co">
              Email <Arrow />
            </a>
            <a href="#" aria-label="Instagram profile">
              Instagram <Arrow />
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              <span>Name</span>
              <input name="name" placeholder="Your name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" placeholder="you@company.com" required type="email" />
            </label>
          </div>
          <div className="form-row">
            <label>
              <span>Company</span>
              <input name="company" placeholder="Company or brand" />
            </label>
            <label>
              <span>Project type</span>
              <select name="projectType" defaultValue="">
                <option disabled value="">
                  Select a service
                </option>
                <option>YouTube editing</option>
                <option>Short-form content</option>
                <option>Social ads</option>
                <option>Brand film</option>
                <option>Creative strategy</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <label>
            <span>Budget</span>
            <select name="budget" defaultValue="">
              <option disabled value="">
                Select a range
              </option>
              <option>$500–$1,000</option>
              <option>$1,000–$2,500</option>
              <option>$2,500–$5,000</option>
              <option>$5,000+</option>
              <option>Let&apos;s discuss</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              placeholder="What are you creating, and what does success look like?"
              required
              rows={5}
            />
          </label>
          <button className="button button-primary form-submit" type="submit">
            {submitted ? "Message ready — I’ll be in touch" : "Send Project Brief"}
            <Arrow />
          </button>
          {submitted && (
            <p className="form-status" role="status">
              Thanks—your project brief has been captured for this demo.
              Connect the form to your preferred inbox before launch.
            </p>
          )}
        </form>
      </section>

      <footer>
        <div>
          <a className="monogram" href="#" aria-label="Back to top">
            T<span>I</span>A
          </a>
          <p>Video Editor & Creative Strategist</p>
        </div>
        <span>© {new Date().getFullYear()} Thomas Ian A.</span>
        <a href="#">Back to top ↑</a>
      </footer>
    </main>
  );
}
