import React, {PureComponent} from 'react'
import './BatchDetails.css'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import {fetchBatch, updateBatch} from '../../actions/batches'
import {deleteStudent, createStudent, fetchRandom} from '../../actions/students'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import BatchList from './BatchList'
import BatchForm from './BatchForm'
import StudentForm from '../students/StudentForm'
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';

import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


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
      update: !this.state.update
    });
  }

  componentWillMount() {
    this.props.fetchBatch(this.props.match.params.batchId)
    this.props.fetchRandom(this.props.match.params.batchId)
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
      return (
        <GridListTile key={student.id}>
          <Link to={`/batches/${this.props.match.params.batchId}/students/${student.id}`}>
            <img className="profilePicture" src={`${student.profile_pic}`} />
            </Link>
            <GridListTileBar title={ student.first_name } subtitle={student.last_name} actionIcon={student.evaluations }/>
        </GridListTile>
      )}


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
            <br />
            <Button size="large" color="secondary" variant="raised">
              <Link className="link" to={`/batches/${batch.id}/students/${this.props.random}`}>Ask Question</Link>
            </Button>
            <br />
            <br />
            <div className="progress">
              <div style={redStyle}>{Math.round(status_bar.red)} %</div>
              <div style={yellowStyle}>{Math.round(status_bar.yellow)} %</div>
              <div style={greenStyle}>{Math.round(status_bar.green)} %</div>
              <div style={greyStyle}>{Math.round(status_bar.grey)} %</div>
            </div>
            <div className="gridholder">
            <GridList cellHeight={300}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto'}}>
                <Subheader component="div">Students</Subheader>
              </GridListTile>
              {students.map(student => this.renderStudent(student))}
           </GridList>
           </div>
            <br />
            { this.state.edit && <StudentForm onSubmit={this.createStudent} />}
            <Tooltip id="tooltip-fab" title="Add Student">
              <Button size="medium" onClick={this.toggleEdit} variant="fab" color="primary" aria-label="add" alt="sdfasd">
                <AddIcon />
              </Button>
            </Tooltip>
          </CardContent>
        </Card>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		batch: state.batch,
    random: state.random
	}
}

export default connect(mapStateToProps, {fetchBatch, deleteStudent,createStudent, updateBatch, fetchRandom})(BatchDetail)
