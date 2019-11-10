import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import './requests.css'
import axios from 'axios'

class IndividualRequests extends Component {
  state={
    user:{username:"noone"},
    requests:[]
  }
  componentWillMount(){
    this.setState({user:this.props.user})
    console.log(this.props.mf_id)
    if(this.props.type=="mf"){
        axios.post("http://localhost:5002/retrieve_individual_requests", {mf_id:this.props.micro_id}).then(res => {
        //if(res.data.status == true){
            this.setState({requests:res.data});
            console.log(JSON.stringify(res.data))
        //}
        })
    }
    else{
        axios.post("http://localhost:5000/retrieve_individual_requests", {ms_id:this.props.micro_id}).then(res => {
        //if(res.data.status == true){
            this.setState({requests:res.data});
            console.log(JSON.stringify(res.data))
        //}
        })
    }
  }
  render(){
    var requests = this.state.requests
    requests = requests.map(function(req,index){
      return (
        <div className="each-req">
          <h2 className="er-title">{req.title}</h2>
          <h3 className="er-msmf">{req.ms_mf}</h3>
          <p className="er-desc">{req.desc}</p>
          {/* <button className="btn btn-success er-but">Handle Request </button> */}
        </div>
      )
    })
    return(

      <div className="content">
      <h1 className="req-title">Individual Requests</h1>
      
      {requests}
      </div>
    )
  }
}

export default IndividualRequests
