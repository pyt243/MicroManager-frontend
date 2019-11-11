import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import './requests.css'
import axios from 'axios'

class GlobalRequests extends Component {
  state={
    user:{username:"noone"},
    requests:[]
  }
  componentWillMount(){
    this.setState({user:this.props.location.state.user})
    axios.get("http://localhost:5003/global_requests").then(res => {
      if(res.data.status == true){
        this.setState({requests:res.data.requests});
        console.log(this.state.requests)
      }
    })
  }
  render(){
    var requests = this.state.requests
    requests = requests.map(function(req,index){
      var but;
      if(req.status == "handled"){
        if(req.ms_mf == "microservice"){
          but = (  <Link to={{pathname:"/eachms",state:{user:this.state.user,micro_id:req.link_msmf}}}><button className="btn btn-primary er-but">View Microservice</button></Link>)
        }else{
          but = (  <Link to={{pathname:"/eachmf",state:{user:this.state.user,micro_id:req.link_msmf}}}><button className="btn btn-primary er-but">View Micro-frontend</button></Link>)
        }
      }else {
        if(req.ms_mf == "microservice"){
          but = (  <Link to={{pathname:"/handle_greq_ms",state:{user:this.state.user,req_id:req._id}}}><button className="btn btn-success er-but">Handle MS Request </button></Link>)
        }else{
          but = (  <Link to={{pathname:"/handle_greq_mf",state:{user:this.state.user,req_id:req._id}}}><button className="btn btn-success er-but">Handle MF Request </button></Link>)
        }
      }
      return (
        <div className="each-req">
          <h2 className="er-title">{req.title}</h2>
          <h3 className="er-msmf">{req.ms_mf}</h3>
          <p className="er-desc">{req.desc}</p>
          <p className = {"er-status " + req.status}>{req.status}</p>
          {but}
        </div>
      )
    }.bind(this))
    return(
      <div className="wrap">
      <Navbar user={this.state.user} />
      <h1 className="req-title">Global Requests</h1>
      <div className="content">
      {requests}
      </div>
      </div>
    )
  }
}

export default GlobalRequests
