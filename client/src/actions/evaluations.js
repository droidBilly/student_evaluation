import * as request from 'superagent'
import {baseUrl} from '../constants'
import history from '../history'

export const CREATE_EVALUATION = 'CREATE_EVALUATION'
export const FETCH_EVALUATION = 'FETCH_EVALUATIONS'
export const UPDATE_EVALUATION = 'UPDATE_EVALUATION'

export const fetchEvaluation = (evaluationId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/evaluations/${evaluationId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: FETCH_EVALUATION,
        payload: result.body
      })
    })
}

export const createEvaluation = (flag, remark, date, teacher_id, student_id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({flag, remark, date, teacher_id, student_id})
    .then(result => {
      dispatch({
        type: CREATE_EVALUATION,
        payload: result.body
      })
      history.go()
    })
    .catch(err => console.error(err))
}

export const updateEvaluation = (evaluationId, flag, remark, date) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .patch(`${baseUrl}/evaluations/${evaluationId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({flag, remark, date})
    .then(result => {
      dispatch({
        type: UPDATE_EVALUATION,
        payload: result.body
      })
    })
    .catch(err => console.error(err))
}
