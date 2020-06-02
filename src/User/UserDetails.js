import React, { Component } from 'react';
export class UserDetails extends Component {
//na pozniej zrobic tak aby przycisk edytuj odblokowywał formularze
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      id:'',
      firstName:'',
      lastName:'',
      email:'',
      formDisabled: true
    };
    this.handleChangeFirstName=this.handleChangeFirstName.bind(this);
    this.handleChangeLastName=this.handleChangeLastName.bind(this);
    this.handleChangeEmail=this.handleChangeEmail.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleClickEdit=this.handleClickEdit.bind(this);
  }

  handleClickEdit(event){
    console.log(this.state.formDisabled)
 this.state.formDisabled=false;
 console.log(this.state.formDisabled)
 console.log("Enabled");
  }
  handleChangeFirstName(event) {
    this.setState({firstName: event.target.value});
   }
   handleChangeLastName(event) {
    this.setState({lastName: event.target.value});
   }
   handleChangeEmail(event) {
    this.setState({email: event.target.value});
   }
   async handleSubmit(event) {
    event.preventDefault();
    const item = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    }
    console.log("Body"+JSON.stringify(item));

    await fetch('http://localhost:8080/api/v1/users/'+this.state.id, {
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item), 
    }
    );
    alert("Zapisano");
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/users/" + this.props.match.params.id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            //user: result,
            id:result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email
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
    let { error, isLoaded, user } = this.state;
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
          <button class="btn btn-warning m-2" onClick={this.handleClickEdit}>Edycja</button>
          <form>
            <div class="form-group">
              <label for="imie">Imię</label>
              <input type="text" class="form-control" id="imie" value={this.state.firstName} onChange={this.handleChangeFirstName}  />
              <label for="nazwisko">Nazwisko</label>
              <input type="text" class="form-control" id="nazwisko" value={this.state.lastName} onChange={this.handleChangeLastName} /*disabled={this.state.formDisabled}*/></input>
              <label for="mail">Mail</label>
              <input type="text" class="form-control" id="email" value={this.state.email} onChange={this.handleChangeEmail} /*disabled={this.state.formDisabled}*/></input>
              <input type="submit" class="btn btn-success m-2" value="Zapisz" onClick={this.handleSubmit}/>
            </div>
          </form>
        </div>
      )
    }
  }
}

export default UserDetails