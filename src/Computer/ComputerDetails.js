
import React, { Component } from 'react';
import Config from '../Config'
export class ComputerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      computer: null,
      id: '',
      deviceId: '',
      producer: '',
      model: '',
      cpu: '',
      ram: '',
      hdd: '',
      ipAddress: '',
      macAddress: ''
    };
    this.handleChangeDeviceId = this.handleChangeDeviceId.bind(this);
    this.handleChangeProducer = this.handleChangeProducer.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeCpu = this.handleChangeCpu.bind(this);
    this.handleChangeRam = this.handleChangeRam.bind(this);
    this.handleChangeHdd = this.handleChangeHdd.bind(this);
    this.handleChangeIpAddress = this.handleChangeIpAddress.bind(this);
    this.handleChangeMacAddress = this.handleChangeMacAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeDeviceId(event) {
    this.setState({ deviceId: event.target.value });
  }
  handleChangeProducer(event) {
    this.setState({ deviceId: event.target.value });
  }
  handleChangeModel(event) {
    this.setState({ model: event.target.value });
  }
  handleChangeCpu(event) {
    this.setState({ cpu: event.target.value });
  }
  handleChangeRam(event) {
    this.setState({ ram: event.target.value });
  }
  handleChangeHdd(event) {
    this.setState({ hdd: event.target.value });
  }
  handleChangeIpAddress(event) {
    this.setState({ ipAddress: event.target.value });
  }
  handleChangeMacAddress(event) {
    this.setState({ macAddress: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const item = {
      id: this.state.id,
      deviceId: this.state.deviceId,
      producer: this.state.producer,
      model: this.state.model,
      cpu: this.state.cpu,
      ram: this.state.ram,
      hdd: this.state.hdd,
      ipAddress: this.state.ipAddress,
      macAddress: this.state.macAddress
    }
    console.log("Body" + JSON.stringify(item));

    await fetch(Config.serverAddress + '/api/v1/computers/' + this.state.id, {
      method: 'PUT',
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

  componentDidMount() {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      }
    }
    let url = Config.serverAddress + "/api/v1/computers/" + this.props.match.params.id;
    fetch(url, requestOptions)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          return res.json()
        }
        if (res.status==401 || res.status==403) //zmienić tylko na 401? 403 to brak autoryzacji
        {
          window.location.replace(Config.pageAddress+"/login");
        }
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            id: result.id,
            deviceId: result.deviceId,
            producer: result.producer,
            model: result.model,
            cpu: result.cpu,
            ram: result.ram,
            hdd: result.hdd,
            ipAddress: result.ipAddress,
            macAddress: result.macAddress
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
    let { error, isLoaded } = this.state;
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
              <input type="number" class="form-control" id="deviceID" value={this.state.deviceId} onChange={(event) => this.setState({ deviceId: event.target.value })} />
              <label for="producer">Producent</label>
              <input type="text" class="form-control" id="producer" value={this.state.producer} onChange={(event) => this.setState({ producer: event.target.value })} />
              <label for="model">Model</label>
              <input type="text" class="form-control" id="model" value={this.state.model} onChange={this.handleChangeModel}></input>
              <label for="cpu">Procesor</label>
              <input type="text" class="form-control" id="cpu" value={this.state.cpu} onChange={this.handleChangeCpu}></input>
              <label for="cpu">RAM</label>
              <input type="text" class="form-control" id="ram" value={this.state.ram} onChange={this.handleChangeRam}></input>
              <label for="model">Dysk twardy</label>
              <input type="text" class="form-control" id="hdd" value={this.state.hdd} onChange={this.handleChangeHdd}></input>
              <label for="ip">IP</label>
              <input type="text" class="form-control" id="ip" value={this.state.ipAddress} onChange={this.handleChangeIpAddress}></input>
              <label for="mac">MAC</label>
              <input type="text" class="form-control" id="mac" value={this.state.macAddress} onChange={this.handleChangeMacAddress}></input>
            </div>
          </form>
          <input type="submit" class="btn btn-success m-2" value="Zapisz" onClick={this.handleSubmit} />
        </div>
      )
    }
  }
}

export default ComputerDetails