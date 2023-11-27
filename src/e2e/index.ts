// 3p
import { ServiceManager, createApp } from "@foal/core";
import * as request from "supertest";

// App
import { AppController } from "../app/app.controller";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../db";

describe("The server", () => {
  let app;

  before(async () => {
    const serviceManager = new ServiceManager().set(PrismaClient, prisma);
    app = await createApp(AppController, { serviceManager });
  });

  after(async () => {
    prisma.$disconnect().catch((err) => console.error(err));
  });

  it("should return a 200 status on GET / requests.", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});
