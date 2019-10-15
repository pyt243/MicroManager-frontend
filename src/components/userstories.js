import React , {Component} from 'react'
import Navbar from './navbar.js'
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
    axios.get('/userstory').then(res=>{
        console.log(res.data.user_stories)
        this.setState({user_stories:res.data.user_stories});
    })
  }
  render(){
    var user_stories = this.state.user_stories
    user_stories = user_stories.map(function(user_story,index){
      return(<div class="each-us">
        <p class="micro-name">{user_story.desc}</p>
        <p class="micro-desc">
          priority: {user_story.priority }, Status: {user_story.status}
        </p>
        <div class="micro-but"></div>
      </div>);
    })
    return(
      <div class="wrap">
      <Navbar user={this.state.user} />
        <h1 class="title">User Story</h1>
        <div class="content">
          <h2 class="subtitle">List of User Stories</h2>
          {user_stories}
        </div>
        <div class="add-m">
          <button class="add-b">
            <a>Add a User Story</a>
          </button>
        </div>
      </div>
    )
  }
}
export default UserStories
