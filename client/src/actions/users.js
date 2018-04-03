import * as request from 'superagent'
import {baseUrl} from '../constants'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

export const FETCH_USER = 'FETCH_USER'


export const logout = () => ({
  type: USER_LOGOUT
})

export const login = (email, password) => (dispatch) =>
	request
		.post(`${baseUrl}/logins`)
    .send({email, password})
    .then(result => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: result.body
      })
    })
    .catch(err => {
    	if (err.status === 400) {
    		dispatch({
    			type: USER_LOGIN_FAILED,
    			payload: err.response.body.message || 'Unknown error'
    		})
    	}
    	else {
    		console.error(err)
    	}
    })

export const signup = (email, password, name, role) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
		.post(`${baseUrl}/teachers`)
    .set('Authorization', `Bearer ${jwt}`)
		.send({ name, role, email, password })
		.then(result => {
			dispatch({
				type: USER_SIGNUP_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: USER_SIGNUP_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
		})
  }

  export const fetchUser = () => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt

    request
      .get(`${baseUrl}/teacher`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => {
        dispatch({
          type: FETCH_USER,
          payload: result.body
        })
      })
  }
