import {
  HasMany,
  Table,
  Default,
  AllowNull,
  Unique,
  PrimaryKey,
  ForeignKey,
  Model,
  Column,
  DataType,
  Sequelize,
  AutoIncrement,
  CreatedAt,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import OrganizationModel from "./OrganizationModel";
import EmployeeModel from "./EmployeeModel";

@Table({
  tableName: "users",
  timestamps: false,
})
class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phone!: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isHR!: boolean;

  @AllowNull(true)
  @ForeignKey(() => OrganizationModel)
  @Column(DataType.INTEGER)
  organizationId!: number;

  @BelongsTo(() => OrganizationModel, "organizationId")
  organization!: OrganizationModel;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isSuperAdmin!: boolean;

  @CreatedAt
  @Default(Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  createdAt!: Date;

  @HasOne(() => EmployeeModel, "userId")
  employeeDetails!: EmployeeModel;
}

export default UserModel;
