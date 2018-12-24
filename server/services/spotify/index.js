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

const getPlaylistArtistIds = async spotifyId => {
  let playlistObjs = await spotifyApi.getUserPlaylists(spotifyId)
  let artistIds = []

  let trackObjs = await playlistObjs.body.items.map(playlistObj => spotifyApi.getPlaylistTracks(playlistObj.id))

  await Promise.all(trackObjs).then(playlistArr => {
    return playlistArr.map(playlist => playlist.body.items.forEach(item => artistIds.push(item.track.artists[0].id)))
  })
  return artistIds
}

const splitArr = async (spotifyId) => {
  let result = []
  let artistIdArr = await getPlaylistArtistIds(spotifyId)
  for (let i = 0; i <= artistIdArr.length; i += 50) {
    let chunk = artistIdArr.slice(i, i + 50)
    result.push(chunk)
    }
    return result
}

const getGenres = async (spotifyId) => {
  let genres = []
  let splitIdsArr = await splitArr(spotifyId)
  let artistInfo =  await splitIdsArr.map(set => spotifyApi.getArtists(set))
  await Promise.all(artistInfo)
  .then(aInfo => aInfo.forEach(set => {
    set.body.artists.forEach(artist => {
      artist.genres.forEach(genre => genres.push(genre))
    })
  }))
  return genres
}

const reduceGenres = genresArr => {
  let genrePopularity = {}
  genresArr.forEach(genre => {
    genrePopularity[genre]
    ? genrePopularity[genre]++
    : genrePopularity[genre] = 1
  })
  console.log('reduced genres', genrePopularity)
  return genrePopularity
}

const sortGenres = async genresArr => {
  let genrePopularity = await reduceGenres(genresArr)
  var items = Object.keys(genrePopularity).map(key => {
    return [key, genrePopularity[key]]
  })
  // Sort the array based on the second element
  return items.sort((first, second) => {
    return second[1] - first[1]
  })
  // Create a new array with only the first 5 items
  // console.log('top 5 genres', items.slice(0, 5))
  // let genreData = {}
  // items.slice(0, 5).forEach(genre => genreData[genre[0]] = genre[1])
  // console.log('genre object', genreData)
  // return genreData
}

const compareGenres = async (userGenresArr, otherGenresArr) => {
  let userSortedArr = await sortGenres(userGenresArr)
  let otherSortedArr = await sortGenres(otherGenresArr)
  let userGenresObj = reduceGenres(userGenresArr)
  let otherGenresObj = reduceGenres(otherGenresArr)
  let result = []
  for (let i = 0; i < 3; i++) {
    result.push(userSortedArr[i][0])
  }
  let j = 0
  while (result.length < 5) {
    result.includes(otherSortedArr[j][0])
    ? j++
    : result.push(otherSortedArr[j][0]) && j++
  }
  let userGenreData = {}
  let otherGenreData = {}
  result.forEach(genre => {
    userGenreData[genre] = userGenresObj[genre] || 0
    otherGenreData[genre] = otherGenresObj[genre] || 0
  })
  console.log('user top 5', userGenreData, otherGenreData)
  return [userGenreData, otherGenreData]
}

module.exports = {spotifyApi, getGenres, reduceGenres, sortGenres, compareGenres}
