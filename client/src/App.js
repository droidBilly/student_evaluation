import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import TopBar from './components/layout/TopBar'
import LogoutPage from './components/logout/LogoutPage'
import IndexPage from './components/index/IndexPage'
import BatchForm from './components/batches/BatchForm'
import BatchDetails from './components/batches/BatchDetails'
import StudentForm from './components/students/StudentForm'
import StudentDetails from './components/students/StudentDetails'

class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <TopBar />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/teachers" component={SignupPage} />
            <Route exact path="/index" component={IndexPage} />
            <Route exact path="/batches/new" component={BatchForm} />
             <Route exact path="/batches/:id" component={BatchDetails} />
             <Route exact path="/students/new" component={StudentForm} />
             <Route exact path="/students/:id" component={StudentDetails} />
            <Route exact path="/" render={ () => <Redirect to="/index" /> } />
          </div>
      </Router>
    )
  }
}

export default App;
