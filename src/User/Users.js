import React, { Component } from 'react';
import Config from '../Config';
import Loading from '../Loading';
import Modal from '../Modal';
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
      filterInputValue: '',
      paginationSelected: '1',
      itemsPerPage: 20,
    };
    this.handleSortByFirstName = this.handleSortByFirstName.bind(this);
    this.handleSortByLastName = this.handleSortByLastName.bind(this);
    this.handleSortByEMail = this.handleSortByEMail.bind(this);
    this.handleFilterData = this.handleFilterData.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }
test(param){
  console.log("test"+param);
}

  handlePaginationClick(Event) {
    if (Event.target.innerText == 'Poprzednia') {
      if (this.state.paginationSelected > 1) {
        let ps = this.state.paginationSelected;
        --ps;
        this.setState({ paginationSelected: ps });
      }
    }
    else if (Event.target.innerText == 'Następna') {
      let ps = this.state.paginationSelected;
      ++ps;
      this.setState({ paginationSelected: ps });//zrobić zabezpieczenie żeby nie wykraczać poza zakres
    }
    else {
      this.setState({ paginationSelected: Event.target.innerText });
    }
    console.log(this.state.paginationSelected);
    console.log(this.state.users.length);
  }

  handleDeleteClick = () => {
    // let confirmDelete = window.confirm("Czy na pewno usunąć?");
    // if (confirmDelete) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('Authorization')
      }
    };

    // Note: I'm using arrow functions inside the `.fetch()` method.
    // This makes it so you don't have to bind component functions like `setState`
    // to the component.

    fetch(Config.serverAddress + "/api/v1/users/" + this.state.itemToDelete, requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
    })
      .then(() => {
        //window.location.reload();//trzeba poprawić tak, aby nie przeładowywało całej strony
      });
    // }
  }
  handleSortByFirstName() {
    if (this.state.sortedBy !== 'FirstNameAsc') {
      this.state.users.sort((a, b) => a.firstName.localeCompare(b.firstName))
      this.setState({ sortedBy: 'FirstNameAsc' });
    }
    else {
      this.state.users.sort((a, b) => b.firstName.localeCompare(a.firstName))
      this.setState({ sortedBy: 'FirstNameDesc' });
    }
    this.forceUpdate();
  }
  handleSortByLastName() {
    if (this.state.sortedBy !== 'LastNameAsc') {
      this.state.users.sort((a, b) => a.lastName.localeCompare(b.lastName))
      this.setState({ sortedBy: 'LastNameAsc' })
    }
    else {
      this.state.users.sort((a, b) => b.lastName.localeCompare(a.lastName))
      this.setState({ sortedBy: 'LastNameDesc' })
    }
    this.forceUpdate();
  }
  handleSortByEMail() {
    if (this.state.sortedBy !== 'EMailAsc') {
      this.state.users.sort((a, b) => a.email.localeCompare(b.email))
      this.setState({ sortedBy: "EMailAsc" })
    }
    else {
      this.state.users.sort((a, b) => b.email.localeCompare(a.email))
      this.setState({ sortedBy: "EMailDesc" })
    }
    this.forceUpdate();
  }
  handleFilterChange(Event) {
    this.setState({ filterBy: Event.target.value })
    this.setState({ filterInputValue: '' })
    this.setState({ users: this.state.tempUsers.slice() })
    this.forceUpdate();
  }
  handleFilterData(Event) {
    let users = this.state.tempUsers.slice();
    this.setState({ filterInputValue: Event.target.value })
    let pattern = Event.target.value;
    let result = [];
    if (this.state.filterBy === 'firstName') { result = users.filter((element) => new RegExp(pattern).test(element.firstName)) }
    else if (this.state.filterBy === 'lastName') { result = users.filter((element) => new RegExp(pattern).test(element.lastName)) }
    else if (this.state.filterBy === 'eMail') { result = users.filter((element) => new RegExp(pattern).test(element.email)) };
    this.setState({ users: result })
  }
  componentDidMount() {
    const requestOptions = {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('Authorization')
      }
  };
  console.log(requestOptions.headers);
  console.log(localStorage.getItem('username'));
    fetch(Config.serverAddress + "/api/v1/users", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result.slice(),
            tempUsers: result.slice()
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
      return <Loading />;
    } else {
      return (
        <div>
          <h1>Lista użytkowników</h1>
          <a href={Config.pageAddress + "/users/add"} class="btn btn-success m-2">Dodaj nowego</a>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Filtruj</label>
            </div>
            <select class="custom-select col-2" id="inputGroupSelect01" onChange={this.handleFilterChange}>
              <option selected disabled>Wybierz filtr</option>
              <option value="firstName">Imię</option>
              <option value="lastName">Nazwisko</option>
              <option value="eMail">E-mail</option>
              <option value="role">Rola</option>
            </select>
            <input type="text" class="form-control" aria-label="Tu wpisz tekst wg którego chcesz filtrować dane" placeholder="Wpisz tekst wg którego chcesz filtrować dane" value={this.state.filterInputValue} onChange={this.handleFilterData}></input>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li class="page-item">
                <a class="page-link" onClick={this.handlePaginationClick} href="#" tabindex="-1">Poprzednia</a>
              </li>
              <li class="page-item"><a class="page-link" onClick={this.handlePaginationClick} href="#">1</a></li>
              <li class="page-item"><a class="page-link" onClick={this.handlePaginationClick} href="#">2</a></li>
              <li class="page-item"><a class="page-link" onClick={this.handlePaginationClick} href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" onClick={this.handlePaginationClick} href="#">Następna</a>
              </li>
            </ul>
          </nav>
          <table class="table table-light table-hover">
            <thead class="thead-dark">
              <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByFirstName} >Imię</button></th>
              <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByLastName} >Nazwisko</button></th>
              <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByEMail} >Email</button></th>
              <th scope="col">Rola</th>
              <th scope="col" colspan="2">Operacje</th>
            </thead>
            <tbody>
              {Array.isArray(this.state.users) && users.map(user => (
                  <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><a class="btn btn-info b-2" href={Config.pageAddress + "/users/" + user.id}>Szczegóły</a></td>
                    <td><button type="button" class="btn btn-danger b-2" data-toggle="modal" data-target="#staticBackdrop" onClick={() => {
                      //this.handleDeleteClick(user.id);
                    }}>Usuń</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Modal handleConfirmClick={this.test}/>
        </div>
      );
    }
  }
}
export default Users