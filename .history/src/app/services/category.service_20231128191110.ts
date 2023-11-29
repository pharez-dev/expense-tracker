import { HttpResponse, HttpResponseOK, dependency } from "@foal/core";
import { Prisma, PrismaClient } from "@prisma/client";

export class Category {
  @dependency
  prisma: PrismaClient;

  async getAll(): Promise<HttpResponse> {
    const allCategories = await this.prisma.expenseCategory.findMany({});
    const response = new HttpResponseOK();
    throw new Error("Method not implemented.");
  }
}