import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import FiltersItem from '../FiltersItem'

import BookItem from '../BookItem'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const booksStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelf extends Component {
  state = {
    activeOption: bookshelvesList[0].value,
    searchInput: '',
    booksApiStatus: booksStatus.initial,
    displayBooksList: [],
  }

  componentDidMount() {
    this.getDisplayBooks()
  }

  changeActiveOption = value => {
    this.setState({activeOption: value}, this.getDisplayBooks)
    console.log(`Active Option from eventListener ${value}`)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onTyping = event => {
    console.log(event.key)
    if (event.key === 'Enter') {
      this.getDisplayBooks()
    }
  }

  getDisplayBooks = async () => {
    const {activeOption, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(`active Option before request ${activeOption}`)
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeOption}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      this.setState({booksApiStatus: booksStatus.loading})
      const response = await fetch(apiUrl, options)
      const responseData = await response.json()
      const booksData = responseData.books
      const updatedBooksData = booksData.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        authorName: eachBook.author_name,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        coverPic: eachBook.cover_pic,
      }))
      console.log(updatedBooksData)
      this.setState({
        displayBooksList: updatedBooksData,
        booksApiStatus: booksStatus.success,
      })
    } catch (err) {
      this.setState({booksApiStatus: booksStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {displayBooksList, searchInput} = this.state
    return displayBooksList.length === 0 ? (
      <div className="empty-container">
        <img
          src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1747204259/Group_crdqel.png"
          alt="no books"
        />
        <p> Your search for {searchInput} did not find any matches. </p>
      </div>
    ) : (
      <ul className="success-ul">
        {displayBooksList.map(eachBookItem => (
          <BookItem key={eachBookItem.id} bookDetails={eachBookItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dh0e3kfeh/image/upload/v1747021162/Group_7522_yazyij.png"
        alt="failure view"
      />
      <p>Something went wrong, Please try again</p>
      <button type="button" onClick={this.getDisplayBooks}>
        Try Again
      </button>
    </div>
  )

  renderFunction = () => {
    const {booksApiStatus} = this.state
    switch (booksApiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'LOADING':
        return this.renderLoadingView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeOption} = this.state
    const activeObject = bookshelvesList.find(eachElement => {
      if (activeOption === eachElement.value) {
        return true
      }

      return false
    })
    return (
      <div className="shelf-div">
        <Header />
        <div className="shelf-container">
          <ul className="filters-container">
            <h1 className="bookShelevs"> BookShelves </h1>
            {bookshelvesList.map(eachItem => (
              <FiltersItem
                key={eachItem.id}
                filterItem={eachItem}
                isActive={activeOption === eachItem.value}
                changeActiveOption={this.changeActiveOption}
              />
            ))}
          </ul>
          <div className="books-container">
            <div className="search-container">
              <h1> {activeObject.label} Books </h1>
              <div>
                <input
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onTyping}
                />
                <button
                  type="button"
                  onClick={this.getDisplayBooks}
                  testid="searchButton"
                >
                  <BsSearch />
                </button>
              </div>
            </div>
            {this.renderFunction()}
            <ul className="footer">
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
            <p className="shelf-contact"> Contact Us </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelf
