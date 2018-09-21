import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button} from 'react-materialize'
// import { access } from 'fs';
import {spotifyApi, compareGenres} from '../../server/services/spotify'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {name} = props
  const handleClick = () => {
    spotifyApi.setAccessToken(props.accessToken)
  //   spotifyApi.getUserPlaylists('1274130140')
  // .then(function(data) {
  //   console.log('Retrieved playlists', data.body);
  // },function(err) {
  //   console.log('Something went wrong!', err);
  // });
  compareGenres('1274130140');
  }


  return (
    <div>
      <h3>Welcome, {name}</h3>
      <Button onClick={handleClick}>api</Button>
    </div>
  )
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name,
    accessToken: state.user.accessToken
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
