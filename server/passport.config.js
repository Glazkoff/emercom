const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userDB = {
    id: 1,
    login: "login",
    password: "1234"
};

passport.serializeUser(function (user, done) {
    console.log('Сериализация: ', user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('Десериализация: ', id);
    const user = (userDB.id == id) ? userDB : false
    done(null, user);
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
));