import React, { Component } from 'react';
export class UsersOfComputer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      computers: [],
      users: []
    };
  }

  componentDidMount() {
    let url = "http://localhost:8080/api/v1/computers/" + this.props.match.params.id;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoadedComputers: true,
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
      ).then(
        fetch("http://localhost:8080/api/v1/users")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoadedUsers: true,
                users: result
              });
              console.log(this.state.users)
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
      )
  }

  render() {
    let { error, isLoadedComputers, isLoadedUsers, computer, users } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!(isLoadedComputers && isLoadedUsers)) {
      return <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>;
    } else {
      return (<div>
        <h1>Lista użytkowników komputera DU: {computer.deviceId}</h1>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Wybierz użytkownika</label>
          <select class="form-control" id="exampleFormControlSelect1">
            {users.map(user => (
              <option value={user.id}>{user.firstName + " " + user.lastName}</option>
            ))}

          </select>
          <btn class="btn btn-success m-2">Przypisz do komputera</btn>
        </div>
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