import { GET_COURSE,GET_ALL_COURSES } from "../Actions/ActionType";

const initialState={
    Courses:[],
    Course:null,
    NextChapter:null,
}
 const CoursesReducer=(state=initialState, action)=>{
    switch (action.type) {
        case GET_ALL_COURSES:
            return {...state,Courses:action.payload.courses}
        case GET_COURSE:
            return {...state,Course:action.payload}
        
        default:
            return state
    }
}
export default CoursesReducer