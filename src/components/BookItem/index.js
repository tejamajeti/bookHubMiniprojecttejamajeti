import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {title, authorName, coverPic, rating, readStatus, id} = bookDetails
  return (
    <li className="li">
      <Link to={`/books/${id}`} className="li">
        <img src={coverPic} alt={title} />
        <div>
          <h1>{title}</h1>
          <div className="details-container">
            <p className="author-name"> {authorName} </p>
            <p>
              Avg Rating
              <span className="image-span">
                <BsFillStarFill style={{fill: '#FBBF24'}} />
              </span>
              {rating}
            </p>
            <p>
              Status: <span className="status-span"> {readStatus} </span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default BookItem
