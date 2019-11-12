import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import axios from 'axios'
import './addmicro.css'


class GlobalRequestMF extends Component{
  state={
    user:this.props.location.state.user,
    loadStatus:false
  }
  componentWillMount(){
    this.setState(this.props.location.state)
    // axios.post('https://microservice-server.herokuapp.com/micr',{}).then(res=>{
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
      <h1 className="add-title">Place a request for Micro-frontend</h1>

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
    var status = "not handled"
    // alert(user +" "+ title +" "+ desc)
    axios.post("https://global-request-server.herokuapp.com/add_global_request/",{status:status, title:title ,desc:desc, user:user , ms_mf:ms_mf}).then(res => {
      if(res.data.status == true){
        alert("Microreq sent successfully")
      }
    })
  }
}
 export default GlobalRequestMF
