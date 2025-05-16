import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

class BookItemDetails extends Component {
  state = {bookDetails: [], error: false, isLoading: false}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const bookId = match.params.id
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${bookId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      this.setState({isLoading: true})
      const response = await fetch(apiUrl, options)
      const resposneData = await response.json()
      const updatedData = {
        id: resposneData.book_details.id,
        aboutAuthor: resposneData.book_details.about_author,
        aboutBook: resposneData.book_details.about_book,
        authorName: resposneData.book_details.author_name,
        coverPic: resposneData.book_details.cover_pic,
        rating: resposneData.book_details.rating,
        readStatus: resposneData.book_details.read_status,
        title: resposneData.book_details.title,
      }
      this.setState({bookDetails: updatedData, isLoading: false})
    } catch (err) {
      this.setState({error: true, isLoading: false})
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1747021162/Group_7522_yazyij.png"
        alt="failure view"
      />
      <p>Something went wrong, Please try again</p>
      <button type="button" onClick={this.getDetails}>
        Try Again
      </button>
    </div>
  )

  renderFunction = () => {
    const {error} = this.state
    const {bookDetails} = this.state
    return error ? (
      this.renderFailureView()
    ) : (
      <div className="display-container">
        <Header />
        <div id="display">
          <div className="book-item-container">
            <div className="book-div">
              <img src={bookDetails.coverPic} alt={bookDetails.title} />
              <div className="details-div">
                <h1> {bookDetails.title} </h1>
                <div className="book-details-container">
                  <p> {bookDetails.authorName} </p>
                  <p>
                    Avg Rating
                    <span className="image-span">
                      <BsFillStarFill style={{fill: '#FBBF24'}} />
                    </span>
                    {bookDetails.rating}
                  </p>
                  <p>
                    Status:
                    <span className="status"> {bookDetails.readStatus} </span>
                  </p>
                </div>
              </div>
            </div>
            <hr style={{color: 'grey', width: '100%', margin: 'auto'}} />
            <h3 className="h3"> About Author </h3>
            <p className="about-author"> {bookDetails.aboutAuthor} </p>
            <h3 className="h3"> About Book </h3>
            <p className="about-author"> {bookDetails.aboutBook} </p>
          </div>
          <ul className="footer-container">
            <li>
              {' '}
              <img
                src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746980545/google_alg9ce.png"
                alt="footer-icons"
              />{' '}
            </li>
            <li>
              {' '}
              <img
                src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746980523/twitter_vkqee7.png"
                alt="footer-icons"
              />{' '}
            </li>
            <li>
              {' '}
              <img
                src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746980523/instagram_sitmh5.png"
                alt="footer-icons"
              />{' '}
            </li>
            <li>
              {' '}
              <img
                src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746980557/youtube_a2aurq.png"
                alt="footer-icons"
              />{' '}
            </li>
          </ul>
          <p className="contact-item"> Contact Us </p>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    ) : (
      this.renderFunction()
    )
  }
}

export default BookItemDetails
