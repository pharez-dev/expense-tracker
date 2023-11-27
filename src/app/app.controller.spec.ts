import {
  Context,
  isHttpResponseConflict,
  isHttpResponseInternalServerError,
  isHttpResponseNotFound,
  isHttpResponseOK,
} from "@foal/core";
import { AppController } from "./app.controller";
import { ok } from "assert";

import { Prisma } from "@prisma/client";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController();
  });

  it('should have a method  "renderApp" that returns HttpResponseNotFound', async () => {
    const ctx = new Context({
      accepts: (type: string) => type === "application/json",
    });

    const response = await appController.renderApp(ctx);
    ok(isHttpResponseNotFound(response));
  });
  it('should have a method "renderApp" that returns html', async () => {
    const ctx = new Context({
      accepts: (type: string) => type === "html",
    });

    const response = await appController.renderApp(ctx);

    ok(isHttpResponseOK(response));
  });
  it('should have a method "handleError" that handle general errors', async () => {
    const error = new Error("Test error");
    const ctx = new Context({});

    let errorResponse = appController.handleError(error, ctx);

    ok(isHttpResponseInternalServerError(errorResponse));
  });
  it('should have a method "handleError" that handle PrismaClientKnownRequestError', async () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      "Prisma error: Unique constraint violation",
      { code: "P2002", clientVersion: "Test" }
    );
    const ctx = new Context({});

    let errorResponse = appController.handleError(error, ctx);

    ok(isHttpResponseConflict(errorResponse));
  });
  it('should have a method "handleError" that handle other known PrismaClientKnownRequestError', async () => {
    const error = new Prisma.PrismaClientKnownRequestError(
      "Prisma error: Unique constraint violation",
      { code: "P2003", clientVersion: "Test" }
    );
    const ctx = new Context({});

    let errorResponse = appController.handleError(error, ctx);

    ok(isHttpResponseInternalServerError(errorResponse));
  });
  // Add more tests as needed...
});
