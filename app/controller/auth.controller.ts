import {
  Route,
  Controller,
  Post,
  Tags,
  Response,
  Body,
  Put,
  Security,
  Inject,
  Get,
} from "tsoa";
import { IJWTPayload, ILogin, IRegister, IUser } from "../type";
import UserModel from "../database/models/UserModel";
import { compare, encrypt } from "../utils/Password";
import CustomError from "../utils/CustomError";
import { genToken } from "../utils/jwt";

@Tags("Authorization")
@Route("api/auth")
export class AuthController extends Controller {
  @Response(201)
  @Post("register")
  public static async register(@Body() data: IRegister): Promise<IJWTPayload> {
    try {
      const password = await encrypt(data.password);
      const user = await UserModel.create({ ...data, password });
      if (!user || user == null) throw new CustomError("Creation failed");
      const response = await this.login({
        email: data.email,
        password: data.password,
      });
      return response;
    } catch (error) {
      throw new CustomError("Creation failed");
    }
  }

  @Post("login")
  public static async login(@Body() data: ILogin): Promise<IJWTPayload> {
    const user = await UserModel.findOne({ where: { email: data.email } });
    if (user == null) throw new CustomError("Unknown credentials");

    const comparePasswords = compare(data.password, user.password);
    if (!comparePasswords) throw new CustomError("Unknown credentials");

    const token = await genToken({ email: data.email });
    return { user, accessToken: token };
  }

  @Security("jwtAuth")
  @Get("/")
  public static async me(@Inject() id: number): Promise<IUser> {
    const user = await UserModel.findByPk(id);
    return user?.toJSON() as unknown as IUser;
  }
}
