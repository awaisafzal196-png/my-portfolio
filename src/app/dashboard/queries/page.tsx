"use client";

import { useEffect, useState } from "react";

type Contact = {
  id: string;
  name: string;
  email: string;
  phoneOrSubject: string;
  message: string;
  status: string;
  createdAt: string;
};

const STATUS_OPTIONS = ["Pending", "Done", "Completed", "Resolved"];

export default function QueriesPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  function loadContacts() {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.contacts);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadContacts();
  }

  if (loading) return <p className="text-slate-600 dark:text-slate-400">Loading...</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
        Contact Queries
      </h1>

      <div className="mt-6 space-y-4">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{c.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{c.email}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{c.phoneOrSubject}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.message}</p>
              </div>
              <select
                value={c.status}
                onChange={(e) => updateStatus(c.id, e.target.value)}
                className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400">No contact queries yet.</p>
        )}
      </div>
    </div>
  );
}