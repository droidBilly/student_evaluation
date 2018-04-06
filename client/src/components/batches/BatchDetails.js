import React, {PureComponent} from 'react'
import './BatchDetails.css'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {fetchBatch, updateBatch} from '../../actions/batches'
import {deleteStudent, createStudent} from '../../actions/students'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import BatchList from './BatchList'
import BatchForm from './BatchForm'
import StudentForm from '../students/StudentForm'

class BatchDetail extends PureComponent {
  state = {
    edit: false,
    update: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  }

  toggleUpdate = () => {
    this.setState({
      update: !this.state.upfate
    });
  }

  componentWillMount() {
    this.props.fetchBatch(this.props.match.params.id)
  }

  deleteStudent = (studentId) => {
    this.props.deleteStudent(studentId)
  }

  createStudent = (student) => {
    this.props.createStudent(
      student.first_name,
      student.last_name,
      student.profile_pic,
      this.props.batch.id
    )
    this.toggleEdit()
  }

  updateBatch = (batch) => {
    this.props.updateBatch(
      this.props.batch.id,
      batch.name,
      batch.start_date,
      batch.end_date
    )
    this.toggleUpdate()
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
            <img className="profilePicture" src={`${student.profile_pic}`} />
          </Link>
          <Typography color="textSecondary">
            Last evaluation: {student.evaluations}
          </Typography>
        </CardContent>
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
			      <h1>Batch #{batch.name}</h1>
            <p>Start date: {batch.start_date}</p>
            <p>End date: {batch.end_date}</p>
            { this.state.update && <BatchForm onSubmit={this.updateBatch} />}
            <Button size="medium" onClick={this.toggleUpdate}>
              Edit Batch
            </Button>
            <br />
            <div className="progress">
              <div style={redStyle}>{Math.round(status_bar.red)} %</div>
              <div style={yellowStyle}>{Math.round(status_bar.yellow)} %</div>
              <div style={greenStyle}>{Math.round(status_bar.green)} %</div>
              <div style={greyStyle}>{Math.round(status_bar.grey)} %</div>
            </div>
            Students: {students.map(student => this.renderStudent(student))}
            <br />
            { this.state.edit && <StudentForm onSubmit={this.createStudent} />}
            <Button size="medium" onClick={this.toggleEdit}>
              Add Student
            </Button>
          </CardContent>
        </Card>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		batch: state.batch
	}
}

export default connect(mapStateToProps, {fetchBatch, deleteStudent,createStudent, updateBatch})(BatchDetail)
