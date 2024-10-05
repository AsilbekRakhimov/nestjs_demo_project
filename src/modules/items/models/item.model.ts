import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'items', timestamps: true, paranoid: true })
export class ItemTableModel extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue: 0,
  })
  count: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: false,
    defaultValue: 0,
  })
  cost: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: false,
    defaultValue: 'unknown',
  })
  country: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    unique: false,
  })
  image: string;
}
