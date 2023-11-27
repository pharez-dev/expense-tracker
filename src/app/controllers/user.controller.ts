import {
  ApiInfo,
  ApiServer,
  Context,
  Get,
  Post,
  ServiceManager,
  dependency,
} from "@foal/core";
import { UserService } from "../services/index";
import { JWTRequired } from "@foal/jwt";
import { PrismaClient } from "@prisma/client";
import { TransactionType } from "../dtos/user.dto";

@ApiInfo({
  title: "User API",
  version: "1.0.0",
})
@ApiServer({
  url: "/user",
})
export class UserController {
  @dependency
  userService: UserService;

  @JWTRequired({
    user: (id: number, services: ServiceManager) =>
      services.get(PrismaClient).user.findFirst({
        where: { id },
      }),
  })
  @Get("/transactions")
  getTransactions(ctx: Context) {
    const type: TransactionType = ctx.request.query.type;
    return this.userService.getTransactions(
      {
        ...ctx.user,
      },
      type
    );
  }

  @JWTRequired({
    user: (id: number, services: ServiceManager) =>
      services.get(PrismaClient).user.findFirst({
        where: { id },
      }),
  })
  @Post("/createTransaction")
  createTransaction(ctx: Context) {
    return this.userService.createTransactions(
      {
        ...ctx.user,
      },
      { ...ctx.request.body }
    );
  }
}
