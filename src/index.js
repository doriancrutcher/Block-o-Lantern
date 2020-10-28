import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { initContract } from './utils'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
}
  from "react-router-dom";

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <Router basename='/'>
      <App />
      </Router>,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
