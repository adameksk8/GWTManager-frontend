import React, { Component } from 'react';
export class UsersOfComputer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      computer: null,
      users: []
    };
  }

  componentDidMount() {
    let url = "http://localhost:8080/api/v1/computers/" + this.props.match.params.id;
    //console.log(fetch(url));
    //console.log(fetch(url));
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            computer: result
          });
          console.log(this.state.computer)
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
    let { error, isLoaded, computer } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>;
    } else {
      return (<div>
        <h1>Lista użytkowników komputera DU: {computer.deviceId}</h1>
        <table class="table table-light table-hover">
          <thead class="thead-dark">
            <th scope="col">Imię</th>
            <th scope="col">Nazwisko</th>
            <th scope="col">E-mail</th>
            <th scope="col">Szczegóły</th>

          </thead>
          <tbody>
            {
              computer.usedBy.map((user, i) => {
                return <tr>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td><a class="btn btn-info b-2" href={"http://localhost:3000/users/" + user.identifier}>Szczegóły</a></td>
                </tr>;
              })
            }
          </tbody>
        </table>
      </div>
      )
    }
  }

}
export default UsersOfComputer