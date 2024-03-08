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
import UserModel from "./UserModel";

@Table({
  tableName: "organizations",
  timestamps: false,
})
class OrganizationModel extends Model {
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
  domain!: string;

  @AllowNull(true)
  @ForeignKey(() => UserModel)
  @Column(DataType.INTEGER)
  hrId!: number;

  @BelongsTo(() => UserModel, "hrId")
  hrManager!: UserModel;

  @CreatedAt
  @Default(Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  createdAt!: Date;
}

export default OrganizationModel;
