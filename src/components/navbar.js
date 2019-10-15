import React , {Component} from 'react'
import {Link} from 'react-router-dom';
import './navbar.css'

class Navbar extends Component{
  state={
    user:this.props.user
  }
  componentWillMount(){
    this.setState({user:this.props.user});
    console.log(this.state.user)
  }
  render(){
    this.logOut = this.logOut.bind(this)
    var litems=[];
    var ritems=['Signup'];
    if(this.props.user.username !== 'noone'){
      litems=['UserStories','Microservices','Requests'];
      ritems=['logout'];
    }
    ritems = ritems.map(function(item,index){
      return(<Link to={{pathname:"/"+item.toLowerCase(),state:{user:this.props.user}}}><li className="nav-item nav-link">{item}</li></Link>)
    }.bind(this))
    if(this.props.user.username !== 'noone'){
      ritems[0]=<Link to={{pathname:"/",state: { user:{username:"noone"}}}}><li className={"nav-item nav-link"} onClick={this.logOut}>Logout</li></Link>
    }
    litems = litems.map(function(item,index){
      return(<Link to={{pathname:"/"+item.toLowerCase(),state:{user:this.props.user}}}><li className="nav-item nav-link">{item}</li></Link>)
    }.bind(this))
    // litems[0]=<Link to={{pathaname:"/",state:{user:this.state.user}}}><li className="nav-item nav-link">MicroManager</li></Link>
    return(
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <Link to={{pathname:'/',state:{user:this.state.user}}}><li class="navbar-brand">MicroManager</li></Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          {litems}
        </ul>
        <ul class="navbar-nav ml-auto">
          {ritems}
        </ul>
      </div>
      </nav>
    )
  }
  logOut(e){
    this.setState({user:{username:"noone"}});
    if(this.props.page == 'Home'){
    this.props.stateLogout()
  }
    // this.props.user = {username:"noone"};
  }
}

export default Navbar
