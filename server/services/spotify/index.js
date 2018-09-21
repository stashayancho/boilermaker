const SpotifyWebApi = require('spotify-web-api-node')
// const refresh = require('spotify-refresh')


var spotifyApi = new SpotifyWebApi({
  clientId: process.env.client_id,
  clientSecret: process.env.client_secret,
  redirectUri: process.env.redirect_uri
})

// refresh(refreshToken, clientID, clientSecret, function (err, res, body) {
//   if (err) return
//   body = json.parse(body)
//   console.log(JSON.stringify(body))
// })

// spotifyApi.setAccessToken('<???????>')
const compareGenres = async spotifyId => {
  let playlistObjs = await spotifyApi.getUserPlaylists(spotifyId)
  let playlistTracks = []
  await playlistObjs.body.items.forEach(async playlistObj => {
    let tracks = await spotifyApi.getPlaylistTracks(playlistObj.id)
    return tracks.body.items.forEach(item => playlistTracks.push(item.track))
  })
  await console.log('tracks array', playlistTracks)

  let artists = []
  await console.log('one track?', playlistTracks[0])
  // await playlistTracks.forEach(async track => {
  //   await console.log('track artist id', track.artist[0].id)
  //   let artist = spotifyApi.getArtist(track.artists[0].id)
  //   return artists.push(artist)
  // })
  console.log('artists array?', artists)


}

module.exports = {spotifyApi, compareGenres}

