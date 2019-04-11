const config = require('config');
const Koa = require('koa');
const passport = require('koa-passport');
const Router = require('koa-router');
const GoogleStrategy = require('passport-google-auth').Strategy;

const router = new Router();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

passport.use(new GoogleStrategy({
    clientId: config.get('google.clientId'),
    clientSecret: config.get('google.clientSecret'),
    callbackURL: config.get('frontURL')
},
function(token, tokenSecret, profile, done) {
    done(null, profile)
}));

router.get('/auth/google', passport.authenticate('google'));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/' }
));

module.exports = router;

