import {
  HasMany,
  Table,
  Default,
  AllowNull,
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
import OrganizationModel from "./OrganizationModel";

@Table({
  tableName: "roles",
  timestamps: false,
})
class RoleModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(true)
  @ForeignKey(() => OrganizationModel)
  @Column(DataType.INTEGER)
  organizationId!: number;

  @BelongsTo(() => OrganizationModel, "organizationId")
  organization!: OrganizationModel;

  @CreatedAt
  @Default(Sequelize.fn("NOW"))
  @Column(DataType.DATE)
  createdAt!: Date;
}

export default RoleModel;
