
import React, { Component } from 'react';
import Config from '../Config';
export class UserAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      computer: null,
      id:'',
      firstName:'',
      lastName: '',
      email:'',
      pesel:'',
      role:'',
      phone:'',
      mobilePhone:'',
      voip:''
    };
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangePesel = this.handleChangePesel.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeMobilePhone = this.handleChangeMobilePhone.bind(this);
    this.handleChangeVoip = this.handleChangeVoip.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }
  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }
  handleChangePesel(event) {
    this.setState({ pesel: event.target.value });
  }
  handleChangeRole(event) {
    this.setState({ role: event.target.value });
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangePhone(event) {
    console.log(event.target.value);
    this.setState({ phone: event.target.value });
  }
  handleChangeMobilePhone(event) {
    this.setState({ mobilePhone: event.target.value });
  }
  handleChangeVoip(event) {
    this.setState({ voip: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const item = {
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      pesel:this.state.pesel,
      role:this.state.role,
      phone:this.state.phone,
      mobilePhone:this.state.mobilePhone,
      voip:this.state.voip
    }
    console.log("Body"+JSON.stringify(item));

    await fetch(Config.serverAddress+'/api/v1/users/', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('Authorization')
      },
      body: JSON.stringify(item), 
    }
    );
    alert("Zapisano");
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <span class="d-block p-2 bg-primary text-white">Wpisz dane użytkownika</span>
        <form>
            <div class="form-group">
              <label for="imie">Imię</label>
              <input type="text" class="form-control" id="imie" value={this.state.firstName} onChange={this.handleChangeFirstName} />
              <label for="nazwisko">Nazwisko</label>
              <input type="text" class="form-control" id="nazwisko" value={this.state.lastName} onChange={this.handleChangeLastName} /*disabled={this.state.formDisabled}*/></input>
              <label for="pesel">Pesel</label>
              <input type="text" class="form-control" id="pesel" value={this.state.pesel} onChange={this.handleChangePesel}></input>
              <label for="role">Rola</label>
              <input type="text" class="form-control" id="role" value={this.state.role} onChange={this.handleChangeRole}></input>
              <label for="mail">Mail</label>
              <input type="text" class="form-control" id="email" value={this.state.email} onChange={this.handleChangeEmail} /*disabled={this.state.formDisabled}*/></input>
              <label for="phone">Nr telefonu</label>
              <input type="telephone" class="form-control" id="phone" value={this.state.phone} onChange={this.handleChangePhone} />
              <label for="mobilePhone">Nr telefonu (komórkowy)</label>
              <input type="telephone" class="form-control" id="mobilePhone" value={this.state.mobilePhone} onChange={this.handleChangeMobilePhone} />
              <label for="voip">Nr telefonu (VoIP)</label>
              <input type="telephone" class="form-control" id="voip" value={this.state.voip} onChange={this.handleChangeVoip} />
            </div>
          </form>
        <a href={Config.pageAddress+"/users/add"} class="btn btn-success" onClick={this.handleSubmit}>Zapisz</a>
      </div>
    )
  }
}
export default UserAdd