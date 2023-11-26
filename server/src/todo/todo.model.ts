import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/shared/user.model';

@Table
export class Todo extends Model {
  @Column
  todo: string;

  @Column
  description?: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, unique: true })
  UserId: number;

  static paginate(query: any, page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const options = {
      ...query,
      order: [['updatedAt', 'desc']],
      offset,
      limit,
    };

    return Todo.findAndCountAll(options);
  }
}
