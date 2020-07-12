import React, { Component } from 'react';
import Config from '../Config'
import Loading from '../Loading';
export class Sites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sites: [],
      tempSites: [], //kopia, na której nie wykonujemy żadnych zmian
      sortedBy: 'IDAsc',
      filterBy: 'ID',
      filterInputValue: ''
    };

  }
  handleDeleteClick = siteId => {
    let confirmDelete = window.confirm("Czy na pewno usunąć?");
    if (confirmDelete) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
        }
      };

      fetch(Config.serverAddress + "/api/v1/sites/" + siteId, requestOptions).then((response) => {
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
  handleSortByID= ()=>{
    if (this.state.sortedBy !== 'IDAsc') {
      this.state.sites.sort((a, b) => a.deviceId > b.deviceId ? 1 : -1)
      this.setState({ sortedBy: 'IDAsc' })
    }
    else {
      this.state.sites.sort((a, b) => a.deviceId < b.deviceId ? 1 : -1)
      this.setState({ sortedBy: 'IDDesc' })
    }
    this.forceUpdate();
  }
  handleSortByName=()=> {
    if (this.state.sortedBy !== 'NameAsc') {
      this.state.sites.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
      this.setState({ sortedBy: 'NameAsc' })
    }
    else {
      this.state.sites.sort((a, b) => {
        return a.name < b.name ? 1 : -1
      })
      this.setState({ sortedBy: 'NameDesc' })
    }
    this.forceUpdate();
  }

  handleFilterChange=Event=> {
    this.setState({ filterBy: Event.target.value })
    this.setState({ filterInputValue: "" })
    this.setState({ sites: this.state.tempSites })
    this.forceUpdate();
  }
  handleFilterData=Event=> {
    if (Event.target.value === '') {
      this.setState({ sites: this.state.tempSites })
      this.setState({ filterInputValue: "" })
      this.forceUpdate();
    }
    else {
      this.setState({ filterInputValue: Event.target.value })
      let pattern = Event.target.value;
      this.setState({ sites: this.state.tempSites })
      let result = [];
      if (this.state.filterBy === 'ID') result = this.state.sites.filter((element) => (element.siteId != null) ? new RegExp(pattern).test(element.siteId) : false);
      if (this.state.filterBy === 'Name') result = this.state.sites.filter((element) => (element.name != null) ? new RegExp(pattern).test(element.name) : false);
      this.setState({ sites: result })
      this.forceUpdate();
    }
  }
  componentDidMount() {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }
    };
    fetch(Config.serverAddress + "/api/v1/sites", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            sites: result,
            tempSites: result
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
    const { error, isLoaded, sites } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        <div>
          <h1>Lista lokalizacji</h1>
          <a href={Config.pageAddress + "/sites/add"} class="btn btn-success m-2">Dodaj nową</a>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Filtruj</label>
            </div>
            <select class="custom-select col-2" id="inputGroupSelect01" onChange={this.handleFilterChange}>
              <option selected value="ID">ID</option>
              <option value="Name">Nazwa</option>
            </select>
            <input type="text" class="form-control" aria-label="Tu wpisz tekst wg którego chcesz filtrować dane" placeholder="Wpisz tekst wg którego chcesz filtrować dane" value={this.state.filterInputValue} onChange={this.handleFilterData}></input>
          </div>
          <table class="table table-light table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByID} >ID</button></th>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByName} >Nazwa</button></th>
                <th scope="col" colspan="2">Operacje</th>
              </tr>
            </thead>
            <tbody>
              {console.log(this.state.sites)}
              {Array.isArray(this.state.sites) &&
                sites.map(site => (
                  <tr key={site.identifier}>
                    {site.siteId
                      ? <td>{site.siteId}</td>
                      : <td>-</td>
                    }
                    {site.name
                      ? <td>{site.name}</td>
                      : <td>-</td>
                    }
                    <td><a class="btn btn-info b-2" href={Config.pageAddress + "/sites/" + site.identifier}>Szczegóły</a></td>
                    <td><button class="btn btn-danger b-2" onClick={() => {
                      this.handleDeleteClick(site.identifier);
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
export default Sites