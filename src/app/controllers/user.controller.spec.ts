// std
import { ok, strictEqual } from "assert";

// 3p
import {
  Context,
  createController,
  getHttpMethod,
  getPath,
  isHttpResponseCreated,
  isHttpResponseOK,
} from "@foal/core";

// App
import { UserController } from "./user.controller";
import assert = require("assert");
import { prisma } from "../../db";

describe("UserController", () => {
  let controller: UserController;

  before(async () => {
    try {
      await prisma.transaction.delete({ where: { transactionId: "PE2FE2ND" } });
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(() => (controller = createController(UserController)));

  describe('has a "transactions" method that', () => {
    it("should handle requests at GET /transactions", () => {
      strictEqual(getHttpMethod(UserController, "getTransactions"), "GET");
      strictEqual(getPath(UserController, "getTransactions"), "/transactions");
    });
    it("should require filter CREDIT", async () => {
      const ctx = new Context({
        query: { type: "CREDIT" },
      });

      const response = await controller.getTransactions(ctx);
      // Log the actual response for debugging purposes
      //  console.log("Actual Response:", response);

      assert(
        response.body.hasOwnProperty("transactions"),
        'Response should have a "transactions" property.'
      );
    });
    it("should require filter debit", async () => {
      const ctx = new Context({
        query: { type: "DEBIT" },
      });

      const response = await controller.getTransactions(ctx);
      // Log the actual response for debugging purposes
      // console.log("Actual Response:", response);

      assert(
        response.body.hasOwnProperty("transactions"),
        'Response should have a "transactions" property.'
      );
    });
    it("should return an HttpResponseOK.", async () => {
      const ctx = new Context({
        query: {},
      });
      const response = await controller.getTransactions(ctx);

      // Log the actual response for debugging purposes
      //  console.log("Actual Response:", response);

      ok(isHttpResponseOK(response));
    });

    it("should handle requests at POST /createTransaction", () => {
      strictEqual(getHttpMethod(UserController, "createTransaction"), "POST");
      strictEqual(
        getPath(UserController, "createTransaction"),
        "/createTransaction"
      );
    });
    it("should create a transaction", async () => {
      const ctx = new Context({
        body: {
          amount: "50",
          transactionId: "PE2FE2ND",
          balance: "233",
          recipient: "Brenda Chep",
          createdAt: "2023-11-26T10:29:38.935Z",
          type: "CREDIT",
        },
      });
      ctx.user = {
        id: 1,
        email: "phares@mail.com",
        name: "Phares",
      };
      const response = await controller.createTransaction(ctx);

      // Log the actual response for debugging purposes
      //  console.log("Actual Response:", response);

      ok(isHttpResponseCreated(response));
    });
  });
});
