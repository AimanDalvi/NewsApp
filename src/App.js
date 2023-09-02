import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API

  state={
    progress:0
  }


  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  
  render() {
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
         />
        <Routes>
        <Route exact path="/" element={ <News apikey={this.apikey} setProgress={this.setProgress} key="general" pageSize={5} country="in"  category="general"/>}/>
        <Route exact path="/Business" element={ <News apikey={this.apikey}setProgress={this.setProgress} key="business" pageSize={5} country="in"  category="business"/>}/>
        <Route exact path="/Entertainment" element={ <News apikey={this.apikey}setProgress={this.setProgress} key="entertainment"  pageSize={5} country="in"  category="entertainment"/>}/>
        <Route exact path="/Health" element={ <News apikey={this.apikey}setProgress={this.setProgress} key="health"  pageSize={5} country="in"  category="health"/>}/>
        <Route exact path="/Science" element={ <News apikey={this.apikey}setProgress={this.setProgress} key="science"  pageSize={5} country="in"  category="science"/>}/>
        <Route exact path="/Sports" element={ <News apikey={this.apikey}setProgress={this.setProgress} key="sports"  pageSize={5} country="in"  category="sports"/>}/>
        <Route exact path="/Technology" element={ <News apikey={this.apikey}setProgress={this.setProgress} key="technology" pageSize={5} country="in"  category="technology"/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
