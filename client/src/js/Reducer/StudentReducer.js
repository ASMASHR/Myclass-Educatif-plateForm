import {GET_STUDENT, GET_ALL_STUDENTS} from '../Actions/ActionType'

const initialState={
    msg:null,
    Students:[],
    token: localStorage.getItem("token"),
    Student:null
    
}

const StudentReducer=(state=initialState,action)=>{
    switch (action.type) {
        case GET_STUDENT:
                return {...state,Student:action.payload}
        case GET_ALL_STUDENTS:
            return {...state,...action.payload}
    
        default:
            return state;
    }
}

export default StudentReducer
