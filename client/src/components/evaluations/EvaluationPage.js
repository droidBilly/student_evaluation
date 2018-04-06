import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {updateEvaluation, fetchEvaluation} from '../../actions/evaluations'
import EvaluationForm from './EvaluationForm'
import {Redirect} from 'react-router-dom'
import {fetchUser} from '../../actions/users'
import history from '../../history'

class EvaluationPage extends PureComponent {

  componentWillMount() {
    this.props.fetchEvaluation(this.props.match.params.evaluationId)
  }

	updateEvaluation = (evaluation) => {
		this.props.updateEvaluation(
        this.props.match.params.evaluationId,
        evaluation.flag,
        evaluation.remark,
        evaluation.date
      )
      history.push(`/batches/${this.props.match.params.batchId}/students/${this.props.match.params.studentId}`)
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
    teacher: state.teacher,
    evaluations: state.evaluations
	}
}

export default connect(mapStateToProps, {fetchEvaluation, fetchUser, updateEvaluation})(EvaluationPage)
