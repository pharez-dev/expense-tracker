import { Prisma, PrismaClient } from "@prisma/client";

export class Category {
  @dependency
  prisma: PrismaClient;

  async getAll() {
    throw new Error("Method not implemented.");
  }
}
