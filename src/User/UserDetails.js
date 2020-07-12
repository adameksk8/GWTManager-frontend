import React, { Component } from 'react';
import Config from '../Config';
export class UserDetails extends Component {
  //na pozniej zrobic tak aby przycisk edytuj odblokowywał formularze
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      id: '',
      firstName: '',
      lastName: '',
      pesel: '',
      role: '',
      email: '',
      phone: '',
      mobilePhone: '',
      voip: '',
      formDisabled: true
    };
  }

  handleClickEdit = (Event) => {
    Event.preventDefault();
    if (this.state.formDisabled) {
      this.setState({ formDisabled: false })
      Event.target.classList.remove("btn-danger");
      Event.target.classList.add("btn-primary");
      Event.target.innerText = "Zablokuj";
    }
    else {
      this.setState({ formDisabled: true })
      Event.target.classList.remove("btn-primary");
      Event.target.classList.add("btn-danger");
      Event.target.innerText = "Odblokuj";
    }
  }


  handleChangeFirstName = event => {
    this.setState({ firstName: event.target.value });
  }
  handleChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  }
  handleChangePesel = event => {
    this.setState({ pesel: event.target.value });
  }
  handleChangeRole = event => {
    this.setState({ role: event.target.value });
  }
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  }
  handleChangePhone = event => {
    console.log(event.target.value);
    this.setState({ phone: event.target.value });
  }
  handleChangeMobilePhone = event => {
    this.setState({ mobilePhone: event.target.value });
  }
  handleChangeVoip = event => {
    this.setState({ voip: event.target.value });
  }
  handleSubmit = async event => {
    event.preventDefault();
    const item = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      pesel: this.state.pesel,
      role: this.state.role,
      email: this.state.email,
      phone: this.state.phone,
      mobilePhone: this.state.mobilePhone,
      voip: this.state.voip
    }
    console.log("Body" + JSON.stringify(item));

    await fetch(Config.serverAddress + '/api/v1/users/' + this.state.id, {
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
    window.history.back();
  }

  componentDidMount() {
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Authorization')
      },
    }
    fetch(Config.serverAddress + "/api/v1/users/" + this.props.match.params.id, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            //user: result,
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            pesel: result.pesel,
            role: result.role,
            phone: result.phone,
            mobilePhone: result.mobilePhone,
            voip: result.voip
          });
          //console.log(this.state.user)
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
          <span class="d-block p-2 bg-primary text-white">Szczegółowe dane użytkownika</span>
          <form>
            <div class="form-group">
              <label for="imie">Imię</label>
              <input type="text" class="form-control" id="imie" value={this.state.firstName} disabled={this.state.formDisabled} onChange={this.handleChangeFirstName} />
              <label for="nazwisko">Nazwisko</label>
              <input type="text" class="form-control" id="nazwisko" value={this.state.lastName} disabled={this.state.formDisabled} onChange={this.handleChangeLastName} /*disabled={this.state.formDisabled}*/></input>
              <label for="pesel">Pesel</label>
              <input type="text" class="form-control" id="pesel" value={this.state.pesel} disabled={this.state.formDisabled} onChange={this.handleChangePesel}></input>
              <label for="role">Rola</label>
              <input type="text" class="form-control" id="role" value={this.state.role} disabled={this.state.formDisabled} onChange={this.handleChangeRole}></input>
              <label for="mail">Mail</label>
              <input type="text" class="form-control" id="email" value={this.state.email} disabled={this.state.formDisabled} onChange={this.handleChangeEmail} /*disabled={this.state.formDisabled}*/></input>
              <label for="phone">Nr telefonu</label>
              <input type="telephone" class="form-control" id="phone" value={this.state.phone} disabled={this.state.formDisabled} onChange={this.handleChangePhone} />
              <label for="phone">Nr telefonu (komórkowy)</label>
              <input type="telephone" class="form-control" id="mobilePhone" value={this.state.mobilePhone} disabled={this.state.formDisabled} onChange={this.handleChangeMobilePhone} />
              <label for="phone">Nr telefonu (VoIP)</label>
              <input type="telephone" class="form-control" id="voip" value={this.state.voip} disabled={this.state.formDisabled} onChange={this.handleChangeVoip} />

              <button class="btn btn-danger" onClick={this.handleClickEdit}>Odblokuj</button>
              <input type="submit" class="btn btn-success" value="Zapisz" hidden={this.state.formDisabled} onClick={this.handleSubmit}/>
              
              
            </div>
          </form>
        </div>
      )
    }
  }
}
export default UserDetails