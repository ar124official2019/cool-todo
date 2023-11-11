'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: "UserId", as: "user" });
    }

    static paginate (query, page, pageSize) {
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
    
      const options = {
        ...query,
        order: [["updatedAt", "desc"]],
        offset,
        limit,
      };

      return Todo.findAndCountAll(options);
    };    
  }

  Todo.init({
    todo: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todo',
  });

  return Todo;
};