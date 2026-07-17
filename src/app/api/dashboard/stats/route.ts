import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [total, pending, resolved, recent] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({ where: { status: "Pending" } }),
    prisma.contact.count({
      where: { status: { in: ["Done", "Completed", "Resolved"] } },
    }),
    prisma.contact.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  return NextResponse.json({ total, pending, resolved, recent });
}