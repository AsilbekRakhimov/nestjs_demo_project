import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class UsersModel extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: true,
    unique: false,
    type: DataType.TEXT,
  })
  fullName: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.TEXT,
  })
  email: string;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.TEXT,
  })
  password: string;

  @Column({
    allowNull: false,
    unique: false,
    type: DataType.TEXT,
  })
  phoneNumber: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
    unique: false,
  })
  role: string;
}
