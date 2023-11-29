import { Prisma } from "@prisma/client";

export class Category {
  @dependency
  prisma: Prisma;
  async getAll() {
    throw new Error("Method not implemented.");
  }
}
