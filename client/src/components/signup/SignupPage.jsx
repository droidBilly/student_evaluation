import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {signup} from '../../actions/users'
import {fetchUser} from '../../actions/users'
import SignupForm from './SignupForm'
import {Redirect} from 'react-router-dom'

class SignupPage extends PureComponent {

	componentWillMount() {
		this.props.fetchUser()
	}

	handleSubmit = (data) => {
		this.props.postSignup(data.email, data.password, data.name, data.role)
	}

	render() {
		if (this.props.currentUser.role){
			if (this.props.currentUser.role !== 'SUPER_ADMIN') return (
				<Redirect to="/" />
			)
		}

		return (
			<div>
				<h1>Add teachers</h1>

				<SignupForm onSubmit={this.handleSubmit} />

			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser,
	}
}

export default connect(mapStateToProps, {postSignup: signup, fetchUser})(SignupPage)
