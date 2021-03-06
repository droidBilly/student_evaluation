import * as request from 'superagent'
import {baseUrl} from '../constants'
import history from '../history'

export const CREATE_STUDENT = 'CREATE_STUDENT'
export const FETCH_STUDENT = 'FETCH_STUDENT'
export const FETCH_STUDENTS = 'FETCH_STUDENTS'
export const DELETE_STUDENT = 'DELETE_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const FETCH_RANDOM = 'FETCH_RANDOM'

export const fetchStudents = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: FETCH_STUDENTS,
        payload: result.body
      })
    })
}

export const fetchStudent = (studentId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/students/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: FETCH_STUDENT,
        payload: result.body
      })
    })
  }

export const createStudent = (first_name, last_name, profile_pic, batch_id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({first_name, last_name, profile_pic, batch_id})
    .then(result => {
      dispatch({
        type: CREATE_STUDENT,
        payload: result.body
      })
      history.go()
    })
    .catch(err => console.error(err))
}

export const updateStudent = (studentId, first_name, last_name, profile_pic) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .patch(`${baseUrl}/students/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({first_name, last_name, profile_pic})
    .then(result => {
      dispatch({
        type: UPDATE_STUDENT,
        payload: result.body
      })
    })
    .catch(err => console.error(err))
}

export const deleteStudent = (studentId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .delete(`${baseUrl}/students/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: DELETE_STUDENT,
        payload: result.body
      })
    })
  }

  export const fetchRandom = (batchId) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    request
      .get(`${baseUrl}/batches/${batchId}/random`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => {
        dispatch({
          type: FETCH_RANDOM,
          payload: result.body
        })
      })
    }
