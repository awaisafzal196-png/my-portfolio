"use client";

import { useEffect, useState } from "react";

type Contact = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
};

type Stats = {
  total: number;
  pending: number;
  resolved: number;
  recent: Contact[];
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <p className="text-slate-600 dark:text-slate-400">Loading stats...</p>;

  const cards = [
    { label: "Total Contacts", value: stats.total },
    { label: "Pending", value: stats.pending },
    { label: "Resolved", value: stats.resolved },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
        Dashboard
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
        Recent Contacts
      </h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800 text-left text-slate-600 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900">
            {stats.recent.map((c) => (
              <tr key={c.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{c.name}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.email}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}