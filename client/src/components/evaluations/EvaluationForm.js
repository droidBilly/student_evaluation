import React, {PureComponent} from 'react'
import { createEvaluation } from '../../actions/evaluations'
import Button from 'material-ui/Button'
import Save from 'material-ui-icons/Save';

export class EvaluationForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		const initialValues = this.props.initialValues || {}
		console.log(initialValues)

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
            this.state.remark || initialValues.remark || ''
          } onChange={ this.handleChange } />
        </div>

				<div>
					<label htmlFor="date">Evaluation for day: </label>
					<input type="date" name="date" id="date" value={
						this.state.date || initialValues.date || ''
					} onChange={ this.handleChange } />
				</div>

				<Button variant="raised" size="small" type="submit">
					<Save />Save
				</Button>
			</form>
		)
	}
}

export default EvaluationForm
