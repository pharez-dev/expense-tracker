import {
  All,
  Context,
  controller,
  HttpResponse,
  HttpResponseConflict,
  HttpResponseInternalServerError,
  HttpResponseNotFound,
  IAppController,
  render,
} from "@foal/core";

import { AuthController, UserController } from "./controllers";
import { Prisma } from "@prisma/client";

export class AppController implements IAppController {
  subControllers = [
    controller("/user", UserController),
    controller("/auth", AuthController),
  ];

  @All("*")
  renderApp(ctx: Context) {
    if (!ctx.request.accepts("html")) {
      return new HttpResponseNotFound();
    }

    return render("./public/404.html");
  }
  handleError(
    error: Error,
    ctx: Context
  ): HttpResponse | Promise<HttpResponse> {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Handle unique constraint violation
        return new HttpResponseConflict({
          error: "Prisma error: Unique constraint violation",
          message:
            "Duplicate key received. Your request could not be processed.",
          path: ctx.request.path,
        });
      } else {
        // Handle other known request errors

        return new HttpResponseInternalServerError({
          error: error.message,
          message: "An error occured. Your request could not be processed.",
          path: ctx.request.path,
        });
      }
    }

    return new HttpResponseInternalServerError({
      error: error.message,
      message: "An error occured. Your request could not be processed.",
      path: ctx.request.path,
    });
  }
}
