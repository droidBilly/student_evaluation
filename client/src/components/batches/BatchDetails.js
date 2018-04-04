import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {fetchBatch} from '../../actions/batches'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import BatchList from './BatchList'

class BatchDetail extends PureComponent {

  componentWillMount() {
    this.props.fetchBatch(this.props.match.params.id)
  }

  render() {
		return (
			<div>
        <Card>
          <CardContent>
			      <h1>{this.props.batches.name}</h1>
            <p>Start date: {this.props.batches.start_date}</p>
            <p>End date: {this.props.batches.end_date}</p>
            <p>Students: {this.props.batches.students}</p>
            <br />
            <Button size="medium">
            <Link className="link" to="/batches/new">Edit Batch</Link>
            </Button>
            <Button size="medium">
            <Link className="link" to="/student/new">Add Student</Link>
            </Button>
          </CardContent>
        </Card>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		batches: state.batches
	}
}

export default connect(mapStateToProps, {fetchBatch})(BatchDetail)
