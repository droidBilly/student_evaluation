import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {fetchStudent, updateStudent} from '../../actions/students'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import EvaluationForm from '../evaluations/EvaluationForm'
import StudentForm from './StudentForm'
import {createEvaluation, updateEvaluation} from '../../actions/evaluations'
import {fetchUser} from '../../actions/users'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import WorkIcon from 'material-ui-icons/Work';
import BeachAccessIcon from 'material-ui-icons/BeachAccess';

class StudentDetail extends PureComponent {
  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  }

  componentWillMount() {
    this.props.fetchStudent(this.props.match.params.studentId)
    this.props.fetchUser()
  }

  updateStudent = (student) => {
    this.props.updateStudent(
      this.props.match.params.studentId,
      student.first_name,
      student.last_name,
      student.profile_pic
    )
    this.toggleEdit()
  }

  updateEvaluation = (evaluation) => {
    console.log(evaluation)
		this.props.updateEvaluation(
        this.props.student.evaluations.slice(-1)[0].id,
        evaluation.flag,
        evaluation.remark,
        evaluation.date
      )
	}

  createEvaluation = (evaluation) => {
    this.props.createEvaluation(
      evaluation.flag,
      evaluation.remark,
      evaluation.date,
      this.props.currentUser.id,
      this.props.student.id
    )
  }

  renderEvaluation = (evaluation) => {
      return (
        <ListItem>
          <Avatar>
            <div className={`${evaluation.flag}`}></div>
          </Avatar>
          <ListItemText primary={evaluation.remark} secondary={ evaluation.date } />
          <Button size="small">
            <Link className="link" to={`/batches/${this.props.match.params.batchId}/students/${this.props.match.params.studentId}/evaluations/${evaluation.id}`}>Edit Evaluation</Link>
          </Button>
        </ListItem>)
    }

  render() {
    const student = this.props.student || []
    const evaluations = this.props.student.evaluations || []
    const last_evaluation = evaluations.slice(-1)[0] || {}
    const today = new Date().toJSON().slice(0,10)
    const initial_last_evaluation = ''
    const savingMethod = this.createeEvaluation
    if (last_evaluation.date === today) {this.initial_last_evaluation = last_evaluation; this.savingMethod = this.updateEvaluation}
    else {this.initial_last_evaluation = ''; this.savingMethod = this.createEvaluation}

		return (
			<div>
        <Card>
          <CardContent>
            <img className="profilePicture" src={`${student.profile_pic}`} />
			      <h1>{student.first_name} {student.last_name}</h1>
            { this.state.edit && <StudentForm initialValues={student} onSubmit={this.updateStudent} />}
            <Button size="medium" onClick={this.toggleEdit}>
              Edit Student
            </Button>
            <Button size="medium" onClick={() => { if (window.confirm('Are you sure you wish to delete this student?')) this.deleteStudent(student.id) } }>
              Delete Student
            </Button>
            <br />
            <div className="evaluationList">
              <List>
                {evaluations.map(evaluation => this.renderEvaluation(evaluation))}
              </List>
            </div>
            <br />
             <EvaluationForm initialValues={this.initial_last_evaluation} onSubmit={this.savingMethod} />
          </CardContent>
        </Card>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		student: state.students,
    currentUser: state.teacher
	}
}

export default connect(mapStateToProps, {updateEvaluation, fetchStudent, fetchUser, updateStudent, createEvaluation})(StudentDetail)
