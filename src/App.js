import React from 'react';
import './App.css';

import Home from './page/Home';
import Room from './page/Room';
import SingleRoom from './page/SingleRoom';
import Error from './page/Error';

import {Route ,Switch } from 'react-router-dom';

import Navbar from './components/NavBar';

//import {RoomConsumer}

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/rooms/' exact component={Room}/>
        <Route path='/rooms/:slug' exact component={SingleRoom}/>
        <Route component={Error}/>      
      </Switch>
    </div>
  );
}

export default App;
