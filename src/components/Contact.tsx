import ContactForm from "./ContactForm";
import { ScrollReveal } from "./ScrollReveal";

export default function Contact() {
  return (
    <ScrollReveal>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-white dark:bg-slate-950 px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="font-mono-accent text-sm font-medium uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Contact
              </p>
              <h2
                id="contact-heading"
                className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
              >
                Contact
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-emerald-500" />
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Have a project in mind or want to say hello? Fill out the form
                and I&apos;ll get back to you as soon as I can.
              </p>

              <address className="mt-8 space-y-3 not-italic text-slate-600 dark:text-slate-400">
                <p>
                  <span className="font-medium text-slate-900 dark:text-slate-200">Email:</span>{" "}
                  <a
                    href="mailto:awaisafzal196@gmail.com"
                    className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300"
                  >
                    awaisafzal196@gmail.com
                  </a>
                </p>
              </address>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}