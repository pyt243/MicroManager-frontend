import React , {Component} from 'react'
import Navbar from './navbar.js'
import './view_ms.css'
import axios from 'axios'


class Microservices extends Component{
  state={
    user:this.props.location.state.user,
    loadStatus:false
  }
  componentWillMount(){
    this.setState(this.props.location.state)
    axios.post('http://localhost:5000/micr',{}).then(res=>{
      this.setState({micros:res.data.micros,loadStatus:true});
      console.log(res.data.micros)
    })
  }
  render(){
    var micros = this.state.micros
    if(this.state.loadStatus==true){
    micros = micros.map(function(micro,index){
      var keywords = micro.keywords
      keywords = keywords.map(function(key,index){
        return(<div className="mkey"><p>{key}</p></div>)
      });
      var tech_stack = micro.tech_stack
      tech_stack = tech_stack.map(function(tech,index){
        return(<div className="mtech"><p>{tech}</p></div>)
      })
      return(
          <div className='each-micro'>
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
              </div>
              <div className="micro-but">
                <button className="m-up"><a>Update</a></button>
                <button className="m-del"><a>Delete</a></button>
              </div>
          </div>
      )
    }.bind(this));
  }
    return(
      <div className="wrap">
      <Navbar user={this.state.user} />

          <h1 className="title">Microservices Management</h1>
          <div className="content">
            <h2 className="subtitle">List of Micro-services</h2>
            {micros}
          </div>
          <div className="add-m">
              <button className="add-b"><a href='/addmicro'>Add a MicroService</a></button>
          </div>
      </div>
    )
  }
}
export default Microservices
