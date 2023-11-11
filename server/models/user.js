"use strict";
const { hash, compare } = require("bcrypt");
const { Model } = require("sequelize");
const { sign } = require("../config/jsonwebtoken");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Todo, { sourceKey: "id" });
    }

    static async login({ email, password }) {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw 0;
      const result = await compare(password, user.get("password"));
      if (!result) throw 0;

      const info = user.get();
      delete info.password;

      const token = await sign(info);
      return { info, token };
    }

    static async generateToken(info) {
      delete info.password;
      const token = await sign(info);
      return { info, token };
    }
  }

  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",

      hooks: {
        beforeSave: async (user) => {
          if (
            (user.isNewRecord || user.changed("password")) &&
            !!user.get("password")
          ) {
            const hashedPassword = await hash(
              user.getDataValue("password"),
              10
            );
            
            user.setDataValue("password", hashedPassword);
          }
        },
      },
    }
  );
  
  return User;
};
