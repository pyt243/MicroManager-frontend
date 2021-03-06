import React , {Component} from 'react'
import Navbar from './navbar.js'
import axios from 'axios'
import './addmicro.css'

class UpdateMS extends Component {
  state={
    user:{username:"noone"},
    micro:{title:"MS"},
    loadStatus:false
  }

  componentWillMount(){
    this.setState(this.props.location.state)
    axios.post("https://microservice-server.herokuapp.com/retrieve_one",{micro_id:this.props.location.state.micro_id}).then(res => {
      console.log(res.data.micro)
      this.setState({micro:res.data.micro,loadStatus:true})
    })
  }
  render(){
    this.updateMicro = this.updateMicro.bind(this)
    var keywords = ""+","
    var tech_stack = ""
    if(this.state.loadStatus == true){
    keywords = this.state.micro.keywords.join()
    tech_stack = this.state.micro.tech_stack.join()
  }
    return(
      <div className="wrap">
        <Navbar user={this.state.user} />
        <h1 className="add-title">Update Microservice</h1>
        <div className="content">
          <form onSubmit={this.updateMicro}>
            <div className="ad-n">
            <input type="text" name="title" placeholder={this.state.micro.title} ref="title"/>
            </div>
            <div className="ad-n">
            <input type="text" name="keywords" placeholder={keywords} ref="keywords"/>
            </div>
            <div className="ad-n">
            <input type="text" name="documentation" placeholder={this.state.micro.documentation} ref="documentation"/>
            </div>
            <div className="ad-n">
            <input type="text" name="tech_stack" placeholder={tech_stack} ref="tech_stack"/>
            </div>
            <div className="ad-d">
            <textarea name="code_snippet" placeholder={this.state.micro.code_snippet} ref="code_snippet"></textarea>
            </div>
            <div className="ad-d">
            <textarea name="desc" placeholder={this.state.micro.desc} ref="desc"></textarea>
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
  updateMicro(e){
    e.preventDefault()
    var desc = this.refs.desc.value || this.state.micro.desc
    var owner = this.state.user._id
    var title = this.refs.title.value || this.state.micro.title
    var keywords = this.refs.keywords.value || this.state.micro.keywords.join()
    var tech_stack = this.refs.tech_stack.value || this.state.micro.tech_stack.join()
    var code_snippet = this.refs.code_snippet.value || this.state.micro.code_snippet
    var documentation = this.refs.documentation.value || this.state.micro.documentation
    // alert(title + keywords + desc + tech_stack + code_snippet + documentation)
    axios.post("https://microservice-server.herokuapp.com/update_micro/"+this.state.micro._id,{ title:title , desc:desc , keywords:keywords, documentation:documentation, code_snippet:code_snippet, tech_stack:tech_stack, owner:owner}).then(res => {
      if(res.data.status == true){
        alert("Microservice updated successfully")
      }
    })
  }
}
 export default UpdateMS
