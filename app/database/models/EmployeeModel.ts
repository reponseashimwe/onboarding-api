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
} from "sequelize-typescript";
import UserModel from "./UserModel";

@Table({
  tableName: "employees",
  timestamps: false,
})
class EmployeeModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(true)
  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => UserModel, "userId")
  user!: UserModel;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.INTEGER)
  fillPercentage!: number;

  @Default({})
  @Column(DataType.JSON)
  personalDetails!: Record<string, any>;

  @Default({})
  @Column(DataType.JSON)
  contactDetails!: Record<string, any>;

  @Default({})
  @Column(DataType.JSON)
  address!: Record<string, any>;

  @Default([])
  @Column(DataType.ARRAY(DataType.JSON))
  experience!: Record<string, any>[];

  @Default([])
  @Column(DataType.ARRAY(DataType.JSON))
  educationalBackground!: Record<string, any>[];

  @Default([])
  @Column(DataType.ARRAY(DataType.JSON))
  socialMediaProfiles!: Record<string, any>[];

  @AllowNull(true)
  @Column(DataType.STRING)
  salary!: string;

  @Default([])
  @Column(DataType.ARRAY(DataType.STRING))
  skills!: string[];

  @Default([])
  @Column(DataType.ARRAY(DataType.STRING))
  certificates!: string[];

  @Default([])
  @Column(DataType.ARRAY(DataType.STRING))
  languages!: string[];

  @Default({})
  @Column(DataType.JSON)
  bankInfo!: Record<string, any>;

  @Default(() => Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  startDate!: Date;

  @CreatedAt
  @Default(() => Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  createdAt!: Date;
}

export default EmployeeModel;
