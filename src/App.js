import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Computers from './Computer/Computers'
import ComputerDetails from './Computer/ComputerDetails'
import ComputerAdd from './Computer/ComputerAdd'
import Users from './User/Users'
import UsersOfComputer from './User/UsersOfComputer'
import UserDetails from './User/UserDetails'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <Router>
        <div id="content">
          <header>
            <div id="header-container">
              <div id="menu-bar">
                <div id="logo">
                  <svg class="bi bi-laptop" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M13.5 3h-11a.5.5 0 00-.5.5V11h12V3.5a.5.5 0 00-.5-.5zm-11-1A1.5 1.5 0 001 3.5V12h14V3.5A1.5 1.5 0 0013.5 2h-11z" clip-rule="evenodd" />
                    <path d="M0 12h16v.5a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5V12z" />
                  </svg>
                  GWTManager!
                </div>
                <div>
                  <ul>
                    <li><Link to="/">Strona główna</Link></li>
                    <li className="dropdown"><a href="#" className="dropbtn">Zarządzaj</a>
                      <div className="dropdown-content">
                        <Link to="/users">Użytkownicy</Link>
                        <Link to="/computers">Komputery</Link>
                      </div>
                    </li>
                    <li><a href="#">Item 1</a></li>
                    <li><a href="#">Item 2</a></li>
                    <li><a href="#">Item 3</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          <main>

            <Switch>
              <Route exact path="/computers"><Computers /></Route>
              <Route path="/computers/add"><ComputerAdd /></Route>
              <Route path="/computers/:id/users" component={UsersOfComputer}></Route>
              <Route path="/computers/:id" component={ComputerDetails}></Route>
              <Route path="/users/:id" component={UserDetails}></Route>
              <Route path="/users"><Users /></Route>
            </Switch>
          </main>
          <footer>
            &copy;Adam Nowak
          </footer>
        </div>
      </Router>
    )
  }

}

export default App