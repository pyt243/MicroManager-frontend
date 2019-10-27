import React , {Component} from 'react'
import Navbar from './navbar.js'
import axios from 'axios'
import './addmicro.css'


class AddUserStory extends Component{
  state={
    user:this.props.location.state.user
  }

  componentWillMount(){
    this.setState(this.props.location.state)
  }
  render(){
    this.adduserstory = this.adduserstory.bind(this)
    return(
      <div className="wrap">
        <Navbar user={this.state.user} />
        <h1 className="add-title">Add a User Story</h1>
        <div className="content">
          <form onSubmit={this.adduserstory}>
            <div className="ad-n">
              <input
                type="text"
                name="user_story_title"
                placeholder="User Story"
                required
                ref="title"
              />
            </div>
            <div className="ad-n">
              <input
                type="text"
                name="user_story_priority"
                placeholder="Priority"
                ref="priority"
                required
              />
            </div>
            <div className="ad-n">
              <input type="text" name="user_story_status" placeholder="Status" ref="status"/>
            </div>
            <div class="ad-d">
            <textarea name="desc" placeholder="Userstory Description" ref="desc" required></textarea>
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
  adduserstory(e){
    e.preventDefault()
    var title = this.refs.title.value
    var priority = this.refs.priority.value
    var status = this.refs.status.value
    var desc = this.refs.desc.value
    var owner = this.state.user._id
    // alert(title + priority +status + desc + owner)
    axios.post("http://localhost:5001/adduserstory",{ desc: desc, priority: priority, status: status, owner:owner, title:title }).then(res =>{
      if(res.data.status == false){
        alert(res.data.error.message)
      }else {
        alert("User story created sucessfully")
      }
    })
  }
}

export default AddUserStory
