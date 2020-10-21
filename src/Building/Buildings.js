import React, { Component } from 'react';
import Config from '../Config';
import Loading from '../Loading';
import ModalConfirmDelete from '../ModalConfirmDelete';
export class Buildings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      buildings: [],
      tempBuildings: [], //kopia, na której nie wykonujemy żadnych zmian
      sortedBy: 'IDAsc',
      filterBy: 'ID',
      filterInputValue: '',
      buildingToDelete:''
    };

  }

  handleDeleteClick = ()=> {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Authorization': 'Bearer '+localStorage.getItem('Authorization')
      }
    };
    fetch(Config.serverAddress + "/api/v1/buildings/" + this.state.buildingToDelete.id, requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
    })
      .then(() => {
        window.location.reload();//trzeba poprawić tak, aby nie przeładowywało całej strony
      });
}

  handleSortByID = () => {
    if (this.state.sortedBy !== 'IDAsc') {
      this.state.buildings.sort((a, b) => a.id > b.id ? 1 : -1)
      this.setState({ sortedBy: 'IDAsc' })
    }
    else {
      this.state.buildings.sort((a, b) => a.id < b.id ? 1 : -1)
      this.setState({ sortedBy: 'IDDesc' })
    }
    this.forceUpdate();
  }
  handleSortByNumber = () => {
    if (this.state.sortedBy !== 'NumberAsc') {
      this.state.buildings.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
      this.setState({ sortedBy: 'NumberAsc' })
    }
    else {
      this.state.buildings.sort((a, b) => {
        return a.name < b.name ? 1 : -1
      })
      this.setState({ sortedBy: 'NumberDesc' })
    }
    this.forceUpdate();
  }

  handleFilterChange = Event => {
    this.setState({ filterBy: Event.target.value })
    this.setState({ filterInputValue: "" })
    this.setState({ buildings: this.state.tempBuildings })
    this.forceUpdate();
  }
  handleFilterData = Event => {
    if (Event.target.value === '') {
      this.setState({ buildings: this.state.tempBuildings })
      this.setState({ filterInputValue: "" })
      this.forceUpdate();
    }
    else {
      this.setState({ filterInputValue: Event.target.value })
      let pattern = Event.target.value;
      this.setState({ buildings: this.state.tempBuildings })
      let result = [];
      if (this.state.filterBy === 'ID') result = this.state.buildings.filter((element) => (element.siteId != null) ? new RegExp(pattern).test(element.siteId) : false);
      if (this.state.filterBy === 'Name') result = this.state.buildings.filter((element) => (element.name != null) ? new RegExp(pattern).test(element.name) : false);
      this.setState({ buildings: result })
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
    fetch(Config.serverAddress + "/api/v1/buildings", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            buildings: result,
            tempBuildings: result
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
    const { error, isLoaded, buildings } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        <div>
          <h1>Lista budynków</h1>
          <a href={Config.pageAddress + "/buildings/add"} class="btn btn-success m-2">Dodaj nowy</a>
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
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByName} >Numer</button></th>
                <th scope="col">Kompleks</th>
                <th scope="col" colspan="2">Operacje</th>
              </tr>
            </thead>
            <tbody>
              {console.log(this.state.buildings)}
              {Array.isArray(this.state.buildings) &&
                buildings.map(building => (
                  <tr key={building.id}>
                    {building.number
                      ? <td>{building.number}</td>
                      : <td>-</td>
                    }
                    {building.site.siteId&&building.site.name
                      ?<td><a href={Config.pageAddress + "/sites/" + building.site.id} class="btn btn-light">{building.site.siteId+" "+building.site.name}</a></td>
                      : <td>-</td>
                    }
                    <td><a class="btn btn-info b-2" href={Config.pageAddress + "/buildings/" + building.id}>Szczegóły</a></td>
                    <td><button class="btn btn-danger b-2" data-toggle="modal" data-target="#modalConfirmDelete" onClick={() => {this.setState({ buildingToDelete: building})
                    }}>Usuń</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ModalConfirmDelete handleConfirmClick={this.handleDeleteClick} toDelete={"budynek o numerze: "+this.state.buildingToDelete.number} />
        </div >
      );
    }
  }
}
export default Buildings