import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );
    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";

  const record = await prisma.loginAttempt.findUnique({
    where: { ipAddress: ip },
  });

  if (record?.blockedUntil && record.blockedUntil > new Date()) {
    const minutesLeft = Math.ceil(
      (record.blockedUntil.getTime() - Date.now()) / 60000
    );
    return NextResponse.json(
      {
        error: `Too many attempts. Please try again in ${minutesLeft} minute(s).`,
      },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { recaptchaToken } = body;

  if (!recaptchaToken) {
    return NextResponse.json(
      { error: "reCAPTCHA verification failed. Please try again." },
      { status: 400 }
    );
  }

  const isHuman = await verifyRecaptcha(recaptchaToken);

  if (!isHuman) {
    return NextResponse.json(
      { error: "reCAPTCHA verification failed. Please try again." },
      { status: 400 }
    );
  }

  return NextResponse.json({ verified: true });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { success } = body;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";

  if (success) {
    await prisma.loginAttempt.deleteMany({ where: { ipAddress: ip } });
    return NextResponse.json({ ok: true });
  }

  const record = await prisma.loginAttempt.findUnique({
    where: { ipAddress: ip },
  });

  const newAttempts = (record?.attempts || 0) + 1;
  const shouldBlock = newAttempts >= MAX_ATTEMPTS;

  await prisma.loginAttempt.upsert({
    where: { ipAddress: ip },
    update: {
      attempts: newAttempts,
      lastAttemptAt: new Date(),
      blockedUntil: shouldBlock
        ? new Date(Date.now() + BLOCK_DURATION_MS)
        : null,
    },
    create: {
      ipAddress: ip,
      attempts: 1,
      lastAttemptAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true });
}