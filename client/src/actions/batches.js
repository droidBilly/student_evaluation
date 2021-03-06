import * as request from 'superagent'
import {baseUrl} from '../constants'

export const FETCH_BATCHES = 'FETCH_BATCHES'
export const CREATE_BATCH = 'CREATE_BATCH'
export const FETCH_BATCH = 'FETCH_BATCH'
export const UPDATE_BATCH = 'UPDATE_BATCH'

export const fetchBatches = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: FETCH_BATCHES,
        payload: result.body
      })
    })
  }

  export const createBatch = (name, start_date, end_date) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    request
      .post(`${baseUrl}/batches`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({name, start_date, end_date})
      .then(result => {
        dispatch({
          type: CREATE_BATCH,
          payload: result.body
        })
      })
      .catch(err => console.error(err))
  }

  export const updateBatch = (batchId, name, start_date, end_date) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    request
      .patch(`${baseUrl}/batches/${batchId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({name, start_date, end_date})
      .then(result => {
        dispatch({
          type: UPDATE_BATCH,
          payload: result.body
        })
      })
      .catch(err => console.error(err))
  }

  export const fetchBatch = (batchId) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    request
      .get(`${baseUrl}/batches/${batchId}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => {
        dispatch({
          type: FETCH_BATCH,
          payload: result.body
        })
      })
      .catch(err => console.error(err))
  }
