import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import './view_ms.css'
import axios from 'axios'

class Each_MF extends Component{
  state={
    user:{username:"noone"} || this.props.user,
    micro:{title:"MF"},
    loadStatus:false
  }
  linkHandler(e)
  {
    axios.post("http://localhost:5001/link_us",{micro_id:this.props.micro_id,us_id:this.props.us_id,micro_type:"mf"}).then(res => {
      console.log("MF linked sucess")
    })
  }
  componentWillMount(){
    this.setState({user:this.props.user})
    axios.post("http://localhost:5002/retrieve_one",{micro_id:this.props.micro_id}).then(res => {
      console.log(res.data.micro)
      this.setState({micro:res.data.micro,loadStatus:true})
    })
  }
  render(){
    var micro = this.state.micro
    var keywords = micro.keywords
    var tech_stack = micro.tech_stack
    this.linkHandler = this.linkHandler.bind(this);
    var linkButton = (<button className="m-del" id={"emub"} onClick={this.linkHandler}>Link</button>)
    if(this.props.link == false){
      linkButton = null
    }

    if(this.state.loadStatus==true){

    keywords = keywords.split(",")

    keywords = keywords.map(function(key,index){
      return(<div className="mkey"><p>{key}</p></div>)
    });
    tech_stack = tech_stack.map(function(tech,index){
      return(<div className="mtech"><p>{tech}</p></div>)
    })
  }
    return(
        <div className='each-micro' id={"each-microid"}>
            <div className="em-1">
            <h3 className='micro-name'>{micro.title}</h3>
            <div className="micro_keys">
              {keywords}
            </div>
            <p className='micro-desc'> {micro.desc}</p>
            <div className="tech_stack">
                <h3 className="ts-title">Tech Stack</h3>
                {tech_stack}
            </div>

            </div>
            <div className="micro-but">
                <Link to={{pathname:"/eachmf",state:{user:this.state.user,micro_id:micro._id}}}>
                  <button className="m-up btn btn-success" id={"emub"}>View Details</button>
                </Link>
                {linkButton}
            </div>
        </div>
    )
  }
}

export default Each_MF
