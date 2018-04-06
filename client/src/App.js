import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import EvaluationPage from './components/evaluations/EvaluationPage'
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
            <Route exact path="/batches" component={IndexPage} />
             <Route exact path="/batches/:batchId" component={BatchDetails} />
             <Route exact path="/batches/:batchId/students/:studentId" component={StudentDetails} />
             <Route exact path="/batches/:batchId/students/:studentId/evaluations/:evaluationId" component={EvaluationPage} />
            <Route exact path="/" render={ () => <Redirect to="/batches" /> } />
          </div>
      </Router>
    )
  }
}

export default App;
