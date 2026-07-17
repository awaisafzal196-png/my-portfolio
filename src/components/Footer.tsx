export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900 dark:bg-black px-4 py-10 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono-accent text-sm text-slate-400">
          &copy; {currentYear} Muhammad Awais. All rights reserved.
        </p>

        <nav aria-label="Social links">
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-400 transition hover:text-emerald-400"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-400 transition hover:text-emerald-400"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-slate-400 transition hover:text-emerald-400"
              >
                Twitter
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}