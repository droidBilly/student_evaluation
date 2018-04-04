import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import { createEvaluation } from '../../actions/evaluations'

export class EvaluationForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.createEvaluation(
      this.state.flag,
      this.state.remark,
      this.state.date,
      {teacher_id: 1}, //teacher_id get from teacher
			{student_id: 1} //student_id get from student
    )
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
          <input type="radio"  name="flag" id="flag" value="red"
  				 onChange={ this.handleChange } /> red
          <input type="radio" name="flag" id="flag" value="yellow"
           onChange={ this.handleChange } /> yellow
          <input type="radio"  name="flag" id="flag" value="green"
           onChange={ this.handleChange } /> green
				</div>

        <div>
          <label htmlFor="remark">Remark </label>
          <textarea type="text" name="remark" id="remark" value={
            this.state.remark || ''
          } onChange={ this.handleChange } />
        </div>

				<div>
					<label htmlFor="date">Evaluation for day: </label>
					<input type="date" name="date" id="date" value={
						this.state.date || ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit">Add evaluation</button>
			</form>
		)
	}
}

export default connect(null, {createEvaluation})(EvaluationForm)
