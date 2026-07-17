const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend & Database",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Prisma", "Git"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="bg-slate-50 dark:bg-slate-900 px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono-accent text-sm font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Skills
          </p>
          <h2
            id="skills-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
          >
            Skills
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-emerald-500" />
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Technologies and tools I work with regularly.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm hover:shadow-md dark:hover:shadow-emerald-950/50 transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono-accent rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}