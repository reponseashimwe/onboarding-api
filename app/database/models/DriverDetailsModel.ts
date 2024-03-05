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
  DeletedAt,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from "sequelize-typescript";
import UserModel from "./UserModel";

@Table({
  tableName: "driver_details",
})
class DriverDetailsModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => UserModel)
  @Column(DataType.STRING)
  userId!: number;

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  driverNID!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  driverPlateNo!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  driverLicence!: string;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt!: Date;

  @CreatedAt
  @Default(Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Default(Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsTo(() => UserModel, "userId")
  user!: UserModel;
}

export default DriverDetailsModel;
