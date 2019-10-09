import React , {Component} from 'react'
import Navbar from './navbar.js'
import './home.css'

class Home extends Component {
  state={
    user:{name:"noone"}
  }
  componentWillMount(){

  }
  render(){
    return(
      <div className="wrap">
        <Navbar user={this.state.user}/>
        <div className="landing">
        <h1 className="title">MicroManager</h1>
        <div className="land-desc col-lg-6 col-md-7">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </div>
        <div className="login-div col-lg-4 col-md-6">
          <h2 className="login-h">Login:</h2>
            <div className="form-group">
              <input type="text" placeholder="Username" className="form-control" name="username" required />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" className="form-control" name="password" required />
            </div>
            <input type="submit" />
      
        </div>
      </div>
      </div>
    );
  }
}

export default Home
