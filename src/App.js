import './App.css';
import React, { Component } from 'react'
import Navbar from './COMPONENTS/Navbar';
import News from './COMPONENTS/News';
import LoadingBar from "react-top-loading-bar";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

export default class App extends Component {

  state = {
    progress: 0
  }
  pageSize = 15;

  setprogress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color="#f11946"
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setprogress={this.setprogress} key="/general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/business" element={<News setprogress={this.setprogress} key="/business" pageSize={this.pageSize} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News setprogress={this.setprogress} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" />} />
            <Route exact path="/general" element={<News setprogress={this.setprogress} key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/health" element={<News setprogress={this.setprogress} key="health" pageSize={this.pageSize} country="us" category="health" />} />
            <Route exact path="/science" element={<News setprogress={this.setprogress} key="science" pageSize={this.pageSize} country="us" category="science" />} />
            <Route exact path="/sports" element={<News setprogress={this.setprogress} key="sports" pageSize={this.pageSize} country="us" category="sports" />} />
            <Route exact path="/technology" element={<News setprogress={this.setprogress} key="technology" pageSize={this.pageSize} country="us" category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}


