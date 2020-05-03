
import React, { Component } from 'react';
export class ComputerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      computer: null
    };

  }


  componentDidMount() {
    let url = "http://localhost:8080/api/v1/computers/" + this.props.match.params.id;
    //console.log(fetch(url));
    //console.log(fetch(url));
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            computer: result
          });
          console.log(this.state.computer)
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
    let { error, isLoaded, computer } = this.state;
    if (error) {
      return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
      return <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>;
    } else {
      return (
        <div>
          <span class="d-block p-2 bg-primary text-white">Szczegółowe dane komputera</span>
          <form>
            <div class="form-group">
              <label for="deviceID">ID urządzenia</label>
              <input type="text" class="form-control" id="deviceID" value={this.state.computer.deviceId}  />
              <label for="producer">Producent</label>
              <input type="text" class="form-control" id="producer" value={this.state.computer.producer}></input>
              <label for="model">Model</label>
              <input type="text" class="form-control" id="model" value={this.state.computer.model}></input>
              <label for="cpu">Procesor</label>
              <input type="text" class="form-control" id="cpu" value={this.state.computer.cpu}></input>
              <label for="cpu">RAM</label>
              <input type="text" class="form-control" id="ram" value={this.state.computer.ram}></input>
              <label for="model">Dysk twardy</label>
              <input type="text" class="form-control" id="hdd" value={this.state.computer.hdd}></input>
              <label for="ip">IP</label>
              <input type="text" class="form-control" id="ip" value={this.state.computer.ipAddress}></input>
              <label for="ip">MAC</label>
              <input type="text" class="form-control" id="ip" value={this.state.computer.macAddress}></input>

            </div>
          </form>
        
        </div>
      )
    }
  }

}

export default ComputerDetails