const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2')

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET, 
    callbackURL: 'http://localhost:5000/api/auth/google/redirect'
}, () => {

}))