const projects = [
  {
    title: "Task Manager App",
    description:
      "A full-stack task management app with user authentication, CRUD operations, and a responsive React dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
    href: "#",
  },
  {
    title: "REST API Boilerplate",
    description:
      "A reusable Express API with JWT auth, Prisma ORM, and PostgreSQL — built as a foundation for internship projects.",
    tags: ["Express", "Prisma", "PostgreSQL"],
    href: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "This responsive one-page portfolio built with Next.js App Router, Tailwind CSS, and accessible form validation.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    href: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-white dark:bg-slate-950 px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono-accent text-sm font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Projects
          </p>
          <h2
            id="projects-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
          >
            Projects
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-emerald-500" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            A selection of work that showcases my approach to building software.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-300 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md dark:hover:shadow-emerald-950/50 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-emerald-50 dark:from-slate-800 dark:to-emerald-950/40">
                <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                  Project preview
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono-accent rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href={project.href}
                className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 transition group-hover:text-emerald-500 dark:group-hover:text-emerald-300"
                aria-label={`View ${project.title}`}
              >
                View project
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}