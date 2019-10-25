import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Home from './components/home.js'
import SignUp from './components/signup.js'
import Microservices from './components/microservices.js'
import UserStories from './components/userstories.js'
import AddUserStory from './components/add_user_story.js'
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
    </div>
    </BrowserRouter>
  );
}

export default App;
