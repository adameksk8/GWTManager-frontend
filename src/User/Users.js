import React, { Component } from 'react';
export class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
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
  }

  render() {
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>;
    } else {
      return (
        <div>
          <span class="d-block p-2 bg-primary text-white">Lista użytkowników</span>
          <table class="table table-light table-hover">
            <thead class="thead-dark">
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">E-mail</th>
              <th scope="col">Rola</th>
              <th scope="col" colspan="2">Operacje</th>
            </thead>
            <tbody>
              {
                users.map(user => (
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><a class="btn btn-info b-2" href={"http://localhost:3000/users/" + user.identifier}>Szczegóły</a></td>
                    <td><button class="btn btn-danger b-2" onClick={() => {
                      this.handleDeleteClick(user.id);
                    }}>Usuń</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
    }
  }



  handleDeleteClick = userId => {
    const requestOptions = {
      method: 'DELETE'
    };

    // Note: I'm using arrow functions inside the `.fetch()` method.
    // This makes it so you don't have to bind component functions like `setState`
    // to the component.

    fetch("http://localhost:8080/api/v1/users/" + userId, requestOptions).then((response) => {
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

export default Users