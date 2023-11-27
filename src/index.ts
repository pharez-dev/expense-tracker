import "source-map-support/register";

// 3p
import {
  Config,
  ServiceManager,
  createApp,
  displayServerURL,
} from "@foal/core";

// App
import { AppController } from "./app/app.controller";
import { prisma } from "./db";
import { PrismaClient } from "@prisma/client";

async function main() {
  const serviceManager = new ServiceManager().set(PrismaClient, prisma);

  const app = await createApp(AppController, { serviceManager });

  const port = Config.get("port", "number", 3001);
  app.listen(port, () => displayServerURL(port));
}

main()
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect().catch((err) => console.error(err));
  });
