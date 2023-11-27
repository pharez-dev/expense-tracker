import {
  Context,
  HttpResponseOK,
  Post,
  ValidateBody,
  dependency,
} from "@foal/core";
import { AuthService } from "../services/index";
import { UserDto } from "../dtos/user.dto";
import { removeAuthCookie } from "@foal/jwt";

export class AuthController {
  @dependency
  authService: AuthService;

  @Post("/register")
  @ValidateBody({
    additionalProperties: false,
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
      name: { type: "string" },
    },
    required: ["email", "password"],
    type: "object",
  })
  async register(ctx: Context) {
    const { email, password, name } = ctx.request.body as UserDto;
    return await this.authService.register({ email, password, name });
  }

  @Post("/login")
  @ValidateBody({
    additionalProperties: false,
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
    required: ["email", "password"],
    type: "object",
  })
  async login(ctx: Context) {
    const { email, password } = ctx.request.body as UserDto;
    return await this.authService.login({ email, password });
  }

  @Post("/logout")
  async logout(ctx: Context) {
    const response = new HttpResponseOK();
    removeAuthCookie(response);
    return response;
  }
}
