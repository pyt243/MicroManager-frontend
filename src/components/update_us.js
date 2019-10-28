import React , {Component} from 'react'
import Navbar from './navbar.js'
import axios from 'axios'
import Search from './search.js'
import './addmicro.css'

class UpdateUS extends Component {
  state={
    user:{username:"noone"},
    user_story:{title:"US"},
    loadStatus:false
  }

  componentWillMount(){
    this.setState(this.props.location.state)
    axios.post("http://localhost:5001/retrieve_one",{us_id:this.props.location.state.user_story_id}).then(res => {
      console.log(res.data.user_story)
      this.setState({user_story:res.data.user_story,loadStatus:true})
    })
  }
  render(){
    this.updateUserstory = this.updateUserstory.bind(this)
    return(
      <div className="wrap">
        <Navbar user={this.state.user} />
        <h1 className="add-title">Update User story</h1>
        <div className="content">
          <form onSubmit={this.updateUserstory}>
            <div className="ad-n">
              <input
                type="text"
                name="user_story_title"
                placeholder={this.state.user_story.title}
                ref="title"
              />
            </div>
            <div className="ad-n">
              <input
                type="text"
                name="user_story_priority"
                placeholder={this.state.user_story.priority}
                ref="priority"
              />
            </div>
            <div className="ad-n">
              <input type="text" name="user_story_status" placeholder={this.state.user_story.status} ref="status"/>
            </div>
            <div class="ad-d">
            <textarea name="desc" placeholder={this.state.user_story.desc} ref="desc"></textarea>
            </div>
            <input type="submit" />
          </form>
          <div class="form-group">
          <button class="btn btn-outline-success link-ms">Link MS </button>
          <button class="btn btn-outline-success link-mf">Link MF </button>

          </div>
        </div>
        <Search owner={this.state.user._id}/>
      </div>
    )
  }
  updateUserstory(e){
    e.preventDefault()
    var desc = this.refs.desc.value || this.state.user_story.desc
    var owner = this.state.user._id
    var title = this.refs.title.value || this.state.user_story.title
    var priority = this.refs.priority.value || this.state.user_story.priority
    var status = this.refs.status.value || this.state.user_story.status
  //   // alert(title + keywords + desc + tech_stack + code_snippet + documentation)
  //   axios.post("http://localhost:5000/update_micro/"+this.state.micro._id,{ title:title , desc:desc , keywords:keywords, documentation:documentation, code_snippet:code_snippet, tech_stack:tech_stack, owner:owner}).then(res => {
  //     if(res.data.status == true){
  //       alert("Microservice updated successfully")
  //     }
  //   })
  axios.post("http://localhost:5001/modifyuserstory",{us_id:this.state.user_story._id,title:title,desc:desc,owner:owner,priority:priority,status:status}).then(res => {
    if(res.data.status == true){
      alert("User story updated successfully")
    }
  })
  }
}
 export default UpdateUS
