import React , {Component} from 'react'
import Navbar from './navbar.js'
import {Link} from 'react-router-dom';
import './view_ms.css'
import axios from 'axios'
import Each_MS from './each-ms.js'
import Each_MF from './each_mf.js'
import { templateElement } from '@babel/types';

class Search extends Component{
    state={
        search_input:"temp",
        search_results:[],
        result_fetched: false,
        result_len: 0,
        dropdown_value: "ms",
        micros:[]
    }
    componentWillMount(){
        //this.setState(this.props.location.state)
    //   this.setState(this.props.location.state)
    //   axios.post('http://localhost:5000/micr',{}).then(res=>{
    //     this.setState({micros:res.data.micros,loadStatus:true});
    //     console.log(res.data.micros)
    //   })
    }
    handleDropdownChange(e){


        console.log(e.target.value)
        this.setState({dropdown_value:e.target.value})
        //var query =  this.state.search_input
        //console.log(query)
        // alert(title + keywords + desc + tech_stack + code_snippet + documentation)
        // axios.post("http://localhost:5000/update_micro/"+this.state.micro._id,{ title:title , desc:desc , keywords:keywords, documentation:documentation, code_snippet:code_snippet, tech_stack:tech_stack, owner:owner}).then(res => {
        //   if(res.data.status == true){
        //     alert("Microservice updated successfully")
        //   }
        // })
        //e.preventDefault()
      }
    handleChange(e){

        console.log("cakked")
        console.log(e.target.value)
        this.setState({search_input:e.target.value})

        //var query =  this.state.search_input
        //console.log(query)
        // alert(title + keywords + desc + tech_stack + code_snippet + documentation)
        // axios.post("http://localhost:5000/update_micro/"+this.state.micro._id,{ title:title , desc:desc , keywords:keywords, documentation:documentation, code_snippet:code_snippet, tech_stack:tech_stack, owner:owner}).then(res => {
        //   if(res.data.status == true){
        //     alert("Microservice updated successfully")
        //   }
        // })
        //e.preventDefault()
      }
    handleSubmit(e){

        console.log("cakked")

        console.log(this.state.search_input)

        //var query =  this.state.search_input
        //console.log(query)
        // alert(title + keywords + desc + tech_stack + code_snippet + documentation)
        // axios.post("http://localhost:5000/update_micro/"+this.state.micro._id,{ title:title , desc:desc , keywords:keywords, documentation:documentation, code_snippet:code_snippet, tech_stack:tech_stack, owner:owner}).then(res => {
        //   if(res.data.status == true){
        //     alert("Microservice updated successfully")
        //   }
        // })
        this.setState({micros:[]})
        e.preventDefault()
        axios.post("http://localhost:5002/srch/",{search_input:this.state.search_input,dropdown_value:this.state.dropdown_value})
        .then(res=>{
            console.log(res.data)

            this.setState({search_results:res.data,result_fetched:true})
            //search_results_len=res.data.length
            if(res.data.length==0){
                this.setState({result_len:0})
                console.log("No Search results found")
            }
            else{
                this.setState({result_len:res.data.length})
                let temp=[]
                if(this.state.dropdown_value=="ms"){
                  for(let i=0;i<res.data.length;i++){
                    temp.push(<Each_MS user={this.props.owner} micro_id={res.data[i]._id} />)
                  }
                }
                else{
                  for(let i=0;i<res.data.length;i++){
                    temp.push(<Each_MF user={this.props.owner} micro_id={res.data[i]._id} link={true}/>)
                  }
                }
                this.setState({micros:temp})
            }

        })
      }
    render(){
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        //console.log(JSON.stringify(this.state))
        //console.log(JSON.stringify(this.state))
        return(
            <div className="wrap">
              <h1 className="add-title">Link MS/MF</h1>
              <div className="content">
              <select value={this.state.dropdown_value}
              onChange={this.handleDropdownChange}>

                <option value="ms">Microservice</option>
                <option value="mf">Microfrontend</option>
              </select>
                <form onSubmit={this.handleSubmit}>
                  <div className="ad-n">
                    <input type="text" name="search_textbox" onChange={this.handleChange} ref="search_textbox"/>
                  </div>

                  <input type="submit"  value="Submit" />
                </form>
                <h1>{this.state.result_fetched? (this.state.result_len == 0 ? "No result found":  this.state.micros  ) :"loading..." }</h1>
                {/*array of results from query are there in this.state.search_results */}
              </div>
            </div>
          )
    }
  //  {this.state.result_fetched? (this.state.result_len ? :  ) : }


  }

  export default Search
