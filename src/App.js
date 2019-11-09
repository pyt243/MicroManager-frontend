import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Home from './components/home.js'
import SignUp from './components/signup.js'
import Microservices from './components/microservices.js'
import UserStories from './components/userstories.js'
import AddUserStory from './components/add_user_story.js'
import AddMicroService from './components/add_microservice.js'
import UpdateMS from './components/update_ms.js'
import MicroFrontends from './components/microfrontends.js'
import AddMicroFrontend from './components/add_mf.js'
import UpdateMF from './components/update_mf.js'
import Search from './components/search.js'
import UpdateUS from './components/update_us.js'
import Each_MS_Detail from './components/each-ms-detail.js'
import Each_MF_Detail from './components/each_mf_detail.js'
import RequestMS from './components/requestms.js'
import RequestMF from './components/requestmf.js'
import GlobalRequestMF from "./components/global_req_mf.js"
import GlobalRequestMS from "./components/global_req_ms.js"
import GlobalRequests from './components/global_requests.js'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Hi I'm Tilak <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <BrowserRouter>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path = '/microservices' component={Microservices} />
      <Route path = '/userstories' component={UserStories} />
      <Route path = '/adduserstory' component={AddUserStory} />
      <Route path = '/addmicroservice' component = {AddMicroService} />
      <Route path = '/updatemicroservice' component = {UpdateMS} />
      <Route path = '/microfrontends' component = {MicroFrontends} />
      <Route path = "/addmicrofrontend" component = {AddMicroFrontend} />
      <Route path = '/updatemicrofrontend' component = {UpdateMF} />
      <Route path = '/search' component = {Search} />
      <Route path = '/updateuserstory' component = {UpdateUS} />
      <Route path = '/eachms'  component = {Each_MS_Detail} />
      <Route path = '/eachmf'  component = {Each_MF_Detail} />
      <Route path = '/ind_requestms' component={RequestMS} />
      <Route path = '/ind_requestmf' component={RequestMF} />
      <Route path="/requestmf" component={GlobalRequestMF} />
      <Route path="/requestms" component={GlobalRequestMS} />
      <Route path="/requests" component={GlobalRequests} />
    </div>
    </BrowserRouter>
  );
}

export default App;
