import { sign } from "jsonwebtoken";
import { promisify } from "util";

import { getSecretOrPrivateKey, setAuthCookie } from "@foal/jwt";
import { UserDto } from "../dtos/user.dto";
import {
  HttpResponse,
  HttpResponseConflict,
  HttpResponseCreated,
  HttpResponseInternalServerError,
  HttpResponseOK,
  HttpResponseUnauthorized,
  Logger,
  dependency,
  hashPassword,
  verifyPassword,
} from "@foal/core";
import { PrismaClient } from "@prisma/client";

export class AuthService {
  @dependency
  logger: Logger;
  @dependency
  prisma: PrismaClient;

  async register(
    userData: UserDto
  ): Promise<
    HttpResponse | HttpResponseInternalServerError | HttpResponseConflict
  > {
    this.logger.info(`UserService: Register ${userData.password} `);

    const hashedPassword: string = await hashPassword(userData.password);

    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
      },
    });
    const savedUser: {
      password?: string;
      id: number;
      email: string;
      name?: string | null;
    } = {
      ...user,
    };
    delete savedUser.password;
    this.logger.info(`UserService: Saved user ${JSON.stringify(savedUser)} `);

    const response = new HttpResponseCreated(savedUser);
    await setAuthCookie(response, await this.createJWT(user));
    return response;
  }

  async login(userData: UserDto): Promise<HttpResponse> {
    const user = await this.prisma.user.findFirst({
      where: { email: userData.email },
    });

    this.logger.info(`Login: ${user}`);
    if (!user) {
      return new HttpResponseUnauthorized();
    }

    if (!(await verifyPassword(userData.password, user.password))) {
      return new HttpResponseUnauthorized();
    }
    const token: string = await this.createJWT(user);
    const response = new HttpResponseOK({ message: "Login successful", token });
    await setAuthCookie(response, token);

    return response;
  }

  private async createJWT(user: UserDto): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return promisify(sign as any)(payload, getSecretOrPrivateKey(), {
      subject: user.id?.toString(),
    });
  }
}
