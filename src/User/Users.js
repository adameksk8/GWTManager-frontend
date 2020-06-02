import React, { Component } from 'react';
export class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: [],
      tempUsers: [],
      sortedBy: 'FirstNameAsc',
      filterBy: 'LastName',
      filterInputValue: ''
    };
    this.handleSortByFirstName = this.handleSortByFirstName.bind(this);
    this.handleSortByLastName = this.handleSortByLastName.bind(this);
    this.handleSortByEMail = this.handleSortByEMail.bind(this);
    this.handleFilterData = this.handleFilterData.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
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
  handleSortByFirstName() {
    if (this.state.sortedBy != 'FirstNameAsc') {
      this.state.users.sort((a, b) => a.firstName > b.firstName ? 1 : -1)
      this.state.sortedBy = 'FirstNameAsc'
    }
    else {
      this.state.users.sort((a, b) => a.firstName < b.firstName ? 1 : -1)
      this.state.sortedBy = 'FirstNameDesc'
    }
    this.forceUpdate();
  }
  handleSortByLastName() {
    if (this.state.sortedBy != 'LastNameAsc') {
      this.state.users.sort((a, b) => a.lastName > b.lastName ? 1 : -1)
      this.state.sortedBy = 'LastNameAsc'
    }
    else {
      this.state.users.sort((a, b) => a.lastName < b.lastName ? 1 : -1)
      this.state.sortedBy = 'LastNameDesc'
    }
    this.forceUpdate();
  }
  handleSortByEMail() {
    if (this.state.sortedBy != 'EMailAsc') {
      this.state.users.sort((a, b) => a.email > b.email ? 1 : -1)
      this.state.sortedBy = 'EMailAsc'
    }
    else {
      this.state.users.sort((a, b) => a.email < b.email ? 1 : -1)
      this.state.sortedBy = 'EMailDesc'
    }
    this.forceUpdate();
  }
  handleFilterChange(Event) {
    this.state.filterBy = Event.target.value;
    this.state.filterInputValue = '';
    this.state.users = this.state.tempUsers;
    this.forceUpdate();
  }
  handleFilterData(Event) {
    this.state.filterInputValue = Event.target.value;
    let pattern = Event.target.value;
    console.log(pattern);
    this.state.users = this.state.tempUsers;
    let result = [];
    if (this.state.filterBy == 'firstName') { result = this.state.users.filter((element) => new RegExp(pattern).test(element.firstName)) };
    if (this.state.filterBy == 'lastName') { result = this.state.users.filter((element) => new RegExp(pattern).test(element.lastName)) };
    if (this.state.filterBy == 'eMail') { result = this.state.users.filter((element) => new RegExp(pattern).test(element.email)) };
    this.state.users = result;
    this.forceUpdate();

  }
  componentDidMount() {
    fetch("http://localhost:8080/api/v1/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result,
            tempUsers:result
          });
          this.handleSortByLastName();
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
          <h1>Lista użytkowników</h1>
          <a href="http://localhost:3000/users/add" class="btn btn-success m-2">Dodaj nowego</a>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Filtruj</label>
            </div>
            <select class="custom-select col-2" id="inputGroupSelect01" onChange={this.handleFilterChange}>
              <option value="firstName">Imię</option>
              <option selected  value="lastName">Nazwisko</option>
              <option value="eMail">E-mail</option>
              <option value="role">Rola</option>
            </select>
            <input type="text" class="form-control" aria-label="Tu wpisz tekst wg którego chcesz filtrować dane" placeholder="Wpisz tekst wg którego chcesz filtrować dane" value={this.state.filterInputValue} onChange={this.handleFilterData}></input>
          </div>
          <table class="table table-light table-hover">
            <thead class="thead-dark">
              <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByFirstName} >Imię</button></th>
              <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByLastName} >Nazwisko</button></th>
              <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByEMail} >Email</button></th>
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
}
export default Users