import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import axios from 'axios'
import './addmicro.css'


class RequestMF extends Component{
  state={
    user:this.props.location.state.user,
    loadStatus:false
  }
  componentWillMount(){
    this.setState(this.props.location.state)
    // axios.post('http://localhost:5000/micr',{}).then(res=>{
    //   this.setState({micros:res.data.micros,loadStatus:true});
    //   console.log(res.data.micros)
    // })
  }
  render(){
    this.requestMicro = this.requestMicro.bind(this)
    return (
      <div className="wrap">
       <Navbar user={this.state.user} /> 
      {/*<h1 className="add-title">Request MS : {this.state.user.name}</h1>*/}
      <h1 className="add-title">MF name : {this.state.micro_name}</h1>

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
    var mf_id = this.state.micro_id
    alert(user +" "+ title +" "+ desc +" "+ mf_id)
    axios.post("http://localhost:5002/add_individual_request/",{ title:title ,desc:desc, owner:user , mf_id:mf_id}).then(res => {
      if(res.data.status == true){
        alert("Microreq sent successfully")
      }
    })
  }
}
 export default RequestMF
