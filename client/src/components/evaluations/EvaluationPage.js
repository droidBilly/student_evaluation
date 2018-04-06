import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {updateEvaluation, fetchEvaluation} from '../../actions/evaluations'
import EvaluationForm from './EvaluationForm'
import {Redirect} from 'react-router-dom'
import {fetchUser} from '../../actions/users'
import {fetchStudent} from '../../actions/students'

class EvaluationPage extends PureComponent {

  componentWillMount() {
    this.props.fetchEvaluation(this.props.match.params.id)
  }

	updateEvaluation = (evaluation) => {
		this.props.updateEvaluation(
        this.props.match.params.id,
        evaluation.flag,
        evaluation.remark,
        evaluation.date,
        this.props.teacher.id,
      )
	}

	render() {
    const evaluation = this.props.evaluations
		return (
			<div>
				<h1>Edit Evaluation</h1>
				<EvaluationForm initialValues={evaluation} onSubmit={this.updateEvaluation} />
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
    student: state.students,
    teacher: state.teacher,
    evaluations: state.evaluations
	}
}

export default connect(mapStateToProps, {fetchEvaluation, fetchStudent, fetchUser, updateEvaluation})(EvaluationPage)
