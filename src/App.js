import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Computers from './Computers'
import ComputerDetails from './ComputerDetails'
import Users from './Users'
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
              <Route exact path="/computers">
                <Computers />
              </Route>

              <Route path="/computers/:id" component={ComputerDetails}>
              </Route>
              <Route path="/users">
                <Users />
              </Route>
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