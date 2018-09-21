import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Row, Col } from 'react-materialize'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, handleSubmit, error} = props

  return (
    <Row>
      <Col s={4} />
      <Col s={4}>
        <Button className='green' waves='light' node='a' href="/auth/spotify">Get Started with Spotify</Button>
      </Col>
      <Col s={4} />
    </Row>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
