import {Switch, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage'

import ProtectedRoute from './components/ProtectedRoute'

import BookItemDetails from './components/BookItemDetails'

import Bookshelves from './components/Bookshelf'

import NotFound from './components/NotFound'

import Home from './components/Home'

import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
