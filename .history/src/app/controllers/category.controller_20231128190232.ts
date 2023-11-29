import { Context, Get, HttpResponseOK } from '@foal/core';

export class CategoryController {

  @Get('/')
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

}
