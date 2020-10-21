import React, { Component } from 'react';
import Config from '../Config'
import Loading from '../Loading';
import ModalConfirmDelete from '../ModalConfirmDelete';
export class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rooms: [],
            tempRooms: [], //kopia, na której nie wykonujemy żadnych zmian
            sortedBy: 'IDAsc',
            filterBy: 'ID',
            filterInputValue: '',
            roomToDelete:''
        };

    }
    handleDeleteClick = ()=> {
        const requestOptions = {
          method: 'DELETE',
          headers: { 
            'Authorization': 'Bearer '+localStorage.getItem('Authorization')
          }
        };
        fetch(Config.serverAddress + "/api/v1/rooms/" + this.state.roomToDelete.id, requestOptions).then((response) => {
          return response.json();
        }).then((result) => {
        })
          .then(() => {
            window.location.reload();//trzeba poprawić tak, aby nie przeładowywało całej strony
          });
    }
    handleSortByID = () => {
        if (this.state.sortedBy !== 'IDAsc') {
            this.state.rooms.sort((a, b) => a.id > b.id ? 1 : -1)
            this.setState({ sortedBy: 'IDAsc' })
        }
        else {
            this.state.rooms.sort((a, b) => a.id < b.id ? 1 : -1)
            this.setState({ sortedBy: 'IDDesc' })
        }
        this.forceUpdate();
    }
    handleSortByNumber = () => {
        if (this.state.sortedBy !== 'NumberAsc') {
            this.state.rooms.sort((a, b) => {
                return a.name > b.name ? 1 : -1
            })
            this.setState({ sortedBy: 'NumberAsc' })
        }
        else {
            this.state.rooms.sort((a, b) => {
                return a.name < b.name ? 1 : -1
            })
            this.setState({ sortedBy: 'NumberDesc' })
        }
        this.forceUpdate();
    }

    handleFilterChange = Event => {
        this.setState({ filterBy: Event.target.value })
        this.setState({ filterInputValue: "" })
        this.setState({ rooms: this.state.tempRooms })
        this.forceUpdate();
    }
    handleFilterData = Event => {
        if (Event.target.value === '') {
            this.setState({ rooms: this.state.tempRooms })
            this.setState({ filterInputValue: "" })
            this.forceUpdate();
        }
        else {
            this.setState({ filterInputValue: Event.target.value })
            let pattern = Event.target.value;
            this.setState({ rooms: this.state.tempRooms })
            let result = [];
            if (this.state.filterBy === 'ID') result = this.state.rooms.filter((element) => (element.siteId != null) ? new RegExp(pattern).test(element.siteId) : false);
            if (this.state.filterBy === 'Name') result = this.state.rooms.filter((element) => (element.name != null) ? new RegExp(pattern).test(element.name) : false);
            this.setState({ rooms: result })
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
        fetch(Config.serverAddress + "/api/v1/rooms", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        rooms: result,
                        tempRooms: result
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
        const { error, isLoaded, rooms } = this.state;
        if (error) {
            return <div>Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loading />;
        } else {
            return (
                <div>
                    <h1>Lista pomieszczeń</h1>
                    <a href={Config.pageAddress + "/rooms/add"} class="btn btn-success m-2">Dodaj nowe</a>
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
                                <th scope="col">Piętro</th>
                                <th scope="col">Budynek</th>
                                <th scope="col">Kompleks</th>
                                <th scope="col" colspan="2">Operacje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(this.state.rooms)}
                            {Array.isArray(this.state.rooms) &&
                                rooms.map(room => (
                                    <tr key={room.identifier}>
                                        {room.number 
                                            ? <td>{room.number}</td>
                                            
                                            : <td>-</td>
                                        }
                                        {room.floor.level
                                            ?<td><a href={Config.pageAddress + "/floors/" + room.floor.id} class="btn btn-light">{room.floor.level}</a></td>
                                            : <td>-</td>
                                        }
                                        {room.floor.building.number
                                            ?<td><a href={Config.pageAddress + "/buildings/" + room.floor.building.id} class="btn btn-light">{room.floor.building.number}</a></td>
                                            : <td>-</td>
                                        }
                                        {room.floor.building.site.siteId
                                            ?<td><a href={Config.pageAddress + "/sites/" + room.floor.building.site.id} class="btn btn-light">{room.floor.building.site.siteId}</a></td>
                                            : <td>-</td>
                                        }
                                        <td><a class="btn btn-info b-2" href={Config.pageAddress + "/rooms/" + room.identifier}>Szczegóły</a></td>
                                        <td><button class="btn btn-danger b-2" data-toggle="modal" data-target="#modalConfirmDelete" 
                                        onClick={() => {this.setState({ roomToDelete: room})}}>Usuń</button></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <ModalConfirmDelete handleConfirmClick={this.handleDeleteClick} toDelete={"pomieszczenie: "+this.state.roomToDelete.number} />
                </div >
            );
        }
    }
}
export default Rooms