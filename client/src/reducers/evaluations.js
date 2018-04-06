import {FETCH_EVALUATION, UPDATE_EVALUATION} from '../actions/evaluations'

export default function (state = [], {type, payload}) {
	switch (type) {
		case FETCH_EVALUATION:
			return payload
    case UPDATE_EVALUATION:
      return payload
		default:
      return state
	}
}
