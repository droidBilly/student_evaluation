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
import {createEvaluation} from '../../actions/evaluations'
import {fetchUser} from '../../actions/users'

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
    this.props.fetchStudent(this.props.match.params.id)
    this.props.fetchUser()
  }

  updateStudent = (student) => {
    this.props.updateStudent(
      this.props.match.params.id,
      student.first_name,
      student.last_name,
      student.profile_pic
    )
    this.toggleEdit()
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
      return (<Card key={evaluation.id} className="batch-card">
        <CardContent>
          <Typography variant="headline" component="h2">
            { evaluation.flag }
          </Typography>
          <Typography color="textSecondary">
            Notice: {evaluation.remark} <br />
            Date:{ evaluation.date }
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small">
            <Link className="link" to={`/evaluations/${evaluation.id}`}>Edit Evaluation</Link>
          </Button>
        </CardActions>
      </Card>)
    }


  render() {
    const student = this.props.student || []
    const evaluations = this.props.student.evaluations || []
    const last_evaluation = evaluations.slice(-1)[0] || {}
    const today = new Date().toJSON().slice(0,10)
    const initial_last_evaluation = ''
    if (last_evaluation.date === today) {this.initial_last_evaluation = last_evaluation}
    else {this.initial_last_evaluation = ''}

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
            <p>Evaluations: {evaluations.map(evaluation => this.renderEvaluation(evaluation))}</p>
            <br />
             <EvaluationForm initialValues={this.initial_last_evaluation} onSubmit={this.createEvaluation} />
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

export default connect(mapStateToProps, {fetchStudent, fetchUser, updateStudent, createEvaluation})(StudentDetail)
