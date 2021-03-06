import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import Each_MS from './each-ms.js'
import './view_ms.css'
import axios from 'axios'


class Microservices extends Component{
  state={
    user:this.props.location.state.user,
    loadStatus:false,
    butStatus:false,
    butText:"View My Services"
  }
  componentWillMount(){
    this.setState(this.props.location.state)
    axios.post('https://microservice-server.herokuapp.com/micr',{}).then(res=>{
      this.setState({micros:res.data.micros,loadStatus:true});
      console.log(res.data.micros)
    })
  }
  render(){
    this.microUpdate = this.microUpdate.bind(this)
    this.filter = this.filter.bind(this)
    var micros = this.state.micros
    if(this.state.loadStatus==true){
    micros = micros.map(function(micro,index){
      if(this.state.butStatus && micro.developer != this.state.user._id){
        return null
      }
      return(
          <Each_MS user={this.state.user} micro_id={micro._id} link={false}/>
      )
    }.bind(this));
  }
    return(
      <div className="wrap">
      <Navbar user={this.state.user} />

          <h1 className="title">List of Microservices</h1>
          <div className="add-m">
          <Link to={{pathname:"/addmicroservice",state:{user:this.state.user}}}>
              <button className="add-b adm btn btn-light">Add a MicroService</button>
          </Link>
          <button className="btn btn-primary filt-but" onClick={this.filter}>{this.state.butText}</button>
          
          <Link to={{pathname:"/requestms",state:{user:this.state.user}}}>
              <button className="add-b reqm btn btn-light">Request a MicroService</button>
          </Link>
          </div>

          <div className="content">
            {micros}
          </div>
      </div>
    )
  }
  microUpdate(e){
    var index = e.target.id[4]
    alert(this.state.micros[index]._id)
  }
  filter(e){
    if(this.state.butStatus == false){
      this.setState({butStatus:true,butText:"View All Services"})
    }else {
      this.setState({butStatus:false,butText:"View My Services"})
    }
  }
}
export default Microservices
