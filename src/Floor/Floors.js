import React, { Component } from 'react';
import Config from '../Config';
import Loading from '../Loading';
import ModalConfirmDelete from '../ModalConfirmDelete';
export class Floors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      floors: [],
      tempFloors: [], //kopia, na której nie wykonujemy żadnych zmian
      sortedBy: 'IDAsc',
      filterBy: 'ID',
      filterInputValue: '',
      floorToDelete:''
    };

  }
  handleDeleteClick = ()=> {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Authorization': 'Bearer '+localStorage.getItem('Authorization')
      }
    };
    fetch(Config.serverAddress + "/api/v1/floors/" + this.state.floorToDelete.id, requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
    })
      .then(() => {
        window.location.reload();//trzeba poprawić tak, aby nie przeładowywało całej strony
      });
}

  handleSortBySite = () => {
    if (this.state.sortedBy !== 'SiteAsc') {
      this.state.floors.sort((a, b) => a.building.site.siteId > b.building.site.siteId ? 1 : -1)
      this.setState({ sortedBy: 'SiteAsc' })
    }
    else {
      this.state.floors.sort((a, b) => a.building.site.siteId < b.building.site.siteId ? 1 : -1)
      this.setState({ sortedBy: 'SiteDesc' })
    }
    this.forceUpdate();
  }
  handleSortByNumber = () => {
    if (this.state.sortedBy !== 'NumberAsc') {
      this.state.floors.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
      this.setState({ sortedBy: 'NumberAsc' })
    }
    else {
      this.state.floors.sort((a, b) => {
        return a.name < b.name ? 1 : -1
      })
      this.setState({ sortedBy: 'NumberDesc' })
    }
    this.forceUpdate();
  }

  handleFilterChange = Event => {
    this.setState({ filterBy: Event.target.value })
    this.setState({ filterInputValue: "" })
    this.setState({ floors: this.state.tempFloors.slice() })
    this.forceUpdate();
  }
  handleFilterData = Event => {
    let floors = this.state.tempFloors.slice();
    this.setState({ filterInputValue: Event.target.value })
    let pattern ="^"+Event.target.value;
    let result = [];
    if (this.state.filterBy === 'ID') { result = floors.filter((element) => new RegExp(pattern).test(element.siteId)) }
    else if (this.state.filterBy === 'Site') { result = floors.filter((element) => new RegExp(pattern).test(element.building.site.siteId)) }
    this.setState({ floors: result })
  }
  componentDidMount() {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }
    };
    fetch(Config.serverAddress + "/api/v1/floors", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            floors: result,
            tempFloors: result
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
    const { error, isLoaded, floors } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loading />;
    } else {
      return (
        <div>
          <h1>Lista pięter</h1>
          <a href={Config.pageAddress + "/floors/add"} class="btn btn-success m-2">Dodaj nowe</a>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">Filtruj</label>
            </div>
            <select class="custom-select col-2" id="inputGroupSelect01" onChange={this.handleFilterChange}>
              <option selected value="ID">ID</option>
              <option value="Site">Kompleks</option>
            </select>
            <input type="text" class="form-control" aria-label="Tu wpisz tekst wg którego chcesz filtrować dane" placeholder="Wpisz tekst wg którego chcesz filtrować dane" value={this.state.filterInputValue} onChange={this.handleFilterData}></input>
          </div>
          <table class="table table-light table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col"><button type="button" class="btn btn-dark" onClick={this.handleSortByName} >Poziom</button></th>
                <th scope="col">Budynek</th> 
                <th scope="col">Kompleks</th>
                <th scope="col" colspan="2">Operacje</th>
              </tr>
            </thead>
            <tbody>
              {console.log(this.state.floors)}
              {Array.isArray(this.state.floors) &&
                floors.map(floor => (
                  <tr key={floor.identifier}>
                    {floor.level
                      ? <td>{floor.level}</td>
                      : <td>-</td>
                    }
                    {floor.building.number
                      ?<td><a href={Config.pageAddress + "/buildings/" + floor.building.id} class="btn btn-light">{floor.building.number}</a></td>
                      : <td>-</td>
                    }
                    {floor.building.site.siteId
                    ?<td><a href={Config.pageAddress + "/sites/" + floor.building.site.id} class="btn btn-light">{floor.building.site.siteId+" "+floor.building.site.name}</a></td>
                      : <td>-</td>
                    }
                    <td><a class="btn btn-info b-2" href={Config.pageAddress + "/floors/" + floor.id}>Szczegóły</a></td>
                    <td><button class="btn btn-danger b-2" data-toggle="modal" data-target="#modalConfirmDelete" onClick={() => {this.setState({ floorToDelete: floor})
                    }}>Usuń</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ModalConfirmDelete handleConfirmClick={this.handleDeleteClick} toDelete={"piętro: "+this.state.floorToDelete.level} />
        </div >
      );
    }
  }
}
export default Floors