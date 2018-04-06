import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Save from 'material-ui-icons/Save';

export class StudentForm extends PureComponent {
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

		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="first_name">First name </label>
					<input type="text" name="first_name" id="first_name" value={
						this.state.first_name || initialValues.first_name || ''
					} onChange={ this.handleChange } />
				</div>

        <div>
          <label htmlFor="last_name">Surname </label>
          <input type="text" name="last_name" id="last_name" value={
            this.state.last_name || initialValues.last_name || ''
          } onChange={ this.handleChange } />
        </div>

				<div>
					<label htmlFor="profile_pic">Link to profile picture </label>
					<input type="text" name="profile_pic" id="profile_pic" value={
						this.state.profile_pic || initialValues.profile_pic || ''
					} onChange={ this.handleChange } />
				</div>

				<Button variant="raised" size="small" type="submit">
					<Save />Save
				</Button>
			</form>
		)
	}
}

export default StudentForm
