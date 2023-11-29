import { dependency } from "@foal/core";
import { Prisma, PrismaClient } from "@prisma/client";

export class Category {
  @dependency
  prisma: PrismaClient;

  async getAll() {
    const allCategories = await this.prisma.expenseCategory.findMany({});
    throw new Error("Method not implemented.");
  }
}
