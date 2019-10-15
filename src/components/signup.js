import React , {Component} from 'react'
import Navbar from './navbar.js'
import './home.css'

class SignUP extends Component{
  state={
    user:{username:"noone"}
  }
  render(){
    return(
      <div className="wrap">
      <Navbar user={this.state.user}/>
      <h1>SignUP Page</h1>
      </div>
    )
  }
}
export default SignUP
