import { ScrollReveal } from "./ScrollReveal";
export default function About() {
  return (
    <ScrollReveal>
      <section
        id="about"
        aria-labelledby="about-heading"
        className="bg-white dark:bg-slate-950 px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono-accent text-sm font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              About
            </p>
            <h2
              id="about-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
            >
              About Me
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-emerald-500" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="relative flex aspect-square max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-100 to-emerald-50 dark:from-slate-900 dark:to-emerald-950/40 lg:aspect-auto lg:h-80">
    {/* Decorative grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage:
          "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        color: "rgb(16 185 129)",
      }}
      aria-hidden="true"
    />

    {/* Decorative blobs */}
    <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-2xl" aria-hidden="true" />
    <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-2xl" aria-hidden="true" />

    {/* Initials + tech badges */}
    <div className="relative z-10 flex flex-col items-center gap-4">
      <span className="font-display text-7xl font-bold text-slate-900 dark:text-slate-100">
        MA
      </span>
      <div className="flex flex-wrap justify-center gap-2">
        {["React", "Node.js", "Next.js"].map((tech) => (
          <span
            key={tech}
            className="font-mono-accent rounded-full border border-emerald-500/30 bg-white/80 dark:bg-slate-950/60 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    <span className="sr-only">Profile photo placeholder</span>
  </div>

            <div className="space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                I&apos;m a MERN stack developer with a passion for building clean,
                functional web applications. I enjoy working across the full stack
                — from designing responsive UIs to building solid backend APIs.
              </p>
              <p>
                Currently sharpening my skills through hands-on internship projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}