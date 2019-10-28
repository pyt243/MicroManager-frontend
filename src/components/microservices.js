import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import Each_MS from './each-ms.js'
import './view_ms.css'
import axios from 'axios'


class Microservices extends Component{
  state={
    user:this.props.location.state.user,
    loadStatus:false
  }
  componentWillMount(){
    this.setState(this.props.location.state)
    axios.post('http://localhost:5000/micr',{}).then(res=>{
      this.setState({micros:res.data.micros,loadStatus:true});
      console.log(res.data.micros)
    })
  }
  render(){
    this.microUpdate = this.microUpdate.bind(this)
    var micros = this.state.micros
    if(this.state.loadStatus==true){
    micros = micros.map(function(micro,index){
      return(
          <Each_MS user={this.state.user} micro_id={micro._id} />
      )
    }.bind(this));
  }
    return(
      <div className="wrap">
      <Navbar user={this.state.user} />

          <h1 className="title">List of Microservices</h1>
          <div className="content">
            {micros}
          </div>
          <div className="add-m">
          <Link to={{pathname:"/addmicroservice",state:{user:this.state.user}}}>
              <button className="add-b">Add a MicroService</button>
          </Link>
          </div>
      </div>
    )
  }
  microUpdate(e){
    var index = e.target.id[4]
    alert(this.state.micros[index]._id)
  }
}
export default Microservices
