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
import { IJWTPayload, ILogin, IOrganization, IRegister, IUser } from "../type";
import UserModel from "../database/models/UserModel";
import { compare, encrypt } from "../utils/Password";
import CustomError, { catchSequelizeError } from "../utils/CustomError";
import { genToken } from "../utils/jwt";
import { OrganizationController } from "./organization.controller";
import OrganizationModel from "../database/models/OrganizationModel";

@Tags("Authorization")
@Route("api/auth")
export class AuthController extends Controller {
  @Response(201)
  @Post("register")
  public static async register(
    @Body() data: IRegister
  ): Promise<IJWTPayload | null> {
    try {
      const password = await encrypt(data.password);
      const user = await UserModel.create({
        ...data,
        organizationData: undefined,
        password,
        isHR: true,
      });
      if (!user || user == null) throw new CustomError("Creation failed");
      const organizationData = { ...data.organizationData, hrId: user.id };
      const organization = (await OrganizationModel.create({
        ...organizationData,
      })) as IOrganization;

      await UserModel.update(
        { organizationId: organization.id },
        { where: { id: user.id } }
      );

      const tokenData = await this.login({
        email: data.email,
        password: data.password,
      });
      return {
        ...{ ...user.toJSON(), organization },
        accessToken: tokenData.accessToken,
      };
    } catch (error) {
      catchSequelizeError({ item: "User", error });
      return null;
    }
  }

  @Post("login")
  public static async login(@Body() data: ILogin): Promise<IJWTPayload> {
    const user = await UserModel.findOne({
      where: { email: data.email },
      include: ["organization"],
    });
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
