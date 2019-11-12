import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import './each-micro.css'
import IndividualRequests from './individual_requests.js'
import axios from 'axios'

class Each_MS_Detail extends Component{
  state={
    user:{username:"noone"} || this.props.location.user,
    micro:{title:"MS"},
    loadStatus:false,
    dataReceived:false
  }

  componentWillMount(){
    this.setState({user:this.props.location.state.user})
    console.log(this.props.location)
    axios.post("https://microservice-server.herokuapp.com/retrieve_one",{micro_id:this.props.location.state.micro_id}).then(res => {
      console.log(res.data.micro)
      this.setState({micro:res.data.micro,loadStatus:true,dataReceived:true})
    })
  }
  render(){
    var micro = this.state.micro
    var keywords = micro.keywords
    var tech_stack = micro.tech_stack
    this.microDelete = this.microDelete.bind(this)

    if(this.state.loadStatus==true){

    keywords = keywords.map(function(key,index){
      return(<div className="em-mkey"><p>{key}</p></div>)
    });
    tech_stack = tech_stack.map(function(tech,index){
      return(<div className="em-mtech"><p>{tech}</p></div>)
    })
    var up = (<Link to={{pathname:"/updatemicroservice",state:{user:this.state.user,micro_id:this.state.micro._id}}}>
      <button className="m-up btn btn-warning" id={"emub"}>Update</button>
    </Link>)
    var del =  (<button className="m-del btn btn-danger" id={"emdb"} onClick={this.microDelete}>Delete</button>)

    if(this.state.micro.developer != this.state.user._id){
      up=null;
      del=null;
    }

  }
    return(
            <div className="wrap">
            <Navbar user={this.state.user} />
            <h3 className='title'>{micro.title}</h3>
            <div className="em-content em-det-ms">
            <div className="em-micro_keys">
              {keywords}
            </div>
            <p className='em-micro-desc'> {micro.desc}</p>
            <div className="em-tech_stack">
                <h3 className="ts-title">Tech Stack</h3>
                {tech_stack}
            </div>
            <p className="micro-doc"><b>Documentation: </b>{micro.documentation}</p>
            <div className="micro-but">
                {up}
                {del}
                <Link to={{pathname:"/ind_requestms",state:{user:this.state.user,micro_id:this.state.micro._id,micro_name:this.state.micro.title}}}>
                  <button className="m-up btn btn-primary" id={"mf_ir"}>Individual Request</button>
                </Link>
              </div>
            </div>
            {this.state.dataReceived ? <IndividualRequests user={this.state.user} micro_id={this.state.micro._id} type="ms"/>: ""}
            </div>
    )
  }
  microDelete(e){
    // var index = e.target.id[4]
    // var micros = this.state.micros
    // // alert(micros[e.target.id[4]]._id)
    // axios.post("https://microservice-server.herokuapp.com/delete_one/"+micros[e.target.id[4]]._id,{}).then(res => {
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
