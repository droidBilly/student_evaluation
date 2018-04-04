import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {fetchStudent} from '../../actions/students'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import EvaluationForm from '../evaluations/EvaluationForm'

class StudentDetail extends PureComponent {

  componentWillMount() {
    this.props.fetchStudent(this.props.match.params.id)
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
            <Button size="medium">
            <Link className="link" to="/batches/new">Edit Student</Link>
            </Button>
            <Button size="medium">
            <Link to={`/evaluation/new`}>Add Evaluation</Link>
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

export default connect(mapStateToProps, {fetchStudent})(StudentDetail)
