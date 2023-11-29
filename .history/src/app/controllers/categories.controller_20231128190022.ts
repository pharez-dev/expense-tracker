import { Context, Get, HttpResponseOK } from '@foal/core';

export class CategoriesController {

  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

}
