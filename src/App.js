import 'regenerator-runtime/runtime'
import React from 'react'

//Styling
import './global.css'
import './scss/AppStyles.scss'
import './css/CustomStyles.css'

//Tools
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
}
  from "react-router-dom";
import { login, logout } from './utils'
import { Navbar, Nav, NavDropdown, Container, Row, Col, Button, Carousel, CarouselItem } from 'react-bootstrap'

//Assets
import PumpkinHome from './assets/PumpkinHome.png'

//Components
import CommunityPumps from './Component/CommunityPumps'
import PumpkinDrawingBoard from './Component/PumpkinDrawingBoard'
import Home from './Component/Home.js'
import getConfig from './config'
import DrawingBoard from './Component/PumpkinDrawingBoard'
import YourPumps from './Component/YourPumps'



const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {

  const goToMyPumps = () => {
    console.log('ho')
    return <Redirect to='/mypumps' />
  }
  return (
    <Router basename='/'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="ScaryStyleFont" href="/">Block '0' Lantern </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          <Nav>

            <Nav.Link href="/draw">Draw</Nav.Link>
            <Nav.Link href="/mypumps">My Pumps</Nav.Link>
            <Nav.Link onClick={(window.accountId === '') ? login : logout} eventKey={2} >

              {(window.accountId === '') ? 'Login' : window.accountId}
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path='/Draw' exact render={(props) => (<PumpkinDrawingBoard {...props} yo='ho' goToMyPumps={goToMyPumps} />)} />
          <Route path='/mypumps' exact component={YourPumps} />
        </Switch>
      </div>
    </Router>


  )
}