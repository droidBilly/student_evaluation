import {FETCH_STUDENTS, FETCH_STUDENT, CREATE_STUDENT} from '../actions/students'

export default function (state = [], {type, payload}) {
	switch (type) {
		case FETCH_STUDENTS:
			return payload
    case FETCH_STUDENT:
      return payload
    case CREATE_STUDENT:
      return payload
		default:
      return state
	}
}
