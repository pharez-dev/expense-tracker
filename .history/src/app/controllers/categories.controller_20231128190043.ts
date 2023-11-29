import { Context, Get, HttpResponseOK } from "@foal/core";

export class CategoriesController {
  @Get("/")
  getAll(ctx: Context) {
    return new HttpResponseOK();
  }
}
