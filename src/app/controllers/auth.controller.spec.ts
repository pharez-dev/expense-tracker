// App
import { AuthController } from "./auth.controller";
// std
import { strictEqual } from "assert";

// 3p
import {
  Config,
  Context,
  createController,
  getHttpMethod,
  getPath,
  isHttpResponseCreated,
  isHttpResponseOK,
  isHttpResponseUnauthorized,
} from "@foal/core";

import { UserDto } from "../dtos/user.dto";
import { prisma } from "../../db";

describe("AuthController", () => {
  let controller: AuthController;
  before(async () => {
    try {
      await prisma.user.delete({ where: { email: "phares1@mail.com" } });
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(() => (controller = createController(AuthController)));
  after(async () => {
    prisma.$disconnect().catch((err) => console.error(err));
  });
  describe('has a "login" method that', () => {
    it("should handle requests at POST /login.", () => {
      strictEqual(getHttpMethod(AuthController, "login"), "POST");
      strictEqual(getPath(AuthController, "login"), "/login");
    });

    it("should return a HttpResponseOK.", async () => {
      const userDto: UserDto = {
        email: "phares@mail.com",
        password: Config.get("test.correctPass"),
      };

      const ctx = new Context({
        body: userDto,
      });

      const response = await controller.login(ctx);

      if (!isHttpResponseOK(response)) {
        throw new Error(
          "The response should be an instance of HttpResponseOK."
        );
      }

      strictEqual(response.body.message, "Login successful");
    });

    it('should return a HttpResponseUnauthorized when wrong "email" is provided', async () => {
      const userDto: UserDto = {
        email: "nomail@mail.com",
        password: Config.get("test.correctPass"),
      };

      const ctx = new Context({
        body: userDto,
      });

      const response = await controller.login(ctx);

      if (!isHttpResponseUnauthorized(response)) {
        throw new Error(
          "The response should be an instance of isHttpResponseUnauthorized"
        );
      }
    });

    it('should return a HttpResponseUnauthorized when wrong "password" is provided', async () => {
      const userDto: UserDto = {
        email: "phares@mail.com",
        password: Config.get("test.wrongPass"),
      };

      const ctx = new Context({
        body: userDto,
      });

      const response = await controller.login(ctx);
      if (!isHttpResponseUnauthorized(response)) {
        throw new Error(
          "The response should be an instance of isHttpResponseUnauthorized"
        );
      }
    });

    it("should handle requests at POST /register.", () => {
      strictEqual(getHttpMethod(AuthController, "register"), "POST");
      strictEqual(getPath(AuthController, "register"), "/register");
    });
    it("should register new users.", async () => {
      const userDto: UserDto = {
        email: "phares1@mail.com",
        password: Config.get("test.correctPass"),
        name: "pharestest",
      };

      const ctx = new Context({
        body: userDto,
      });

      const response = await controller.register(ctx);

      if (!isHttpResponseCreated(response)) {
        throw new Error(
          "The response should be an instance of isHttpResponseCreated"
        );
      }
    });

    it("should handle requests at POST /logout.", () => {
      strictEqual(getHttpMethod(AuthController, "register"), "POST");
      strictEqual(getPath(AuthController, "register"), "/register");
    });

    it("should log out users.", async () => {
      const ctx = new Context({});

      const response = await controller.logout(ctx);

      if (!isHttpResponseOK(response)) {
        throw new Error(
          "The response should be an instance of isHttpResponseOK"
        );
      }
    });
  });
});
