import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  const adapter = new PrismaPg({ connectionString });
  prisma = new PrismaClient({ adapter });
} else {
  if (!globalThis.__db__) {
    const adapter = new PrismaPg({ connectionString });
    globalThis.__db__ = new PrismaClient({ adapter });
  }
  prisma = globalThis.__db__;
}

export { prisma };
