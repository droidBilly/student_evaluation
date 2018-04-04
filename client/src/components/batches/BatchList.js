import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchBatches} from '../../actions/batches'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

class BatchList extends PureComponent {

  componentWillMount() {
    this.props.fetchBatches()
  }

  renderBatch = (batch) => {
      return (<Card key={batch.id} className="batch-card">
        <CardContent>
          <Typography variant="headline" component="h2">
            <Link to={`/batches/${batch.id}`}>
              { batch.name }
            </Link>
          </Typography>
          <Typography color="textSecondary">
            Students: {batch.students.lenght} <br />
            Start: {batch.start_date}<br />
            End: {batch.end_date}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to={`/batches/${batch.id}`}>Start evaluating</Link>
          </Button>
        </CardActions>
      </Card>)
    }

  render() {
    if (this.props.batches === []) return 'No batches so far';
		return (
      <Paper className="outer-paper">
  			<div>
          {this.props.batches.map(batch => this.renderBatch(batch))}
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

export default connect(mapStateToProps, {fetchBatches})(BatchList)
