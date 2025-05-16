import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccess = jwtToken => {
    console.log('Login Success Redirecting.....')
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2, path: '/'})
    history.replace('/')
  }

  onSubmittingForm = async event => {
    event.preventDefault()
    try {
      const {username, password} = this.state
      const userDetails = {username, password}
      if (username === '' || password === '') {
        this.setState({errMsg: 'Username or Password Cannot be Empty'})
        return
      }
      const apiUrl = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(apiUrl, options)
      const responseData = await response.json()
      if (response.ok === true) {
        this.onSuccess(responseData.jwt_token)
      } else {
        this.setState({errMsg: responseData.error_msg})
      }
    } catch (err) {
      this.setState({errMsg: 'Login Failed'})
    }
  }

  render() {
    const {username, password, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_Token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746799815/3056c7bbe7efb0d3d71dcb5062f1e077527d7f5d_adlge9.jpg"
          alt="website login"
          className="login-img"
        />
        <div className="login-container-div">
          <form id="myForm" onSubmit={this.onSubmittingForm}>
            <img
              src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746801028/Group_7731_zflzlo.png"
              alt="login website logo"
              className="logo"
            />
            <div className="input-div">
              <label htmlFor="username">Username*</label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                value={username}
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="input-div">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <p id="error"> {errMsg} </p>
            <button type="submit">
              {' '}
              <span> Login </span>{' '}
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
