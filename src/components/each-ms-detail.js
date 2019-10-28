import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import './view_ms.css'
import axios from 'axios'

class Each_MS_Detail extends Component{
  state={
    user:{username:"noone"} || this.props.location.user,
    micro:{title:"MS"},
    loadStatus:false
  }

  componentWillMount(){
    this.setState({user:this.props.location.state.user})
    console.log(this.props.location)
    axios.post("http://localhost:5000/retrieve_one",{micro_id:this.props.location.state.micro_id}).then(res => {
      console.log(res.data.micro)
      this.setState({micro:res.data.micro,loadStatus:true})
    })
  }
  render(){
    var micro = this.state.micro
    var keywords = micro.keywords
    var tech_stack = micro.tech_stack
    this.microDelete = this.microDelete.bind(this)

    if(this.state.loadStatus==true){

    keywords = keywords.map(function(key,index){
      return(<div className="mkey"><p>{key}</p></div>)
    });
    tech_stack = tech_stack.map(function(tech,index){
      return(<div className="mtech"><p>{tech}</p></div>)
    })
  }
    return(
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
            <div className="micro-but">
                <Link to={{pathname:"/updatemicroservice",state:{user:this.state.user,micro_id:this.state.micro._id}}}>
                  <button className="m-up" id={"emub"}>Update</button>
                </Link>
                <button className="m-del" id={"emdb"} onClick={this.microDelete}>Delete</button>
              </div>
            </div>
    )
  }
  microDelete(e){
    // var index = e.target.id[4]
    // var micros = this.state.micros
    // // alert(micros[e.target.id[4]]._id)
    // axios.post("http://localhost:5000/delete_one/"+micros[e.target.id[4]]._id,{}).then(res => {
    //   if(res.data.status == true){
    //   alert("Deleted sucessfully")
    //   var micros = this.state.micros
    //   micros.splice(index,1)
    //   this.setState({micros:micros})
    // }else {
    //   alert(res.data.error.message)
    // }
    // })
    // // var micro = document.querySelector("#each-microid"+index)
    // // micro.style.diplay = "none"
  }
}

export default Each_MS_Detail
