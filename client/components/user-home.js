import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Row, Col, Input} from 'react-materialize'
import {spotifyApi, getGenres, sortGenres, compareGenres} from '../../server/services/spotify'
import RadarGraph from './RadarGraph'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  state = {
    otherSpotifyId: '',
    genreData: []
  }

  handleChange = (event) => {
    this.setState({otherSpotifyId: event.target.value})
  }

  handleClick = async () => {
    spotifyApi.setAccessToken(this.props.accessToken)
    let userGenresArr = await getGenres(this.state.spotifyId)
    let genresArr = await getGenres(this.state.otherSpotifyId)
    let data = await compareGenres(userGenresArr, genresArr)
    this.setState({genreData: data})
  }


  render() {
    const {name} = this.props
    return (
      <div>
          <Row>
            <Col s={3} />
            <Input placeholder="Spotify ID" s={6} onChange={this.handleChange} />
            <Col s={3} />
          </Row>
          <Row>
            <Col s={3} />
            <Button className='green' waves='light' onClick={this.handleClick}>compare</Button>
            <Col s={3} />
          </Row>
          {this.state.genreData.length ? <RadarGraph genreData={this.state.genreData}/> :
            <Row id="how-to">
              <Col s={3} />
              <Col s={6}>
                <h5>Enter a user's Spotify ID to compare your musical tastes!</h5>
              </Col>
              <Col s={3} />
            </Row>}
      </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name,
    accessToken: state.user.accessToken,
    spotifyId: state.user.spotifyId,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
