
import React, { Component, useReducer } from 'react';
export class Computers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      computers: [],
      tempComputers: [], //kopia, na której nie wykonujemy żadnych zmian
      sortedBy: 'IDAsc',
      filterBy: 'ID',
      filterInputValue: ''
    };
    this.handleSortByID = this.handleSortByID.bind(this);
    this.handleSortByOwner = this.handleSortByOwner.bind(this);
    this.handleSortByIP = this.handleSortByIP.bind(this);
    this.handleSortByAdName = this.handleSortByAdName.bind(this);
    this.handleFilterData = this.handleFilterData.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  handleDeleteClick = computerId => {
    let confirmDelete = window.confirm("Czy na pewno usunąć?");
    if (confirmDelete) {
      const requestOptions = {
        method: 'DELETE'
      };

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
  handleSortByID() {
    if (this.state.sortedBy != 'IDAsc') {
      this.state.computers.sort((a, b) => a.deviceId > b.deviceId ? 1 : -1)
      this.state.sortedBy = 'IDAsc'
    }
    else {
      this.state.computers.sort((a, b) => a.deviceId < b.deviceId ? 1 : -1)
      this.state.sortedBy = 'IDDesc'
    }
    this.forceUpdate();
  }
  handleSortByOwner() {
    if (this.state.sortedBy != 'OwnerAsc') {
      this.state.computers.sort((a, b) => a.owner.lastName > b.owner.lastName ? 1 : -1)
      this.state.sortedBy = 'OwnerAsc'
    }
    else {
      this.state.computers.sort((a, b) => a.owner.lastName < b.owner.lastName ? 1 : -1)
      this.state.sortedBy = 'OwnerDesc'
    }
    this.forceUpdate();
  }
  handleSortByIP() {
    if (this.state.sortedBy != 'IPAsc') {
      this.state.computers.sort((a, b) => a.ipAddress > b.ipAddress ? 1 : -1)
      this.state.sortedBy = 'IPAsc'
    }
    else {
      this.state.computers.sort((a, b) => a.ipAddress < b.ipAddress ? 1 : -1)
      this.state.sortedBy = 'IPDesc'
    }
    this.forceUpdate();
  }
  handleSortByAdName() {
    if (this.state.sortedBy != 'AdNameAsc') {
      this.state.computers.sort((a, b) => a.adName > b.adName ? 1 : -1)
      this.state.sortedBy = 'AdNameAsc'
    }
    else {
      this.state.computers.sort((a, b) => a.adName < b.adName ? 1 : -1)
      this.state.sortedBy = 'AdNameDesc'
    }
    this.forceUpdate();
  }
  handleFilterChange(Event) {
    this.state.filterBy = Event.target.value;
    this.state.filterInputValue = '';
    this.state.computers = this.state.tempComputers;
    this.forceUpdate();
  }
  handleFilterData(Event) {
    this.state.filterInputValue = Event.target.value;
    let pattern = Event.target.value;
    console.log(pattern);
    this.state.computers = this.state.tempComputers;
    let result = [];
    if (this.state.filterBy == 'ID') { result = this.state.computers.filter((element) => new RegExp(pattern).test(element.deviceId)) };
    if (this.state.filterBy == 'Owner') { result = this.state.computers.filter((element) => new RegExp(pattern).test(element.owner.lastName)) };
    if (this.state.filterBy == 'IP') { result = this.state.computers.filter((element) => new RegExp(pattern).test(element.ipAddress)) };
    if (this.state.filterBy == 'AdName') { result = this.state.computers.filter((element) => new RegExp(pattern).test(element.adName)) };
    this.state.computers = result;
    this.forceUpdate();

  }
  componentDidMount() {
    fetch("http://localhost:8080/api/v1/computers")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            computers: result,
            tempComputers: result
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
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Filtruj</label>
            </div>
            <select class="custom-select col-2" id="inputGroupSelect01" onChange={this.handleFilterChange}>
              <option selected value="ID">ID</option>
              <option value="Owner">Właściciel (nazwisko)</option>
              <option value="IP">IP</option>
              <option value="AdName">Nazwa AD</option>
            </select>
            <input type="text" class="form-control" aria-label="Tu wpisz tekst wg którego chcesz filtrować dane" placeholder="Wpisz tekst wg którego chcesz filtrować dane" value={this.state.filterInputValue} onChange={this.handleFilterData}></input>
          </div>
          <table class="table table-light table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByID} >ID</button></th>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByOwner} >Właściciel</button></th>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByIP} >IP</button></th>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByAdName} >Nazwa AD</button></th>
                <th scope="col">Użytkownicy</th>
                <th scope="col" colspan="2">Operacje</th>
              </tr>
            </thead>
            <tbody>
              {computers.map(computer => (
                <tr key={computer.identifier}>
                  <td>{computer.deviceId}</td>
                  <td><a href={"http://localhost:3000/users/" + computer.owner.identifier} class="btn btn-light">{computer.owner.firstName} {computer.owner.lastName}</a></td>
                  <td>{computer.ipAddress}</td>
                  <td>{computer.adName}</td>
                  <td><a class="btn btn-primary b-2" href={"http://localhost:3000/computers/" + computer.identifier + "/users/"}>Wyświetl</a></td>
                  <td><a class="btn btn-info b-2" href={"http://localhost:3000/computers/" + computer.identifier}>Szczegóły</a></td>
                  <td><button class="btn btn-danger b-2" onClick={() => {
                    this.handleDeleteClick(computer.identifier);
                  }}>Usuń</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div >
      );
    }
  }
}
export default Computers