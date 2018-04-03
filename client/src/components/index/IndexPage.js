import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {fetchUser} from '../../actions/users'
import BatchStart from '../batches/BatchStart'

class IndexPage extends PureComponent {

  componentWillMount() {
    if (this.props.currentUser) {
      this.props.fetchUser()
    }
  }

  render() {
		if (this.props.currentUser === null) return (
			<Redirect to="/login" />
		)

		return (
			<div>
				<h1>Welcome</h1>
        Welcome {this.props.currentUser.name}, you are logged in as {this.props.currentUser.role}
        <br />
        <BatchStart />
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser
	}
}

export default connect(mapStateToProps, {fetchUser})(IndexPage)
