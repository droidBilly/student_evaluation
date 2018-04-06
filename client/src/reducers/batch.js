import {FETCH_BATCH, UPDATE_BATCH} from '../actions/batches'

export default function (state = [], {type, payload}) {
	switch (type) {
    case FETCH_BATCH:
      return payload
    case UPDATE_BATCH:
      return payload
		default:
      return state
	}
}
