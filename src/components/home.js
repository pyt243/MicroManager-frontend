import React , {Component} from 'react'
import Navbar from './navbar.js'
import './home.css'
import axios from 'axios'

class Home extends Component {
  state={
    user:{username:"noone"}
  }
  componentWillMount(){
    this.setState(this.props.location.state)
  }
  render(){
    this.login = this.login.bind(this)
    var loginDiv = (<div className="login-div col-lg-4 col-md-6">
      <h2 className="login-h">Login:</h2>
      <form onSubmit={this.login}>
        <div className="form-group">
          <input type="text" placeholder="Username" className="form-control" name="username" required ref="username"/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" className="form-control" name="password" required ref="password"/>
        </div>
        <input type="submit" className="home-submit"/>
        </form>
    </div>);
    if(this.state.user.username != "noone")
      loginDiv = null
    var navbar =  (<Navbar user={this.state.user}/>)
    return(
      <div className="home-wrap">
        <Navbar user={this.state.user} stateLogout={this.stateLogout.bind(this)} page='Home'/>
        <div className="landing">
        <h1 className="home-title">MicroManager</h1>
        <div className="land-desc col-lg-6 col-md-7">
          Micro Manager is an application capable of handling and managing microservices, micro-frontends and user stories for a single organization. The app helps in improving communication between consumers and producers and make usage of modular architecture like microservices more efficient and effective.
        </div>
        {loginDiv}
      </div>
      </div>
    );
  }
  login(e){
     e.preventDefault()
     axios.post('https://microservice-server.herokuapp.com/login',{username:this.refs.username.value,password:this.refs.password.value}).then(res=>{
        // console.log(res.data.user);
        if(res.data.status==false){
          alert("Login failed......Please try again");
        }
        if(res.data.status==true){
          alert('Login Sucessful');
          var state=this.state
          state.user=res.data.user;
          this.setState({user:res.data.user});
          console.log(this.state.user);
          // var logindiv = document.querySelector(".login-div");
          // logindiv.style.display = 'none';
        }
     })
  }
  stateLogout(){
    this.setState({user:{username:'noone'}});
  }
}

export default Home
