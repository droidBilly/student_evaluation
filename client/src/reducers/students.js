import {FETCH_STUDENTS, FETCH_STUDENT, CREATE_STUDENT} from '../actions/students'
import {CREATE_EVALUATION} from '../actions/evaluations'

export default function (state = [], {type, payload}) {
	switch (type) {
		case FETCH_STUDENTS:
			return payload
    case FETCH_STUDENT:
      return payload
    case CREATE_STUDENT:
      return [...state, payload]
    case CREATE_EVALUATION:
      return [...state, payload]
		default:
      return state
	}
}


//      return {...state, evaluations:{...payload}}
