import { Context, Get, HttpResponseOK, dependency } from "@foal/core";
import { Category } from "../services";

export class CategoryController {
  @dependency
  categoryService: Category;

  @Get("/all")
  async getAll(ctx: Context) {
    return await this.categoryService.getAll();
  }
}
