const config = require('config');
const passport = require('koa-passport');
const Router = require('koa-router');
const GoogleStrategy = require('passport-google-auth').Strategy;
const userService = require('./services/userService');

const router = new Router();

passport.serializeUser((user, done) => { // Triggers on log in
    userService.saveUser(user);
    done(null, user);
});

passport.deserializeUser(async(user, done) => { // Triggers when loading any page while logged in
    const userBack = await userService.getUserById(user.id);
    done(null, userBack)
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

router.get('/logout', ctx => {
    ctx.logout();
    ctx.redirect('back')
});

module.exports = router;

