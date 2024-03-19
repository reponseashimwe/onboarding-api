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
import calculateFillPercentage from "../utils/CalculateFilledPercentage";
import { Op } from "sequelize";

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

      const userNames = data.personalDetails?.fullname?.split(" ") as string[];
      const userEmail = userNames[0][0]
        .concat(".")
        .concat(userNames[userNames.length - 1])
        .toLowerCase();
      const otherUsers = await UserModel.findAll({
        where: { email: { [Op.iLike]: `${userEmail}%` } },
      });
      const email =
        otherUsers.length > 0
          ? userEmail.concat(otherUsers.length.toString())
          : userEmail;
      const user = await UserModel.create({
        email: email.concat("@").concat(organizationDomain),
        phone: data.contactDetails?.phoneNumber,
        password: userPass,
        name: data.personalDetails?.fullname,
        organizationId: organization,
      });
      const userJSON = user.toJSON();
      const fillPercentage = Math.floor(calculateFillPercentage(data));

      await EmployeeModel.create({
        ...data,
        fillPercentage,
        userId: userJSON.id,
      });

      return user;
    } catch (error) {
      console.error(error);
      throw new CustomError("Creation failed");
    }
  }

  @Get()
  public static async getAll(@Inject() user: IUser): Promise<IUser[]> {
    const users = (await UserModel.findAll({
      order: [["createdAt", "DESC"]],
      where: user.isSuperAdmin ? {} : { organizationId: user.organizationId },
      include: ["employeeDetails"],
      attributes: { exclude: ["password"] },
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
    await UserModel.update({ ...data }, { where: { id } });
    const user = await UserModel.findByPk(id);
    return user?.toJSON() as unknown as IUser;
  }

  @Delete("{id}")
  public static async delete(@Path() id: number): Promise<boolean> {
    await UserModel.destroy({ where: { id } });
    return true;
  }
}
