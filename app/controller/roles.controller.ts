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
import { IRole, IRoleCreate } from "../type";
import CustomError from "../utils/CustomError";
import RoleModel from "../database/models/RoleModel";

@Tags("Roles")
@Route("api/roles")
@Security("jwtAuth")
export class RoleController extends Controller {
  @Response(201)
  @Post()
  public static async create(@Body() data: IRoleCreate): Promise<IRole> {
    try {
      const role = await RoleModel.create({ ...data });

      return role.toJSON();
    } catch (error) {
      throw new CustomError("Creation failed");
    }
  }

  @Get()
  public static async getAll(): Promise<IRole[]> {
    const roles = (await RoleModel.findAll({
      order: [["createdAt", "DESC"]],
    })) as unknown as IRole[];
    return roles;
  }

  @Get("{id}")
  public static async getOne(@Path() id: number): Promise<IRole> {
    const role = await RoleModel.findByPk(id);
    return role?.toJSON() as unknown as IRole;
  }

  @Put("{id}")
  public static async update(
    @Path() id: number,
    @Body() data: IRoleCreate
  ): Promise<IRole> {
    await RoleModel.update({ data }, { where: { id } });
    const role = await RoleModel.findByPk(id);
    return role?.toJSON() as unknown as IRole;
  }

  @Delete("{id}")
  public static async delete(@Path() id: number): Promise<boolean> {
    await RoleModel.destroy({ where: { id } });
    return true;
  }
}
