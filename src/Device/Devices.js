import React, { Component } from 'react';
import Config from '../Config'
export class Device extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      devices: [],
      tempDevices: [], //kopia, na której nie wykonujemy żadnych zmian
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
  handleDeleteClick = deviceId => {
    let confirmDelete = window.confirm("Czy na pewno usunąć?");
    if (confirmDelete) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
        }
      };

      fetch(Config.serverAddress + "/api/v1/devices/" + deviceId, requestOptions).then((response) => {
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
    if (this.state.sortedBy !== 'IDAsc') {
      this.state.devices.sort((a, b) => a.deviceId > b.deviceId ? 1 : -1)
      this.setState({ sortedBy: 'IDAsc' })
    }
    else {
      this.state.devices.sort((a, b) => a.deviceId < b.deviceId ? 1 : -1)
      this.setState({ sortedBy: 'IDDesc' })
    }
    this.forceUpdate();
  }
  handleSortByOwner() {
    if (this.state.sortedBy !== 'OwnerAsc') {
      this.state.devices.sort((a, b) => {
        if (a.owner === null || a.owner.lastName === null) return -1;
        if (b.owner === null || b.owner.lastName === null) return 1;
        return a.owner.lastName > b.owner.lastName ? 1 : -1
      })
      this.setState({ sortedBy: 'OwnerAsc' })
    }
    else {
      this.state.devices.sort((a, b) => {
        if (a.owner === null || a.owner.lastName === null) return -1;
        if (b.owner === null || b.owner.lastName === null) return 1;
        return a.owner.lastName < b.owner.lastName ? 1 : -1
      })
      this.setState({ sortedBy: 'OwnerDesc' })
    }
    this.forceUpdate();
  }
  handleSortByIP() {
    if (this.state.sortedBy !== 'IPAsc') {
      this.state.devices.sort((a, b) => a.ipAddress > b.ipAddress ? 1 : -1)
      this.setState({ sortedBy: 'IPAsc' })
    }
    else {
      this.state.devices.sort((a, b) => a.ipAddress < b.ipAddress ? 1 : -1)
      this.setState({ sortedBy: 'IPDesc' })
    }
    this.forceUpdate();
  }
  handleSortByAdName() {
    if (this.state.sortedBy !== 'AdNameAsc') {
      this.state.devices.sort((a, b) => a.adName > b.adName ? 1 : -1)
      this.setState({ sortedBy: 'AdNameAsc' })
    }
    else {
      this.state.devices.sort((a, b) => a.adName < b.adName ? 1 : -1)
      this.setState({ sortedBy: 'AdNameDesc' })
    }
    this.forceUpdate();
  }
  handleFilterChange(Event) {
    this.setState({ filterBy: Event.target.value })
    this.setState({ filterInputValue: "" })
    this.setState({ devices: this.state.tempDevices })
    this.forceUpdate();
  }
  handleFilterData(Event) {
    if (Event.target.value === '') {
      this.setState({ devices: this.state.tempDevices })
      this.setState({ filterInputValue: "" })
      this.forceUpdate();
    }
    else {
      this.setState({ filterInputValue: Event.target.value })
      let pattern = Event.target.value;
      this.setState({ devices: this.state.tempDevices })
      let result = [];
      if (this.state.filterBy === 'ID') result = this.state.devices.filter((element) => (element.deviceId != null) ? new RegExp(pattern).test(element.deviceId) : false);
      if (this.state.filterBy === 'Owner') result = this.state.devices.filter((element) => (element.owner != null) ? new RegExp(pattern).test(element.owner.lastName) : false);
      if (this.state.filterBy === 'IP') result = this.state.devices.filter((element) => (element.ipAddress != null) ? new RegExp(pattern).test(element.ipAddress) : false);
      if (this.state.filterBy === 'AdName') result = this.state.devices.filter((element) => (element.adName != null) ? new RegExp(pattern).test(element.adName) : false);
      this.setState({ devices: result })
      this.forceUpdate();
    }
  }
  componentDidMount() {
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }
    };
    fetch(Config.serverAddress + "/api/v1/devices", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            devices: result,
            tempDevices: result
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
    const { error, isLoaded, devices } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>;
    } else {
      return (
        <div>
          <h1>Lista urządzeń</h1>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Filtruj</label>
            </div>
            <select class="custom-select col-2" id="inputGroupSelect01" onChange={this.handleFilterChange}>
              <option selected value="ID">ID</option>
              <option value="Owner">Właściciel (nazwisko)</option>
              <option value="IP">IP</option>
            </select>
            <input type="text" class="form-control" aria-label="Tu wpisz tekst wg którego chcesz filtrować dane" placeholder="Wpisz tekst wg którego chcesz filtrować dane" value={this.state.filterInputValue} onChange={this.handleFilterData}></input>
          </div>
          <table class="table table-light table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByID} >ID</button></th>
                <th scope="col">Typ</th>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByOwner} >Właściciel</button></th>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByIP} >IP</button></th>
                <th scope="col" colspan="2">Operacje</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(this.state.devices) && devices.map(device => (
                <tr key={device.identifier}>
                  {device.deviceId
                    ? <td>{device.deviceId}</td>
                    : <td>-</td>
                  }
                  {device.deviceType
                    ? <td>{device.deviceType}</td>
                    : <td>-</td>
                  }
                  {device.owner != null
                    ? <td><a href={Config.pageAddress + "/users/" + device.owner.identifier} class="btn btn-light">{device.owner.firstName} {device.owner.lastName}</a></td>
                    : <td>-</td>//Można dodać później przycisk, który pozwoli na późniejsze przypisywanie właściciela
                  }
                  {device.ipAddress
                    ? <td>{device.ipAddress}</td>
                    : <td>-</td>
                  }
                  <td><a class="btn btn-info b-2" href={Config.pageAddress + "/"+device.deviceType.toLowerCase()+"s/" + device.identifier}>Szczegóły</a></td>
                  <td><button class="btn btn-danger b-2" onClick={() => {
                    this.handleDeleteClick(device.identifier);
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
export default Device