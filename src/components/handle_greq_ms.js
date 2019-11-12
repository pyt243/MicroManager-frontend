import React , {Component} from 'react'
import Navbar from './navbar.js'
import axios from 'axios'
import './addmicro.css'

class HandleGReqMS extends Component{
  state = {
    user:this.props.location.state.user,
    req_id:this.props.location.state.req_id
  }
  componentWillMount(){
    this.setState({user:this.props.location.state.user,req_id:this.props.location.state.req_id})
    console.log(this.state.req_id)
  }
  render(){
    this.addMicro  = this.addMicro.bind(this)
    return(
      <div className="wrap">
      <Navbar user={this.state.user} />
      <h1 className="add-title">Handle Request - Add MS</h1>
      <div className="content">
        <form onSubmit={this.addMicro}>
          <div className="ad-n">
          <input type="text" name="title" placeholder="Microservice Name" ref="title" required/>
          </div>
          <div className="ad-n">
          <input type="text" name="keywords" placeholder="Keywords" ref="keywords" required/>
          </div>
          <div className="ad-n">
          <input type="text" name="documentation" placeholder="Documentation" ref="documentation"/>
          </div>
          <div className="ad-n">
          <input type="text" name="tech_stack" placeholder="Tech Stack(Comma seperated values)" ref="tech_stack"/>
          </div>
          <div className="ad-d">
          <textarea name="code_snippet" placeholder="Code Snippet" ref="code_snippet"></textarea>
          </div>
          <div className="ad-d">
          <textarea name="desc" placeholder="Microservices Description" ref="desc" required></textarea>
          </div>
          <input type="submit" />
        </form>
      </div>
      </div>
    )
  }
  addMicro(e){
    e.preventDefault()
    var desc = this.refs.desc.value
    var owner = this.state.user._id
    var title = this.refs.title.value
    var keywords = this.refs.keywords.value
    var tech_stack = this.refs.tech_stack.value
    var code_snippet = this.refs.code_snippet.value
    var documentation = this.refs.documentation.value
    var developer = this.state.user._id
    // alert(desc+ title+owner)
    axios.post("https://microservice-server.herokuapp.com/addmicro",{ developer:developer, title:title , desc:desc , keywords:keywords, documentation:documentation, code_snippet:code_snippet, tech_stack:tech_stack, owner:owner}).then(res=> {
      if(res.data.status == false){
        alert(res.data.error.message)
      }else {
        axios.post("https://global-request-server.herokuapp.com/handle_request",{req_id:this.state.req_id,link_msmf:res.data.micro._id,status:"handled"}).then(res =>{
          if(res.data.status == true){
            alert("Request handled Sucessfully")
          }
        })
      }
    })
  }
}

export default HandleGReqMS
