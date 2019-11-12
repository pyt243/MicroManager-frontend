import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import axios from 'axios'
import './addmicro.css'


class RequestMS extends Component{
  state={
    user:{username:"noone"}
  }
  componentWillMount(){
    this.setState(this.props.location.state)
    console.log(this.props)
  }
  render(){
    this.requestMicro = this.requestMicro.bind(this)
    return (
      <div className="wrap">
      <Navbar user={this.state.user} />
      {/* <h1 className="add-title">Request MS : {this.state.user.name}</h1> */}
      <h1 className="add-title">MS name : {this.state.micro_name}</h1>
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
    var ms_id = this.state.micro_id
    alert(user +" "+ title +" "+ desc +" "+ ms_id)
    axios.post("https://microservice-server.herokuapp.com/add_individual_request/",{ title:title ,desc:desc, owner:user , ms_id:ms_id}).then(res => {
      if(res.data.status == true){
        alert("Microreq sent successfully")
      }
    })
  }
}
 export default RequestMS
