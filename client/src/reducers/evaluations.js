import {FETCH_EVALUATION, UPDATE_EVALUATION, FETCH_NEXT} from '../actions/evaluations'

export default function (state = [], {type, payload}) {
	switch (type) {
		case FETCH_EVALUATION:
			return payload
    case UPDATE_EVALUATION:
      return payload
		case FETCH_NEXT:
			return [...state, payload]
		default:
      return state
	}
}
