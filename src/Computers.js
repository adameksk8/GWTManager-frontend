
import React, { Component } from 'react';
export class Computers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      computers:[]
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/computers")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            computers: result
          });
          console.log(this.state.computers)
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
            <span class="d-block p-2 bg-primary text-white">Lista komputerów</span>
<table class="table table-dark">
  <thead>
    <tr>
    <th scope="col">ID</th>
    <th scope="col">Użytkownik</th>
    <th scope="col">Producent</th>
    <th scope="col">Model</th>
    <th scope="col">IP</th>
    <th scope="col">MAC</th>
    <th scope="col">Opis</th>
    </tr>
  </thead>
  <tbody>
  
  {computers._embedded.computers.map(computer => (
    
    <tr>
        <th scope="row"><a href={"http://localhost:3000/computers/"+computer.identifier}>{computer.deviceId}</a></th>
        <td><a href={computer._links.owner.href}>{computer._links.owner.href}</a></td>
        <td>{computer.producer}</td>
        <td>{computer.model}</td>
        <td>{computer.ipAddress}</td>
        <td>{computer.macAddress}</td>
        <td>{computer.description}</td>
    </tr>
    ))}
  </tbody>
</table>
</div>
        );
      }
    }
  }

export default Computers