import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {fetchBatch} from '../../actions/batches'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import BatchList from './BatchList'
import StudentForm from '../students/StudentForm'

class BatchDetail extends PureComponent {

  componentWillMount() {
    this.props.fetchBatch(this.props.match.params.id)
  }

  renderStudent = (student) => {
      return (<Card key={student.id} className="batch-card">
        <CardContent>
        <img src={`${student.profile_pic}`} />
          <Typography variant="headline" component="h2">
            <Link to={`/students/${student.id}`}>
              { student.first_name } {student.last_name}
            </Link>
          </Typography>
          <Typography color="textSecondary">
            Students:  <br />
            Start: <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to={`/students/${student.id}`}>Student profile</Link>
          </Button>
        </CardActions>
      </Card>)
    }


  render() {
    const batch = this.props.batch || []
    const students = this.props.batch.students || []
		return (
			<div>
        <Card>
          <CardContent>
			      <h1>{batch.name}</h1>
            <p>Start date: {batch.start_date}</p>
            <p>End date: {batch.end_date}</p>
            <p>Students: {students.map(student => this.renderStudent(student))}</p>
            <br />
            <Button size="medium">
            <Link className="link" to="/batches/new">Edit Batch</Link>
            </Button>
            <Button size="medium">
            <Link to={`/students/new`}>Add Student</Link>
            </Button>
          </CardContent>
        </Card>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		batch: state.batches
	}
}

export default connect(mapStateToProps, {fetchBatch})(BatchDetail)
