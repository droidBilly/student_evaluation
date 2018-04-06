import { FETCH_RANDOM } from '../actions/students'

export default function (state = {}, {type, payload}) {
	switch(type) {
    case FETCH_RANDOM:
      return payload
		default:
      return state
	}
}
