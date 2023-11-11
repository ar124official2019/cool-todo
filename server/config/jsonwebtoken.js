const { sign } = require("jsonwebtoken");

module.exports = {
  sign: (data) => {
    return new Promise((res, rej) => {
      sign(
        data,
        "secret",
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
