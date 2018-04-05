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
  }

  updateStudent = (student) => {
    console.log(this.props.match.params.id)
    console.log(student)
    this.props.updateStudent(
      this.props.match.params.id,
      student.first_name,
      student.last_name,
      student.profile_pic
    )
    this.toggleEdit()
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
      </Card>)
    }


  render() {
    const student = this.props.student || []
    const evaluations = this.props.student.evaluations || []
		return (
			<div>
        <Card>
          <CardContent>
            <img src={`${student.profile_pic}`} />
			      <h1>{student.first_name} {student.last_name}</h1>
            <p>Evaluations: {evaluations.map(evaluation => this.renderEvaluation(evaluation))}</p>
            <br />
            { this.state.edit && <StudentForm initialValues={student} onSubmit={this.updateStudent} />}
            <Button size="medium" onClick={this.toggleEdit}>
              Edit Student
            </Button>
            <Button size="medium" onClick={() => { if (window.confirm('Are you sure you wish to delete this student?')) this.deleteStudent(student.id) } }>
              Delete Student
            </Button>
            <EvaluationForm />
          </CardContent>
        </Card>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		student: state.students
	}
}

export default connect(mapStateToProps, {fetchStudent, updateStudent})(StudentDetail)
