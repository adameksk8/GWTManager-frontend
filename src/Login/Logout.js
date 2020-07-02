
import React, { Component } from 'react';
import Config from '../Config'
import Loading from '../Loading';
import {authenticationService} from '../Services/authenticationService'
export class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        if (localStorage.getItem("Authorization")!=null){
            authenticationService.logout();
            window.location.reload();
        }
       
    }

    render() {
        return (
            <div>
Wylogowano
            </div>
        );
    }
}

export default Logout