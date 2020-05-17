
import React, { Component } from 'react';
export class ComputerAdd extends Component {

  render() {
    return (
      <div>
        <span class="d-block p-2 bg-primary text-white">Szczegółowe dane komputera</span>
        <form>
          <div class="form-group">
            <label for="deviceID">ID urządzenia</label>
            <input type="text" class="form-control" id="deviceID"/>
            <label for="producer">Producent</label>
            <input type="text" class="form-control" id="producer"></input>
            <label for="model">Model</label>
            <input type="text" class="form-control" id="model"></input>
            <label for="cpu">Procesor</label>
            <input type="text" class="form-control" id="cpu"></input>
            <label for="cpu">RAM</label>
            <input type="text" class="form-control" id="ram"></input>
            <label for="model">Dysk twardy</label>
            <input type="text" class="form-control" id="hdd"></input>
            <label for="ip">IP</label>
            <input type="text" class="form-control" id="ip"></input>
            <label for="ip">MAC</label>
            <input type="text" class="form-control" id="mac"></input>
          </div>
        </form>
        <a href="http://localhost:3000/computers/add" class="btn btn-success">Zapisz</a>
      </div>
      
    )
  }
}
export default ComputerAdd