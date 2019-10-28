import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import './home.css'
import axios from 'axios'
import './view_ms.css'

class UserStories extends Component{
  state={
    user:this.props.location.state.user,
    user_stories:[]
  }
  componentWillMount(){
    this.setState(this.props.location.state)
    axios.post('http://localhost:5001/getuserstory',{owner:this.state.user._id}).then(res=>{
        console.log(JSON.stringify(res.data.user_stories))
        this.setState({user_stories:res.data.user_stories});
    })
  }
  render(){
    var user_stories = this.state.user_stories
    user_stories = user_stories.map(function(user_story,index){
      return(<div class="each-us">
        <p class="micro-name">{user_story.title}</p>
        <p class="micro-desc">
          {user_story.desc}
        </p>
        <div class="micro-but">
        <Link to={{pathname:"/updateuserstory",state:{user:this.state.user,user_story_id:user_story._id}}}>
          <button className="m-up" id={"euub"+index}>Update</button>
        </Link>
        </div>
      </div>);
    }.bind(this))
    return(
      <div class="wrap">
      <Navbar user={this.state.user} />
        <h1 class="title">User Story</h1>
        <div class="content">
          <h2 class="subtitle">List of User Stories</h2>
          {user_stories}
        </div>
        <div class="add-m">
        <Link to={{pathname:"/adduserstory",state:{user:this.state.user}}}>
          <button class="add-b">
            Add a User Story
          </button>
        </Link>
        </div>
      </div>
    )
  }
}
export default UserStories
