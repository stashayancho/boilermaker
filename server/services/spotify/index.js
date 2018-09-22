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

const getPlaylistGenres = async spotifyId => {
  let playlistObjs = await spotifyApi.getUserPlaylists(spotifyId)
  let artistIds = []
  let artistsIds = []
  let genres = []

  // await playlistObjs.body.items.forEach(playlistObj => {
  //   spotifyApi.getPlaylistTracks(playlistObj.id)
  //   .then(trackData => {
  //     trackData.body.items.forEach(item => artistIds.push(item.track.artists[0].id))
  //     artistsIds.push(artistIds)
  //   })
  // })
  // console.log('tracks array', artistIds)
  // Promise.resolve(artistIds).then(artistIds1 => {
  //   for (let i = 0; i < artistIds1.length; i += 50) {
  //     let chunk = artistIds1.slice(i, i + 50)
  //     console.log('chunk', chunk)
  //     artistsIds.push(chunk)
  //   }
  //   return artistsIds
  // })

  // await playlistObjs.body.items.forEach(playlistObj => {
  //   spotifyApi.getPlaylistTracks(playlistObj.id)
  //   .then(trackData => {
  //     return trackData.body.items.forEach(item => artistIds.push(item.track.artists[0].id))
  //   })
  //   console.log('artistIds array', artistIds)
  //   Promise.resolve(artistIds).then(artistIds1 => {
  //     // for (let i = 0; i < artistIds1.length; i += 50) {
  //     //   console.log('here')
  //     //   let chunk = artistIds1.slice(i, i + 50)
  //     //   console.log('chunk', chunk)
  //     //   artistsIds.push(chunk)
  //     // }
  //     return artistIds1.slice(0,50)
  //   })
  //   console.log('artists arr', artistsIds)
  // })
  let trackObjs = await playlistObjs.body.items.map(playlistObj => spotifyApi.getPlaylistTracks(playlistObj.id))

  Promise.all(trackObjs).then(playlistArr => {
    return playlistArr.map(playlist => playlist.body.items.forEach(item => artistIds.push(item.track.artists[0].id)))
  })
  console.log('artistids', artistIds)
  return artistIds
  // Promise.resolve(artistIds).then(idsArr => {
  //   console.log('idsarr', idsArr)
  //   let chunk = idsArr.slice(0, 50)
  //   console.log('chunk', chunk)
  //   return chunk
  // })


  //before throttling
  // playlistObjs.body.items.forEach(playlistObj => {
  //   spotifyApi.getPlaylistTracks(playlistObj.id)
  //   .then(trackData => trackData.body.items.forEach(item => {
  //     //throttle here VVVVVV
  //     spotifyApi.getArtist(item.track.artists[0].id)
  //     .then(artistData => {
  //       //console.log('artist', artistData.body)
  //       artistData.body.genres.forEach(genre => genres.push(genre))
  //     })
  //   }))
  // })


  //working throttled version
  // playlistObjs.body.items.forEach(playlistObj => {
  //   spotifyApi.getPlaylistTracks(playlistObj.id)
  //   .then(trackData => {
  //     for (let i = 0; i < trackData.body.items.length; i++) {
  //       ((index) => {
  //         setTimeout(() => {
  //           spotifyApi.getArtist(trackData.body.items[i].track.artists[0].id)
  //           .then(artistData => {
  //             console.log('artist', artistData.body)
  //             artistData.body.genres.forEach(genre => genres.push(genre))
  //           })
  //         }, 1000 + (2000 * index))
  //       })(i)
  //       console.log('finished')
  //     }
  //   })})

  // console.log('genres', genres)
}

const splitArr = async (spotifyId) => {
  let result = []
  let artistIdArr = await getPlaylistGenres(spotifyId)
  for (let i = 0; i <= artistIdArr.length; i += 50) {
    console.log('here')
    let chunk = artistIdArr.slice(i, i + 50)
    console.log('chunk', chunk)
    result.push(chunk)
    }
    return result
}

// splitArr()



    // ^^^reduce genres array into dictionary with keys as genres and values as occurences of genre. pick highest (unique-ish?) genres and store these data points in database so no need to re-calculate next time. offer option to force recalculation

  // const reduceGenres = genresArr => {
  //   let genrePopularity = {}
  //   genresArr.forEach(genre => {
  //     genrePopularity[genre]
  //     ? genrePopularity[genre]++
  //     : genrePopularity[genre] = 1
  //   })
  //   return genrePopularity
  // }

  // reduceGenres(genres)
  //compare results based on popular genres or by user's most popular? or both


module.exports = {spotifyApi, getPlaylistGenres, splitArr}

