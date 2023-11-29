import { Context, Get, HttpResponseOK } from "@foal/core";

export class CategoriesController {
  @Get("/all")
  getAll(ctx: Context) {
    return new HttpResponseOK();
  }
}
