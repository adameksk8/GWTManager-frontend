import React, { Component } from 'react';
export class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users:[]
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
<table class="table table-dark">
  <thead>
    <th scope="col">Imię</th>
    <th scope="col">Nazwisko</th>
    <th scope="col">E-mail</th>
    <th scope="col">Rola</th>
  </thead>
  <tbody>
  {
  users._embedded.users.map(user => (
    <tr>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
    </tr>
    ))}
  </tbody>
</table>
</div>
        );
      }
    }
  }

export default Users