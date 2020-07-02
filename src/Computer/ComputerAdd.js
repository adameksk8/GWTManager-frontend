
import React, { Component } from 'react';
import Config from '../Config';
export class ComputerAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isLoadedUsers: false,
      computer: null,
      users: [],
      id: '',
      deviceId: '',
      producer: '',
      model: '',
      cpu: '',
      ram: '',
      hdd: '',
      ipAddress: '',
      macAddress: '',
      owner: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
    fetch(Config.serverAddress + "/api/v1/users", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          result.sort((a, b) => a.lastName.localeCompare(b.lastName));
          this.setState({
            isLoadedUsers: true,
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

  validateInput(input, regex) {
    if (regex.test(input.value)) {
      input.classList.add("is-valid")
      input.classList.remove("is-invalid")
      return true;
    }
    else {
      input.classList.add("is-invalid")
      input.classList.remove("is-valid")
      return false;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const item = {
      deviceId: this.state.deviceId,
      producer: this.state.producer,
      model: this.state.model,
      cpu: this.state.cpu,
      ram: this.state.ram,
      hdd: this.state.hdd,
      ipAddress: this.state.ipAddress,
      macAddress: this.state.macAddress,
      owner: this.state.owner
    }
    console.log("Body" + JSON.stringify(item));

    await fetch(Config.serverAddress + '/api/v1/computers/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      },
      body: JSON.stringify(item),
    }
    );
    alert("Zapisano");
  }
  render() {
    let { error, isLoaded, users } = this.state;
    return (

      <div>
        <span class="d-block p-2 bg-primary text-white">Szczegółowe dane komputera</span>
        <form>
          <div class="form-group">
            <label for="deviceID" >ID urządzenia</label>
            <input type="text" placeholder="Wpisz ID komputera" class="form-control is-invalid " id="deviceID" onChange={(event) => {
              if (this.validateInput(event.target, new RegExp('[0-9]{4,6}$'))) this.setState({ deviceId: event.target.value })
            }
            } />
            <label for="exampleFormControlSelect1">Wybierz właściciela</label>
            <select class="form-control is-valid" id="exampleFormControlSelect1" onChange={(event) => {
              this.setState({ 'owner': this.state.users.find(user => user.id == event.target.value) });
            }}>
              <option selected disabled>Wybierz...</option>
              {this.state.users.order}
              {Array.isArray(this.state.users) && users.map(user => (
                <option value={user.id}>{user.firstName + " " + user.lastName + " Pesel: " + user.pesel}</option>
              ))}

            </select>
            <label for="producer">Producent</label>
            <input type="text" placeholder="Wpisz producenta komputera" class="form-control is-invalid" id="producer" onChange={(event) => {
              if (this.validateInput(event.target, new RegExp('[a-zA-Z0-9]{2,16}$'))) this.setState({ producer: event.target.value });
            }}></input>
            <label for="model">Model</label>
            <input type="text" placeholder="Wpisz model komputera" class="form-control is-invalid" id="model" onChange={(event) => {
              if (this.validateInput(event.target, new RegExp('[a-zA-Z0-9]{2,16}$'))) this.setState({ model: event.target.value });
            }}></input>
            <label for="cpu">Procesor</label>

            <input type="text" placeholder="Wpisz model procesora" class="form-control is-valid" id="cpu" onChange={(event) => this.setState({ cpu: event.target.value })}></input>
            <label for="cpu">RAM</label>
            <input type="text" placeholder="Wpisz ilość ramu (GB)" class="form-control" id="ram" onChange={(event) => this.setState({ ram: event.target.value })}></input>
            <label for="model">Dysk twardy</label>
            <input type="text" placeholder="Wpisz dane dysku twardego" class="form-control" id="hdd" onChange={(event) => this.setState({ hdd: event.target.value })}></input>
            <label for="ip">IP</label>
            <input type="text" placeholder="Wpisz adres IP" class="form-control is-valid" id="ip" m onChange={(event) =>{
              if (this.validateInput(event.target, new RegExp('^([1-9]{1}[0-9]{0,1}|[1][0-9]{0,2}|[2][0-5]{0,2})(\.(0|[1-9]{1}[0-9]{0,1}|[1][0-9]{0,2}|[2][0-5]{0,2})){3}$'))) this.setState({ ipAddress: event.target.value });
            }}></input>
            <label for="ip">MAC</label>
            <input type="text" placeholder="Wpisz adres MAC" class="form-control is-valid" id="mac" onChange={(event) =>{ 
              if (this.validateInput(event.target, new RegExp('^(([0-9a-fA-F]){2})(\:([0-9a-fA-F]){2}){7}$'))) this.setState({ macAddress: event.target.value.toUpperCase });
              }}></input>
          </div>
        </form>
        <a href={Config.pageAddress + "/computers/add"} class="btn btn-success" onClick={this.handleSubmit}>Zapisz</a>
      </div>

    )
  }
}
export default ComputerAdd