import {combineReducers} from 'redux'
import authReducer from './authReducer'
import StudentReducer from './StudentReducer'
import CoursesReducer from './CoursesReducer'
import MessagesReducer from './MessagesReducer'

const reducer=combineReducers({authReducer,StudentReducer,CoursesReducer,MessagesReducer})

export default reducer