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
  Inject,
} from "tsoa";
import { IEmployee, IOrganization, IUser, IUserCreate } from "../type";
import CustomError from "../utils/CustomError";
import UserModel from "../database/models/UserModel";
import { encrypt } from "../utils/Password";
import OrganizationModel from "../database/models/OrganizationModel";
import EmployeeModel from "../database/models/EmployeeModel";

@Tags("Employees")
@Route("api/employees")
@Security("jwtAuth")
export class EmployeesController extends Controller {
  @Response(201)
  @Post()
  public static async create(
    @Body() data: IEmployee,
    @Inject() organization: number
  ): Promise<IUser> {
    try {
      const userPass = await encrypt("Password"); // Default password
      const organizationDomain = (
        (await OrganizationModel.findByPk(organization)) as IOrganization
      ).domain;
      const userEmail = data.personalDetails?.fullname
        ?.replace(" ", "")
        .concat("@")
        .concat(organizationDomain);
      const user = await UserModel.create({
        email: userEmail,
        phone: data.contactDetails?.phoneNumber,
        password: userPass,
        organizationId: organization,
      });
      const userJSON = user.toJSON();
      const fillPercentage = calculateFillPercentage(data);

      await EmployeeModel.create({
        ...data,
        fillPercentage,
        userId: user.id,
      });

      return user;
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
    @Body() data: IEmployee
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
