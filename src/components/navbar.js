import React , {Component} from 'react'
import './navbar.css'

class Navbar extends Component{
  state={
    user:{name:"noone"}
  }
  componentWillMount(){

  }
  render(){
    return(
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <a class="navbar-brand" href="/">MicroManager</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/userstory">User Stories</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/micr">Microservices</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Requests</a>
          </li>

        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="/signup">Signup</a>
          </li>
        </ul>
      </div>
      </nav>
    )
  }
}

export default Navbar
