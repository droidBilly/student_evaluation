import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import { createStudent } from '../../actions/students'

export class StudentForm extends PureComponent {

	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.createStudent(
      this.state.first_name,
      this.state.last_name,
      this.state.profile_pic,
			{batch_id : 1}
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
					<label htmlFor="first_name">First name </label>
					<input type="text" name="first_name" id="first_name" value={
						this.state.first_name || ''
					} onChange={ this.handleChange } />
				</div>

        <div>
          <label htmlFor="last_name">Surname </label>
          <input type="text" name="last_name" id="last_name" value={
            this.state.last_name || ''
          } onChange={ this.handleChange } />
        </div>

				<div>
					<label htmlFor="profile_pic">Link to profile picture </label>
					<input type="text" name="profile_pic" id="profile_pic" value={
						this.state.profile_pic || ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit">Add Student</button>
			</form>
		)
	}
}

export default connect(null, {createStudent})(StudentForm)
