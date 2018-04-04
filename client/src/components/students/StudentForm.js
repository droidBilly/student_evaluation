import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import { createStudent } from '../../actions/students'

export class StudentForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.createBatch(this.state.name, this.state.start_date, this.state.end_date)
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
					<label htmlFor="name">Name</label>
					<input type="name" name="name" id="name" value={
						this.state.name || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="start_date">Start date</label>
					<input type="Date" name="start_date" id="start_date" value={
						this.state.start_date || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="end_date">End date</label>
					<input type="Date" name="end_date" id="end_date" value={
						this.state.end_date || ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit">Add Student</button>
			</form>
		)
	}
}

export default connect(null, {createStudent})(StudentForm)
