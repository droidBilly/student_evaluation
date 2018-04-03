import {FETCH_BATCHES} from '../actions/batches'

export default function (state = [], {type, payload}) {
	switch (type) {
		case FETCH_BATCHES:
			return payload
		default:
      return state
	}
}
