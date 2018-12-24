# MusicMates

Compare your music tastes with a friend's through your Spotify libraries.

This was my first independent app and was built in 3 days for a hackathon, so it's still in the early stages of development. Future plans include adding the ability to choose how to compare music tastes (e.g. based on user libraries or followed artists instead of just playlists).

## Setup

To use this app without having to create your own application on Spotify, please visit the deployed version at musicmates-stackathon.herokuapp.com. Otherwise:

```
git clone https://github.com/stashayancho/stackathon.git
npm install
```

* Create two postgres databases: `musicmates` and `musicmates-test`

* Create a file called `secrets.js` in the project root and get your own secrets from Spotify

## Start

`npm run start-dev`

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.
