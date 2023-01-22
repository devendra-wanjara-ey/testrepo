import React, { Component } from 'react';
import { Button, TextInputField, Alert } from 'evergreen-ui';
import '../App.css';
import Minter from '../Minter';
import App1 from '../App1';
import Tabs from './Tabs';
import Search from './Search';


export class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      loginSuccessfull: false,
      message: '',
    }
  }

  nextPage = () => {
    return(
        <div>
        <h1>NFT Team 2</h1>
        <br></br>
        <Tabs>
        <div label="Main">
             <App1/>
          </div>
          <div label="Search NFT">
             <Search/>
          </div>
          <div label="Mint NFT">
            <Minter/>
          </div>
        </Tabs>
      </div>
    );
  }

  handleChange = (event) => {
    let field = event.target.name;
    this.setState({[field]: event.target.value});    
  }

  onSubmit = (e) => {
    e.preventDefault();

    if ((this.state.name == 'omar' || this.state.name == 'devendra') && this.state.password == 'test123') {
      this.setState({loginSuccessfull: true});
      this.setState({message: <Alert type="success" title="Successfully logged in"/>});
    } else {
      this.setState({message: <Alert type="danger" title="Invalid Login details"/>})
    }

  }
  loginForm = () => {
    return(
      <div className='login-size'>
         <h2>Welcome To Team2 Demo</h2>
          <form className='title' onSubmit={this.onSubmit}>
            <TextInputField
              label="Name"
              placeholder="Name"
              name="name"
              onChange={this.handleChange}
            />
            <TextInputField
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <Button appearance="green"> Login </Button>
          </form>
        </div>
    );
  }

    render() {
      let content = (this.state.loginSuccessfull) ? this.nextPage() : this.loginForm();
      return(
        <div>
          {this.state.message}
          {content}
        </div>
      );
    }
}

export default Login;