import {Component} from 'react'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'

import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const homepageApiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {topRatedBooksList: [], apiStatus: homepageApiStatus.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    try {
      this.setState({apiStatus: homepageApiStatus.loading})
      const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
      const jwtToken = Cookies.get('jwt_token')

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      const responseData = await response.json()
      const updatedData = responseData.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        title: eachBook.title,
      }))
      const uniqueBooks = Array.from(
        new Map(updatedData.map(item => [item.id, item])).values(),
      )
      console.log(updatedData)
      console.log(uniqueBooks)
      this.setState({
        topRatedBooksList: updatedData,
        apiStatus: homepageApiStatus.success,
      })
    } catch (err) {
      this.setState({apiStatus: homepageApiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {topRatedBooksList} = this.state
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      width: 100,
    }
    return (
      <div className="home-div">
        <Header />
        <div className="home-container">
          <h1 className="main-heading">Find Your Next Favorite Books?</h1>
          <p>
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>

          <div className="carousel-container">
            <div className="child-1">
              <h2>Top Rated Books</h2>
              <Link to="/shelf" className="home-link">
                <button type="button" className="find">
                  Find Books
                </button>
              </Link>
            </div>

            <ul className="slider-ul">
              <Slider
                className="slider-ul"
                {...settings}
                style={{width: '100%'}}
              >
                {topRatedBooksList.map(eachBook => (
                  <li key={eachBook.id} className="carousel-div">
                    <Link to={`/books/${eachBook.id}`} className="carousel-div">
                      <img src={eachBook.coverPic} alt={eachBook.title} />
                      <h1 className="name-h1">{eachBook.title.trim()}</h1>{' '}
                      <p className="author">{eachBook.authorName.trim()}</p>{' '}
                    </Link>
                  </li>
                ))}
              </Slider>
            </ul>
          </div>

          <ul className="footer-div">
            <li>
              <img
                src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746980545/google_alg9ce.png"
                alt="footer-icons"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746980523/twitter_vkqee7.png"
                alt="footer-icons"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746980523/instagram_sitmh5.png"
                alt="footer-icons"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1746980557/youtube_a2aurq.png"
                alt="footer-icons"
              />
            </li>
          </ul>

          <p className="contact">Contact Us</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="home-container">
      <h1>Find Your Next Favorite Books?</h1>
      <p>
        {' '}
        You are in the right place. Tell us what titles or genres you have
        enjoyed in the past, and we will give you surprisingly insightful
        recommendations.{' '}
      </p>
      <div className="carousel-container">
        <div>
          <h2>Top Rated Books</h2>
          <button type="button"> Find Books </button>
        </div>
        <img
          src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1747021162/Group_7522_yazyij.png"
          alt="failure view"
          className="failure-img"
        />
        <p className="failure-para">
          {' '}
          Something went wrong, Please try again.{' '}
        </p>
        <button
          type="button"
          className="failure-btn"
          onClick={this.getTopRatedBooks}
        >
          {' '}
          Try Again{' '}
        </button>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case homepageApiStatus.loading:
        return (
          <>
            <Header />
            <div className="loader-container" testid="loader">
              <Loader
                type="TailSpin"
                color="#0284C7"
                height={50}
                width={50}
                ariaLabel="tail-spin-loading"
              />
            </div>
          </>
        )
      case homepageApiStatus.failure:
        return (
          <>
            <Header />
            {this.renderFailureView()}
          </>
        )
      case homepageApiStatus.success:
        return this.renderSuccessView()

      default:
        return null
    }
  }
}

export default Home
