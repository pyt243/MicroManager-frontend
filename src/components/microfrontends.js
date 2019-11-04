import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import Each_MF from './each_mf.js'
import './view_ms.css'
import axios from 'axios'


class MicroFrontends extends Component{
  state={
    user:this.props.location.state.user,
    loadStatus:false
  }
  componentWillMount(){
    this.setState(this.props.location.state)
    axios.post('http://localhost:5002/micr-fr',{}).then(res=>{
      this.setState({micros:res.data.micros,loadStatus:true});
      console.log(res.data.micros)
    })
  }
  render(){
    this.microUpdate = this.microUpdate.bind(this)
    this.microDelete = this.microDelete.bind(this)
    var micros = this.state.micros
    if(this.state.loadStatus==true){
    micros = micros.map(function(micro,index){

      return(
          <Each_MF user={this.state.user} micro_id={micro._id} link={false}/>
      )
    }.bind(this));
  }
    return(
      <div className="wrap">
      <Navbar user={this.state.user} />

          <div className="content">
            <h2 className="subtitle">List of Micro-frontends</h2>
            {micros}
          </div>
          <div className="add-m">
          <Link to={{pathname:"/addmicrofrontend",state:{user:this.state.user}}}>
              <button className="add-b">Add a Micro-Frontend</button>
          </Link>
          <Link to={{pathname:"/requestmf",state:{user:this.state.user}}}>
              <button className="add-b">Request MicroFrontend</button>
          </Link>
          </div>
      </div>
    )
  }
  microDelete(e){
    var index = e.target.id[4]
    var micros = this.state.micros
    // alert(micros[e.target.id[4]]._id)
    axios.post("http://localhost:5002/delete_one/"+micros[e.target.id[4]]._id,{}).then(res => {
      if(res.data.status == true){
      alert("Deleted sucessfully")
      var micros = this.state.micros
      micros.splice(index,1)
      this.setState({micros:micros})
    }else {
      alert(res.data.error.message)
    }
    })
    // var micro = document.querySelector("#each-microid"+index)
    // micro.style.diplay = "none"
  }
  microUpdate(e){
    var index = e.target.id[4]
    alert(this.state.micros[index]._id)
  }
}
export default MicroFrontends
