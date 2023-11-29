import { Context, Get, HttpResponseOK } from "@foal/core";

export class CategoryController {
  @Get("/")
  getAll(ctx: Context) {
    return new HttpResponseOK();
  }
}
