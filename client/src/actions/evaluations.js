import * as request from 'superagent'
import {baseUrl} from '../constants'

export const CREATE_EVALUATION = 'CREATE_EVALUATION'
export const FETCH_EVALUATIONS = 'FETCH_EVALUATIONS'

export const fetchStudents = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/evaulations`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: FETCH_EVALUATIONS,
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
    })
    .catch(err => console.error(err))
}
