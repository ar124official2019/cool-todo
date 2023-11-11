const { User } = require('../models');
const { AppResponse } = require('../config/app');

class AuthController {
  static async signup(req, res, next) {
    try {
      const info = req.body;
      
      let user = await User.findOne({
        where: { email: info.email },
      });

      if (user) throw AppResponse.createError(
        {
          exists: true,
        },
        "User already exists!",
        400
      );

      user = await User.create(info);
      const values = user.get();
      delete values.password;
      res.status(201).json(AppResponse.create(user, '', 201));
    } catch (err) {
      next(err);
    }
  }
  
  static async login(req, res, next) {
    try {
      const info = req.body;
      let result;

      try {
        result = await User.login(info);
      } catch (err) {
        if (err === 0)
          throw AppResponse.createError(
            null,
            "Invalid email or password!",
            401
          );

        throw err;
      }

      res.json(AppResponse.create(result));
    } catch (err) {
      next(err);
    }
  }
  
  static async googleLoginPersist(req, res, next) {
    try {
      const user = req.user;
      const result = await User.generateToken(user);
      await logout(req).catch((err) => console.error(`Error:`, err));
      res.json(AppResponse.create(result));
    } catch (err) {
      next(err);
    }
  }
}

async function logout(req) {
  return new Promise((res, rej) => {
    req.logout(function (err) {
      if (err) rej(err);
      return res();
    });
  });
}

module.exports = AuthController;