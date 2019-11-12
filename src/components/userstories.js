import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import './home.css'
import axios from 'axios'
import './view_ms.css'

class UserStories extends Component{
  state={
    user:this.props.location.state.user,
    user_stories:[],
    micro_name:""
  }
  componentWillMount(){
    this.setState(this.props.location.state)
    axios.post('https://user-story-server.herokuapp.com/getuserstory',{owner:this.state.user._id}).then(res=>{
        console.log(JSON.stringify(res.data.user_stories))
        console.log(res.data)
        this.setState({user_stories:res.data.user_stories});
    })
    // axios.post('https://user-story-server.herokuapp.com/ms_mf_links',{us_id:this.state.us_id}).then(res=>{
    //     console.log(JSON.stringify(res.data.user_stories))
    //     this.setState({user_stories:res.data.user_stories});
    // })
  }
  render(){
    var user_stories = this.state.user_stories
    this.us_delete = this.us_delete.bind(this)
    user_stories = user_stories.map(function(user_story,index){
      return(<div class="each-us">
        <p class="micro-name">{user_story.title}</p>
        <p class="us-desc">
          {user_story.desc}
        </p>
        <div class="micro-but">
        <Link to={{pathname:"/updateuserstory",state:{user:this.state.user,user_story_id:user_story._id}}}>
          <button className="m-up btn btn-warning" id={"euub"+index}>Update</button>
        </Link>
        <button className="m-del btn btn-danger" id={"eudb"+index} onClick={this.us_delete}>Delete</button>
        </div>
        <div class="micro-but">
        <p className="msmf-link-title">Microservice links</p>
        <div className="msmf-linkdiv">
        {user_story.link_to_ms.map((link, index) => {return (
           <Link to={{pathname:"/eachms",state:{user:this.state.user,micro_id:link}}}>
           <button className="m-up btn btn-primary" id={"emub"}>{"Link "+(index+1)}</button>
         </Link>

        )
        })}
        </div>
        </div>
        <div class="micro-but">

        <p className="msmf-link-title">Microfrontend links</p>
        <div className="msmf-linkdiv">

        {user_story.link_to_mf.map((link,index) => {return (
           <Link to={{pathname:"/eachmf",state:{user:this.state.user,micro_id:link}}}>
           <button className="m-up btn btn-primary" id={"emub"}>{"Link "+(index+1)}</button>
         </Link>
        )
        })}
        </div>
        {/* <h1>{JSON.stringify(user_story.link_to_ms+"\n"+user_story.link_to_mf)}</h1> */}
        </div>
      </div>);
    }.bind(this))
    return(
      <div class="wrap">
      <Navbar user={this.state.user} />
        <h1 class="title">User Stories</h1>
        <div class="add-m">
        <Link to={{pathname:"/adduserstory",state:{user:this.state.user}}}>
          <button class="us-add-but">
            Add a User Story
          </button>
        </Link>
        </div>
        <div class="us-content">
          {user_stories}
        </div>
      </div>
    )
  }
  us_delete(e){
    var index = e.target.id[4]
    var _id = this.state.user_stories[index]._id
    // alert(_id)
    // alert(index)
    var us = this.state.user_stories
    us.splice(index,1)
    this.setState({user_stories:us})
    axios.post("https://user-story-server.herokuapp.com/removeuserstory",{us_id:_id}).then(res =>{
      if(res.data.status == true){
        alert("User story deleted successfully")
      }
    })
  }
}
export default UserStories
