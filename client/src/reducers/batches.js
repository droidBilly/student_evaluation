import {FETCH_BATCHES, FETCH_BATCH, CREATE_BATCH} from '../actions/batches'

export default function (state = [], {type, payload}) {
	switch (type) {
		case FETCH_BATCHES:
			return payload
    case FETCH_BATCH:
      return payload
    case CREATE_BATCH:
      return [...state,payload]
		default:
      return state
	}
}
