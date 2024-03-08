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
import { IOrganization, IOrganizationCreate, IRegister } from "../type";
import { catchSequelizeError } from "../utils/CustomError";
import OrganizationModel from "../database/models/OrganizationModel";
import UserModel from "../database/models/UserModel";
import { where } from "sequelize";

@Tags("Organizations")
@Route("api/organizations")
@Security("jwtAuth")
export class OrganizationController extends Controller {
  @Response(201)
  @Post()
  public static async create(
    @Body() data: IOrganizationCreate
  ): Promise<IOrganization | null> {
    try {
      const organization = await OrganizationModel.create({
        ...data,
      });

      if (data.hrId !== null) {
        await UserModel.update(
          { organizationId: organization.id },
          { where: { id: data.hrId } }
        );
      }

      return organization.toJSON();
    } catch (error: any) {
      catchSequelizeError({ item: "Organization", error });
      return null;
    }
  }

  @Get()
  public static async getAll(): Promise<IOrganization[]> {
    const organizations = (await OrganizationModel.findAll({
      order: [["createdAt", "DESC"]],
    })) as unknown as IOrganization[];
    return organizations;
  }

  @Get("{id}")
  public static async getOne(@Path() id: number): Promise<IOrganization> {
    const organization = await OrganizationModel.findByPk(id);
    return organization?.toJSON() as unknown as IOrganization;
  }

  @Put("{id}")
  public static async update(
    @Path() id: number,
    @Body() data: IOrganizationCreate
  ): Promise<IOrganization> {
    await OrganizationModel.update({ data }, { where: { id } });
    if (data.hrId !== null) {
      await UserModel.update(
        { organizationId: id },
        { where: { id: data.hrId } }
      );
    }
    const organization = await OrganizationModel.findByPk(id);
    return organization?.toJSON() as unknown as IOrganization;
  }

  @Delete("{id}")
  public static async delete(@Path() id: number): Promise<boolean> {
    await OrganizationModel.destroy({ where: { id } });
    return true;
  }
}
