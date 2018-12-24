const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
module.exports = router


passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.client_id,
      clientSecret: process.env.client_secret,
      callbackURL: process.env.redirect_uri
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log('****** PROFILE *******', profile)
      console.log('*******ACCESS TOKEN*****', accessToken)
      User.findOrCreate({
        where: {spotifyId: profile.id},
        defaults: {name: profile.displayName, email: profile.emails[0].value, accessToken: accessToken, imageUrl: profile.photos[0]}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )
)

router.get('/', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private', 'user-library-read', 'playlist-read-private'],
  showDialog: true
}))

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home')
  }
)
