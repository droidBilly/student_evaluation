import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {fetchBatches} from '../../actions/batches'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import BatchList from './BatchList'

class BatchStart extends PureComponent {


  render() {
		return (
      <Paper class="outer-paper">
  			<div>
          <Card>
            <CardContent>
				      <h1>Batches</h1>
              <BatchList />
              <br />
              <Button size="medium">
                <Link className="link" to="/batches/new">Create New Batch</Link>
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

export default connect(mapStateToProps, {fetchBatches})(BatchStart)
