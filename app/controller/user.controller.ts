import {
  Route,
  Controller,
  Post,
  Tags,
  Response,
  Body,
  Put,
  Security,
  Get,
  Path,
  Delete,
} from "tsoa";
import { IUser, IUserCreate } from "../type";
import CustomError from "../utils/CustomError";
import UserModel from "../database/models/UserModel";

@Tags("Users")
@Route("api/users")
@Security("jwtAuth")
export class UserController extends Controller {
  @Response(201)
  @Post()
  public static async create(@Body() data: IUserCreate): Promise<IUser> {
    try {
      const user = await UserModel.create({ ...data, isHR: true });

      return user.toJSON();
    } catch (error) {
      throw new CustomError("Creation failed");
    }
  }

  @Get()
  public static async getAll(): Promise<IUser[]> {
    const users = (await UserModel.findAll({
      order: [["createdAt", "DESC"]],
    })) as unknown as IUser[];
    return users;
  }

  @Get("{id}")
  public static async getOne(@Path() id: number): Promise<IUser> {
    const user = await UserModel.findByPk(id);
    return user?.toJSON() as unknown as IUser;
  }

  @Put("{id}")
  public static async update(
    @Path() id: number,
    @Body() data: IUserCreate
  ): Promise<IUser> {
    await UserModel.update({ data }, { where: { id } });
    const user = await UserModel.findByPk(id);
    return user?.toJSON() as unknown as IUser;
  }

  @Delete("{id}")
  public static async delete(@Path() id: number): Promise<boolean> {
    await UserModel.destroy({ where: { id } });
    return true;
  }
}
