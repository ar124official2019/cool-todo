import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async create(info: Todo, userId: number) {
    return (
      (await this.todoModel.create({
        ...info,
        UserId: userId,
      })) || null
    );
  }

  async update(id: string, userId: string, info: Todo) {
    const query = {
      where: {
        id,
        UserId: userId,
      },
    };

    const result = await this.todoModel.update(
      {
        ...info,
        ...query.where,
      },
      query,
    );

    if (!result.length) return null;
    return this.todoModel.findOne(query);
  }

  async get(userId: number, page: number, limit: number) {
    return this.todoModel.paginate(
      {
        where: {
          UserId: userId,
        },
      },

      page,
      limit,
    );
  }

  async getOne(id: number, userId: number) {
    return (
      (await this.todoModel.findOne({ where: { id, UserId: userId } })) || null
    );
  }

  async delete(id: number, userId: number) {
    return !!(await this.todoModel.destroy({
      where: { id, UserId: userId },
    }));
  }
}
