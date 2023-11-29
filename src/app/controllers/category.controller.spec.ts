// std
import { ok, strictEqual } from 'assert';

// 3p
import { Context, createController, getHttpMethod, getPath, isHttpResponseOK } from '@foal/core';

// App
import { CategoryController } from './category.controller';

describe('CategoryController', () => {

  let controller: CategoryController;

  beforeEach(() => controller = createController(CategoryController));

  describe('has a "foo" method that', () => {

    it('should handle requests at GET /.', () => {
      strictEqual(getHttpMethod(CategoryController, 'foo'), 'GET');
      strictEqual(getPath(CategoryController, 'foo'), '/');
    });

    it('should return an HttpResponseOK.', () => {
      const ctx = new Context({});
      ok(isHttpResponseOK(controller.foo(ctx)));
    });

  });

});
