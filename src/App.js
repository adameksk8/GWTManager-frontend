import React, { Component } from 'react';
import './App.css';
import Computers from './Computer/Computers'
import ComputerDetails from './Computer/ComputerDetails'
import ComputerAdd from './Computer/ComputerAdd'
import Users from './User/Users'
import UsersOfComputer from './User/UsersOfComputer'
import UserDetails from './User/UserDetails'
import UserAdd from './User/UserAdd'
import Switches from './Switch/Switches'
import SwitchDetails from './Switch/SwitchDetails'
import SwitchAdd from './Switch/SwitchAdd'
import Routers from './Router/Routers'
import RouterDetails from './Router/RouterDetails'
import RouterAdd from './Router/RouterAdd'
import Sites from './Site/Sites'
import Buildings from './Building/Buildings'
import Floors from './Floor/Floors'
import Rooms from './Room/Rooms'
import Devices from './Device/Devices'
import Login from './Login/Login'
import Logout from './Login/Logout'
import Home from './Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      authentication: localStorage.getItem("Authentication")
    };
  }

  render() {
    return (
      <Router>
        <div id="content" class="container px-0">
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
                    {this.state.username != null &&
                      <li className="dropdown"><a href="/devices" className="dropbtn">Sprzęt</a>
                        <div className="dropdown-content">
                          <Link to="/computers">Komputery</Link>
                          <Link to="/switches">Switche</Link>
                          <Link to="/routers">Routery</Link>
                        </div>
                      </li>
                    }
                    {this.state.username != null &&
                      <li className="dropdown"><a href="#" className="dropbtn">Użytkownicy</a>
                        <div className="dropdown-content">
                          <Link to="/users">Użytkownicy</Link>
                        </div>
                      </li>
                    }
                    {this.state.username != null &&
                      <li className="dropdown"><a href="#" className="dropbtn">Lokalizacje</a>
                        <div className="dropdown-content">
                          <Link to="/sites">Kompleks</Link>
                          <Link to="/buildings">Budynek</Link>
                          <Link to="/floors">Piętro</Link>
                          <Link to="/rooms">Pomieszczenie</Link>
                        </div>
                      </li>
                    }
                    {this.state.username != null &&
                      <li><a href="/logout"> Wyloguj ({this.state.username})</a></li>
                    }
                    {this.state.username == null &&
                      <li><a href="/login"> Zaloguj się</a></li>
                    }
                    {this.state.username == null &&
                      <li><a href="/register">Zarejestruj się</a></li>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </header>
          <main>
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route exact path="/home"><Home /></Route>
              <Route exact path="/computers"><Computers /></Route>
              <Route path="/computers/add"><ComputerAdd /></Route>
              <Route path="/computers/:id/users" component={UsersOfComputer}></Route>
              <Route path="/computers/:id" component={ComputerDetails}></Route>
              <Route exact path="/users"><Users /></Route>
              <Route path="/users/add"><UserAdd /></Route>
              <Route path="/users/:id" component={UserDetails}></Route>
              <Route exact path="/switches"><Switches /></Route>
              <Route path="/switches/add"><SwitchAdd /></Route>
              <Route path="/switches/:id" component={SwitchDetails}></Route>
              <Route exact path="/routers"><Routers /></Route>
              <Route path="/routers/add"><RouterAdd /></Route>
              <Route path="/routers/:id" component={RouterDetails}></Route>
              <Route exact path="/sites"><Sites /></Route>
              <Route exact path="/buildings"><Buildings /></Route>
              <Route exact path="/floors"><Floors /></Route>
              <Route exact path="/rooms"><Rooms /></Route>
              <Route exact path="/devices"><Devices /></Route>
              <Route exact path="/login"><Login /></Route>
              <Route exact path="/logout"><Logout /></Route>
            </Switch>
          </main>
          <footer>
            GWTManager! v1.0 &copy;Adam Nowak
          </footer>
        </div>
      </Router>
    )
  }

}

export default App