export default function About() {
  return (
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
          <div className="flex aspect-square max-w-sm items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-emerald-50 dark:from-slate-900 dark:to-emerald-950/40 lg:aspect-auto lg:h-80">
            <span className="text-6xl font-bold text-slate-300 dark:text-slate-700" aria-hidden="true">
              MA
            </span>
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
  );
}