"use client";

import Image from "next/image";
import { useEffect } from "react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  codeHref: string;
};

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800"
        >
          ✕
        </button>

        <div className="relative h-64 w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          <h3
            id="project-modal-title"
            className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100"
          >
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="font-mono-accent rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-4">
            {project.href !== "#" && (
            <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition"
              >
                Visit Live Site
              </a>
            )}
            {project.codeHref !== "#" && (
            <a
                href={project.codeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}