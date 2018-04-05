import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {fetchBatches} from '../../actions/batches'
import {createBatch} from '../../actions/batches'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import BatchList from './BatchList'
import BatchForm from './BatchForm'

class BatchStart extends PureComponent {
  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  }

  createBatch = (batch) => {
    this.props.createBatch(
      batch.name,
      batch.start_date,
      batch.end_date
    )
  }

  render() {
		return (
      <Paper className="outer-paper">
  			<div>
          <Card>
            <CardContent>
				      <h1>Batches</h1>
              <BatchList />
              <br />
              { this.state.edit && <BatchForm onSubmit={this.createBatch} />}
              <Button size="medium" onClick={this.toggleEdit}>
                Add Batch
              </Button>
            </CardContent>
          </Card>
  			</div>
      </Paper>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		batches: state.batches
	}
}

export default connect(mapStateToProps, {fetchBatches, createBatch})(BatchStart)
