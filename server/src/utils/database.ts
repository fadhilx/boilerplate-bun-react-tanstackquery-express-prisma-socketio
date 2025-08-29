import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

export async function initializeDatabase() {
  try {
    // Check if counter exists, if not create one
    const counter = await prisma.counter.findFirst();
    if (!counter) {
      await prisma.counter.create({
        data: { value: 0 },
      });
      console.log("Initial counter created");
    }
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}
