const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const { vars } = require('../app');
const { User } = require("../../models");

passport.use(
  "google",

  new GoogleStrategy(
    {
      clientID: vars.GOOGLE_CLIENT_ID,
      clientSecret: vars.GOOGLE_CLIENT_SECRERT,
      callbackURL: "/api/v1/auth/login/google/success",
      scope: ["email", "profile"],
    },

    async function (_issuer, data, done) {
      try {
        const email = data?.emails[0]?.value;
        const fullName =
          data?.displayName || `${data?.name?.givenName} ${data?.name?.name}`;

        let user = await User.findOne({
          where: {
            email,
          },
        }).catch((err) => {
          throw err;
        });

        if (!user) {
          user = await User.create({ email, fullName });
        }
          
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);