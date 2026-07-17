const experience = [
  {
    role: "Simulation Based Training Specialist AR/VR",
    company: "Final Year Project",
    period: "2025-2026",
    description:
      "Building Simulation Based Training for clients using Blender and Unreal Engine.",
  },
  {
    role: "Frontend Developer",
    period: "2020-present",
    description:
      "Building and maintaining REST APIs and React applications serving thousands of daily active users.",
  },
];

const education = [
  {
    degree: "B.S. Computer Science",
    school: "University of Central Punjab",
    period: "2022 — 2026",
    description:
      "Graduated with honors. Coursework in algorithms, software engineering, and web development.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="bg-slate-50 dark:bg-slate-900 px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono-accent text-sm font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
          >
            Experience & Education
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-emerald-500" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Experience</h3>
            <ol className="mt-6 space-y-8">
              {experience.map((item) => (
                <li
                  key={`${item.role}-${item.company}`}
                  className="relative border-l-2 border-emerald-200 dark:border-emerald-900 pl-6"
                >
                  <span
                    className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  <p className="font-mono-accent text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {item.period}
                  </p>
                  <h4 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.role}
                  </h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item.company}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Education</h3>
            <ol className="mt-6 space-y-8">
              {education.map((item) => (
                <li
                  key={`${item.degree}-${item.school}`}
                  className="relative border-l-2 border-emerald-200 dark:border-emerald-900 pl-6"
                >
                  <span
                    className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  <p className="font-mono-accent text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {item.period}
                  </p>
                  <h4 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.degree}
                  </h4>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item.school}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}