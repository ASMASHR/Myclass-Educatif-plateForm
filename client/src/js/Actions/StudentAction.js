import axios from 'axios'
import {GET_STUDENT, GET_ALL_STUDENTS} from './ActionType'
import { get_course } from './CoursesAction'

//-----------------------------GET ALL STUDENT
export const get_all_students=()=>async(dispatch)=>{
try {
   const res=await axios.get('/api/Student/AllStudents')
    dispatch({type:GET_ALL_STUDENTS,payload:res.data})

} catch (error) { console.log(error)
         }}

         //-----------------------------FIND USER BY ID
export const get_student=(studentId)=>async(dispatch)=>{
    try {
        let res=await axios.get(`/api/Student/student/${studentId}`)
        dispatch({type:GET_STUDENT,payload:res.data})
    } 
    catch (error) { 
        console.log(error)
    }
} 
//-----------------------------EDIT THE PROFILE PICTURE
export const edit_picture=(id,Newpic)=>(dispatch)=>{
try
    {
         const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
    axios.put(`/api/Student/EditStudentPic/${id}`,Newpic,option)
         dispatch(get_student(id))
    }
    
    catch (error) 
    { 
        console.log(error)
    }
}
//----------------------------- EDIT THE NAME
export const edit_name=(id,FormData)=>(dispatch)=>{
    try {
         const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Student/EditStudentName/${id}`,FormData,option)
        dispatch(get_student(id))
    }    
    catch (error) { console.log(error)
    }
}

//-----------------------------EDIT THE PASSWORD 
export const edit_password=(id,FormData)=>(dispatch)=>{
    try {
         const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
        axios.put(`/api/Student/EditPassword/${id}`,FormData,option)
        dispatch(get_student(id))
    }     catch (error) { console.log(error)
    }
}
//----------------------------- EDIT EMAIL
export const edit_email=(id,FormData)=>(dispatch)=>{
    try {
         const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
        axios.put(`/api/Student/EditEmail/${id}`,FormData,option)
        dispatch(get_student(id))
    }    
     catch (error) { console.log(error)
    }
}

//----------------------------- REMOVE A STUDENT
export const delete_student=(id)=>(dispatch)=>{
    try {
         const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
        axios.delete(`/api/Student/DeleteStudent/${id}`,option)
        dispatch(get_all_students())
    }     
    catch (error) 
    { console.log(error)
    }
}
//-----------------------------SUBSCRIBE TO COURSE
export const subscribe_course=(CourseId,StudentId)=>(dispatch)=>{
    try {
         const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
        axios.put(`/api/Student/Subscribe/${CourseId}`,{StudentId},option)
        dispatch (get_course(CourseId))
        dispatch (get_student(StudentId))
    }
    catch (error) 
        { console.log(error)
    }
}
//-----------------------------SAVE PROGRESSLEVEL 
export const saveLevel=(userId,{CourseId,ModLevel,ChapLevel})=>(dispatch)=>{
    try {
         const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
       axios.put(`/api/Student/courseLevel/${userId}`,{CourseId,ModLevel,ChapLevel},option)
        
        dispatch(get_student(userId))
    }
    catch (error) { 
        console.log(error)
    }
}
// -----------------------------SAVE THE QUIZ RESULT
export const saveQuiz=(studentId,courseId,ModuleId,theQuiz,QuizScore)=>(dispatch)=>{
    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
 axios.put(`/api/Student/SaveQuizAnswers/${courseId}/${ModuleId}`,{studentId,theQuiz,QuizScore},option)
       
        dispatch(get_student(studentId))
    } catch (error) {
        console.log(error)
        
    }
    
}
// /Delete Quiz Answers
export const Retake_Quiz=(studentId,courseId,ModuleId)=>(dispatch)=>{
try {
     const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
    axios.put(`/api/Student/DeleteQuizAnswers/${courseId}/${ModuleId}`,{studentId},option)
    dispatch(get_student(studentId))
} catch (error) {
    
}

}