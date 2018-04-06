import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
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
        Welcome {this.props.teacher.name}, you are logged in as {this.props.teacher.role}
        <br />
        <BatchStart />
      </div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser,
    teacher: state.teacher
	}
}

export default connect(mapStateToProps, {fetchUser})(IndexPage)
