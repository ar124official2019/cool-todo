const { ExtractJwt, Strategy } = require("passport-jwt");
const { User } = require("../../models");
const passport = require("passport");
const { AppResponse } = require("../app");

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    async function (payload, done) {
      try {
        const user = await User.findOne({
          where: {
            id: payload.id,
          },
        });

        if (!user)
          return done(
            0,
            false,
            AppResponse.createError(null, "Invalid auth token!", 401)
          );
          
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
