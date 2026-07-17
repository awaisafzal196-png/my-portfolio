import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error(
    "Missing required env vars. Check NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, ADMIN_PASSWORD in .env"
  );
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seedAdmin() {
  console.log("Checking if admin already exists...");

  const existingProfile = await prisma.profile.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingProfile) {
    console.log(`Admin profile already exists for ${ADMIN_EMAIL}. Skipping.`);
    await prisma.$disconnect();
    return;
  }

  console.log("Creating Supabase Auth user...");

  const { data: authData, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });

  if (authError || !authData.user) {
    console.error("Failed to create auth user:", authError?.message);
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log("Auth user created with id:", authData.user.id);

  console.log("Creating profile record...");

  const profile = await prisma.profile.create({
    data: {
      authUserId: authData.user.id,
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      role: "admin",
    },
  });

  console.log("✅ Admin seeded successfully:");
  console.log({ email: ADMIN_EMAIL, name: ADMIN_NAME, profileId: profile.id });

  await prisma.$disconnect();
}

seedAdmin().catch(async (error) => {
  console.error("Seed script failed:", error);
  await prisma.$disconnect();
  process.exit(1);
});