
import React, { Component, useReducer } from 'react';
import { useHistory } from "react-router-dom";
export class Computers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      computers: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/computers")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            computers: result
          });
        },
        // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
        // nie w bloku catch(), aby nie przetwarzać błędów
        // mających swoje źródło w komponencie.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, computers } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>;
    } else {
      return (
        <div>
          <h1>Lista komputerów</h1>

          <a href="http://localhost:3000/computers/add" class="btn btn-success m-2">Dodaj nowy</a>

          <table class="table table-light table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Właściciel</th>
                <th scope="col">IP</th>
                <th scope="col">Nazwa AD</th>
                <th scope="col">Użytkownicy</th>
                <th scope="col" colspan="2">Operacje</th>
              </tr>
            </thead>
            <tbody>


              {computers.map(computer => (

                <tr key={computer.identifier}>
                  <td>{computer.deviceId}</td>
                  <td><a href={"http://localhost:3000/users/" + computer.owner.identifier}>{computer.owner.firstName} {computer.owner.lastName}</a></td>
                  <td>{computer.ipAddress}</td>
                  <td>{computer.adName}</td>
                  <td><a class="btn btn-primary b-2" href={"http://localhost:3000/computers/" + computer.identifier+"/users/"}>Wyświetl</a></td>
                  <td><a class="btn btn-info b-2" href={"http://localhost:3000/computers/" + computer.identifier}>Szczegóły</a></td>
                  <td><button class="btn btn-danger b-2" onClick={() => {
                    this.handleDeleteClick(computer.identifier);
                  }}>Usuń</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }



  handleDeleteClick = computerId => {
    const requestOptions = {
      method: 'DELETE'
    };

    // Note: I'm using arrow functions inside the `.fetch()` method.
    // This makes it so you don't have to bind component functions like `setState`
    // to the component.

    fetch("http://localhost:8080/api/v1/computers/" + computerId, requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
      console.log("Usunięto");
      alert("Usunięto");
    })
      .then(() => {
        window.location.reload();//trzeba poprawić tak, aby nie przeładowywało całej strony
      });
  }
}




export default Computers