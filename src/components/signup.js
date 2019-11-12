import React , {Component} from 'react'
import Navbar from './navbar.js'
import axios from 'axios'
import './signup.css'

class SignUP extends Component{
  state={
    user:{username:"noone"}
  }
  render(){
    this.signup = this.signup.bind(this)
    return(
      <div className="wrap">
      <Navbar user={this.state.user}/>
      <h1 class="title">Register</h1>
      <div class="reg-form col-lg-5 col-md-7 col-sm-11">
        <form onSubmit={this.signup}>
          <div class="form-group">
            <input type="text" placeholder="Username" class="form-control" name="username" required ref="username"/>
          </div>
          <div class="form-group">
            <input type="text" placeholder="Name" class="form-control" name="name" required ref="name"/>
          </div>
          <div class="form-group">
            <input type="email" placeholder="Email (Please enter an active email)" class="form-control" name="email" required ref="email"/>
          </div>
          <div class="form-group">
            <input type="password" placeholder="Enter Password" class="form-control" name="pass1" required ref="password"/>
          </div>
          <div class="form-group">
            <input type="password" placeholder="Re-enter Password" class="form-control" name="pass2" required ref="repassword"/>
          </div>
          <div class="form-group">
          <input type="submit" class="btn btn-success" />
          </div>
        </form>
      </div>
      </div>
    )
  }
  signup(e){
    e.preventDefault()
    if(this.refs.password.value != this.refs.repassword.value){
      alert("The two Passwords do not match")
    }else {
      var username = this.refs.username.value
      var password = this.refs.password.value
      var name = this.refs.name.value
      var email = this.refs.email.value
      alert(username + password + name + email)
      axios.post("https://microservice-server.herokuapp.com/signup",{username:username,password:password,email:email,name:name}).then(res =>{
        // alert(res.data.status)
        if(res.data.status == true){
          alert("User sucessfully registered")
        }else {
          alert(res.data.error.message)
        }
      })
    }

  }
}
export default SignUP
