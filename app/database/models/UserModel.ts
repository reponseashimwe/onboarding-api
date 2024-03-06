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
  HasOne,
} from "sequelize-typescript";

@Table({
  tableName: "users",
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
}

export default UserModel;
