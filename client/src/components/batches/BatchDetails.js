import React, {PureComponent} from 'react'
import './BatchDetails.css'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {fetchBatch} from '../../actions/batches'
import {deleteStudent} from '../../actions/students'
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

  deleteStudent(studentId) {
    this.props.deleteStudent(studentId)
  }

  renderStudent = (student) => {
      if (student.evaluations[0] === undefined) student.evaluations[0] = {flag: 'grey'}
      return (<Card key={student.id} className="batch-card">
        <CardContent>
          <Typography variant="headline" component="h2">
            <Link to={`/students/${student.id}`}>
              { student.first_name } {student.last_name}
            </Link>
          </Typography>
          <Link to={`/students/${student.id}`}>
            <img className ="profilePicture" src={`${student.profile_pic}`} />
          </Link>
          <Typography color="textSecondary">
            Last evaluation: {student.evaluations}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link to={`/students/${student.id}`}>Edit Student</Link>
          </Button>
          <Button size="small" onClick={() => { if (window.confirm('Are you sure you wish to delete this student?')) this.deleteStudent(student.id) } }>
            Delete Student
          </Button>
        </CardActions>
      </Card>)
    }


  render() {
    const batch = this.props.batch || []
    const students = batch.students || []
    const status_bar = batch.status_bar || [{red: 0, yellow: 0, green: 0, grey: 0}]
    var redStyle = {
      width: status_bar.red + '%',
      backgroundColor: 'red'
    }
    var yellowStyle = {
      width: status_bar.yellow + '%',
      backgroundColor: 'yellow'
    }
    var greenStyle = {
      width: status_bar.green + '%',
      backgroundColor: 'green'
    }
    var greyStyle = {
      width: status_bar.grey + '%',
      backgroundColor: 'grey'
    }
		return (
			<div>
        <Card>
          <CardContent>
			      <h1>{batch.name}</h1>
            <p>Start date: {batch.start_date}</p>
            <p>End date: {batch.end_date}</p>
            <div className="progress">
              <div style={redStyle}>{Math.round(status_bar.red)} %</div>
              <div style={yellowStyle}>{Math.round(status_bar.yellow)} %</div>
              <div style={greenStyle}>{Math.round(status_bar.green)} %</div>
              <div style={greyStyle}>{Math.round(status_bar.grey)} %</div>
            </div>
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

export default connect(mapStateToProps, {fetchBatch, deleteStudent})(BatchDetail)
