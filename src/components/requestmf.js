import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import axios from 'axios'
import './addmicro.css'


class RequestMF extends Component{
  state={
    user:{username:"noone"}
  }
  componentWillMount(){
    this.setState({user:this.props.location.state.user})
  }
  render(){
    this.requestMicro = this.requestMicro.bind(this)
    return (
      <div className="wrap">
      <Navbar user={this.state.user} />
      <h1 className="add-title">Request MS : {this.state.user.name}</h1>
      <div className="content">
        <form onSubmit={this.requestMicro}>
          <div className="ad-n">
          <input type="text" name="title" placeholder="Request Title" ref="title" required/>
          </div>
          <div className="ad-d">
          <textarea name="desc" placeholder="Request description" ref="desc" required></textarea>
          </div>
          <input type="submit" />
        </form>
      </div>
      </div>
    )
  }
  requestMicro(e){
    e.preventDefault()
    var user = this.state.user._id
    var title = this.refs.title.value
    var desc = this.refs.desc.value
    var ms_mf = "microfrontend"
    alert(user + title + desc + ms_mf)
  }
}
 export default RequestMF
