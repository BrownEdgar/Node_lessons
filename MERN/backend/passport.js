const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "97464951445-0v0im5kmns3lhhe479oemn4pn43m2dk1.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "your id";
GITHUB_CLIENT_SECRET = "your id";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("user:", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
// user: {
//   id: '110719829626293516118',
//     displayName: 'Edgar nikoghosyan',
//       name: { familyName: 'nikoghosyan', givenName: 'Edgar' },
//   photos: [
//     {
//       value: 'https://lh3.googleusercontent.com/a/AAcHTtdtzBPsjZwb9pmCZHdwLuAHU6jVBfz64INnlkKVm74dzgg=s96-c'
//     }
//   ],
//     provider: 'google',