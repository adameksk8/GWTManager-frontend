import { BehaviorSubject } from 'rxjs';
import Config from '../Config'
import { handleResponse } from '../helpers/handleResponse';


const currentUserSubject = new BehaviorSubject((localStorage.getItem('username')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () {
        return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${Config.serverAddress}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("Authorization",user["Authorization"]);
            localStorage.setItem("username",user["username"]);
            currentUserSubject.next(user);
            window.location.reload();
        });
        
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('Authorization');
    localStorage.removeItem('username');
    currentUserSubject.next(null);
}