import React from 'react'
import {connect} from 'react-redux'
import { Card, Row, Col } from 'react-materialize'
// import UserRadarGraph from './UserRadarGraph'
import {spotifyApi, getGenres, sortGenres} from '../../server/services/spotify'

// const myTopGenres = [{ edm: 322, tropicalHouse: 223, pop: 200, electroHouse: 195, house: 143 }, { edm: 322, tropicalHouse: 223, pop: 200, electroHouse: 195, house: 143 }]

class UserInfo extends React.Component {
  state = {
    genreData: []
  }

  async componentDidMount() {
    spotifyApi.setAccessToken(this.props.accessToken)
    let userGenresArr = await getGenres(this.state.spotifyId)
    let top10 = await sortGenres(userGenresArr)
    top10 = top10.slice(0, 10)
    this.setState({genreData: top10})
    console.log('genre state', this.state.genreData)
  }

  render() {
    const {name, imageUrl} = this.props
    return (
      <div>
        <Row>
          <Col s={2} />
          <Col s={4}>
            <h4>{name}</h4>
            <img src={imageUrl} />
          </Col>
          <Col s={4} m={4}>
            <Card className="blue-grey lighten-4 black-text" title="My Top 10 Genres">
                <span><ol>{this.state.genreData.map(genre => <li key={genre[0]}>{genre[0]}</li>)}</ol></span>
            </Card>
          </Col>
          <Col s={2} />
        </Row>
        {/* <UserRadarGraph topGenres={myTopGenres}/> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name,
    accessToken: state.user.accessToken,
    spotifyId: state.user.spotifyId,
    imageUrl: state.user.imageUrl
  }
}

export default connect(mapState)(UserInfo)
