import {FETCH_BATCHES, CREATE_BATCH} from '../actions/batches'

export default function (state = [], {type, payload}) {
	switch (type) {
		case FETCH_BATCHES:
			return payload
		case CREATE_BATCH:
			return [...state,payload]
		default:
      return state
	}
}
