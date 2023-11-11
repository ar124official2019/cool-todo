const { sign } = require("jsonwebtoken");
const { vars } = require("./app");

module.exports = {
  sign: (data) => {
    return new Promise((res, rej) => {
      sign(
        data,
        vars.SECRET,
        {
          expiresIn: "1d",
        },
        (err, token) => {
          if (err) return rej(err);
          return res(token);
        }
      );
    });
  },
};
