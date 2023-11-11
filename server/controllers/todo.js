const { AppResponse } = require('../config/app');
const { Todo } = require('../models');

class TodoController {
  static async createOne(req, res, next) {
    try {
      const info = req.body;
      const user = req.user;

      const todo = await Todo.create({
        ...info,
        UserId: user.id
      });
      
      res.json(AppResponse.create(todo));
    } catch (err) {
      next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      const id = req.params.id;
      const info = req.body;
      const user = req.user;
      const query = {
        where: {
          id,
          UserId: user.id,
        },
      };

      const todo = await Todo.update(
        {
          ...info,
          id,
          UserId: user.id,
        },
        query
      );
      
      res.json(AppResponse.create(await Todo.findOne(query)));
    } catch (err) {
      next(err);
    }
  }

  static async get(req, res, next) {
    try {
      const user = req.user;
      let page = Number(req.query.page || 0);
      if (isNaN(page) || page < 1) page = 1;
      let limit = Number(req.query.limit || 0);
      if (isNaN(limit) || limit < 1) limit = 10;
      
      const todos = await Todo.paginate(
        {
          where: {
            UserId: user.id,
          },
        },
        page,
        limit
      );

      res.json(AppResponse.create(todos));
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = req.params.id;
      const user = req.user;

      const todo = await Todo.findOne({
        where: {
          id,
          UserId: user.id,
        },
      });

      if (!todo)
        throw AppResponse.create({ notFound: true }, "No such todo!", 404);

      res.json(AppResponse.create(todo));
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const id = Number(req.params.id) || 0;
      const user = req.user;

      const deleted = await Todo.destroy({
        where: {
          id,
          UserId: user.id,
        },
      });

      if (!deleted)
        throw AppResponse.create({ notFound: true }, "No such todo!", 404);

      res.json(AppResponse.create({ id }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodoController;