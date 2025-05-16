import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutFunction = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const {history} = props

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746801028/Group_7731_zflzlo.png"
          alt="website logo"
        />
      </Link>
      <ul className="UL">
        <li>
          <Link
            to="/"
            className={
              history.location.pathname === '/'
                ? 'active-styles'
                : 'home-styles'
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/shelf"
            className={
              history.location.pathname === '/shelf'
                ? 'active-styles'
                : 'bookshelves-styles'
            }
          >
            Bookshelves
          </Link>
        </li>
        <li>
          <button type="button" onClick={logoutFunction}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
