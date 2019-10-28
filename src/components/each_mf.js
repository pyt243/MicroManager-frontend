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
            <p className="micro-desc"><b>Documentation: </b>{micro.documentation}</p>
            <p className="micro-desc"><b>MF-image: </b>{micro.mf_image}</p>

            </div>
            <div className="micro-but">
                <Link to={{pathname:"/eachmf",state:{user:this.state.user,micro_id:micro._id}}}>
                  <button className="m-up" id={"emub"}>View Details</button>
                </Link>
            </div>
        </div>
    )
  }
}

export default Each_MF
