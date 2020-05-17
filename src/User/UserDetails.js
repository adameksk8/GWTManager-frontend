import React, { Component } from 'react';
export class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/users/" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            user: result
          });
          console.log(this.state.user)
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
    let { error, isLoaded, user } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>;
    } else {
      return (
        <div>
          <span class="d-block p-2 bg-primary text-white">Szczegółowe dane użytkownika</span>
          <a href="http://localhost:3000/users/add" class="btn btn-warning m-2">Edycja</a>
          <form>
            <div class="form-group">
              <label for="imie">Imię</label>
              <input type="text" class="form-control" id="imie" value={this.state.user.firstName} />
              <label for="nazwisko">Nazwisko</label>
              <input type="text" class="form-control" id="nazwisko" value={this.state.user.lastName}></input>
              <label for="model">Mail</label>
              <input type="text" class="form-control" id="model" value={this.state.user.email}></input>
            </div>
          </form>
          <a href="http://localhost:3000/users/add" class="btn btn-success m-2">Zapisz</a>
        </div>
      )
    }
  }
}

export default UserDetails