import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const users = [
  { name: "Admin User", email: "admin@moonapp.com", password: "admin123" },
  { name: "Jean Dupont", email: "jean.dupont@email.com", password: "password123" },
  { name: "Marie Curie", email: "marie.curie@email.com", password: "password123" },
  { name: "Luc Martin", email: "luc.martin@email.com", password: "password123" },
  { name: "Sophie Bernard", email: "sophie.bernard@email.com", password: "password123" },
];

async function main() {
  console.log("Seeding database...");

  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });
    console.log(`  Created user: ${user.name} (${user.email})`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
