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
      return (
        <div className="each-req">
          <h2 className="er-title">{req.title}</h2>
          <h3 className="er-msmf">{req.ms_mf}</h3>
          <p className="er-desc">{req.desc}</p>
          <button className="btn btn-success er-but">Handle Request </button>
        </div>
      )
    })
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
