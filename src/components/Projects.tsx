"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { ProjectModal } from "./ProjectModal";

const projects = [
  {
    title: "MERN Portfolio Website",
    description:
      "This responsive portfolio built with Next.js, Tailwind CSS, Supabase, and Prisma — featuring an admin dashboard, contact form with email alerts, and secure authentication.",
    tags: ["Next.js", "Supabase", "Prisma", "TypeScript"],
    image: "/portfolio.png",
    href: "https://my-portfolio-rho-three-28.vercel.app",
    codeHref: "https://github.com/awaisafzal196-png/my-portfolio",
  },
  {
    title: "Simulation Based Clinical Emergency Training",
    description:
      "A standalone VR training app for Meta Quest that lets medical students practice emergency procedures — wound stitching and anatomy visualization — in an immersive, repeatable environment. Built with Unity 2022 LTS and the Meta Quest SDK, featuring hand-tracking interaction, guided training with real-time feedback, and a performance evaluation engine tracking accuracy, time, and errors.",
    tags: ["Unity", "Meta Quest SDK", "C#", "VR"],
    image: "/project.png",
    href: "#",
    codeHref: "#",
  },
  {
    title: "Task Manager App",
    description:
      "A full-stack task management app with user authentication, CRUD operations, and a responsive React dashboard.",
    tags: ["React", "Node.js", "MongoDB"],
    image: "",
    href: "#",
    codeHref: "#",
  },
];

type ProjectType = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  codeHref: string;
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  function handleView(project: ProjectType) {
    if (!project.image) return;
    if (project.href !== "#") {
      window.open(project.href, "_blank", "noopener,noreferrer");
    } else {
      setActiveProject(project);
    }
  }

  return (
    <>
      <ScrollReveal>
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
                  <div className="relative mb-4 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-emerald-50 dark:from-slate-800 dark:to-emerald-950/40">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                          Project preview
                        </span>
                      </div>
                    )}
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
                  <div className="mt-6 flex items-center gap-4">
                    <button
                      onClick={() => handleView(project)}
                      disabled={!project.image}
                      className="inline-flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 transition group-hover:text-emerald-500 dark:group-hover:text-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label={`View ${project.title}`}
                    >
                      View project
                      <span aria-hidden="true" className="ml-1">
                        →
                      </span>
                    </button>
                    {project.codeHref !== "#" && (
                      <a
                        href={project.codeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}