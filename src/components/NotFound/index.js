import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1747048024/Group_7484_viwnxt.png"
      alt="not found"
    />
    <h2> Page Not Found </h2>
    <p>
      we are sorry, the page you requested could not be found,Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button"> Go Back To Home </button>
    </Link>
  </div>
)

export default NotFound
