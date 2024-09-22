const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			clientID: "532979987392-ug1nvfev69ef2krg49sfuuvq35cohtrm.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});