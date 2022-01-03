import { GET_COURSE,GET_ALL_COURSES } from "./ActionType";
import axios from "axios";
// get all courses
export const get_all_courses=()=>async(dispatch)=>{
try {
   const res=await axios.get('/api/Courses/AllCourses')
    dispatch({type:GET_ALL_COURSES,payload:res.data})

} 
catch (error) { 
    console.log(error)
        }}


// get one Course
export const get_course=(CourseId)=>async(dispatch)=>{
    try {
 const res=await axios.get(`/api/Courses/Course/${CourseId}`)
    dispatch({type:GET_COURSE,payload:res.data})

} 
catch (error) { 
    console.log(error)
        }}

// Add Course
export const Add_Course=(formData)=>(dispatch)=>{
     try {
           const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
 axios.post('/api/Courses/AddCourse',formData,option)
    dispatch(get_all_courses())

} 
catch (error) { 
        console.log(error)
        }}
// Delete course
export const delete_Course=(id)=>(dispatch)=>{
try {
    const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
    axios.delete(`/api/Courses/DeleteCourse/${id}`,option)
    dispatch(get_all_courses())
} catch (error) {
    console.log(error)    }}


// edit the course Page
export const edit_CoursePic=(id,CourseNewImg)=>(dispatch)=>{
try
    {

       axios.put(`/api/Courses/EditCourseImg/${id}`,CourseNewImg,{
        headers: { 'content-type': 'multipart/form-data',
              "Accept": "application/json",
        "type": "FormData" }
           })
         dispatch(get_all_courses())
    }
    
    catch (error) 
    { console.log(error)
    }
}
// edit the course Name
export const edit_CourseName=(id,FormData)=>async(dispatch)=>{

    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Courses/EditCourseName/${id}`,FormData,option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}
// EDIT Course Description
export const edit_Description=(id,CourseNewDesc)=>async(dispatch)=>{

    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Courses/EditCourseDescription/${id}`,{CourseNewDesc},option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}
// update Course Introduction
export const edit_Intro=(id,CourseIntro)=>async(dispatch)=>{

    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
        axios.put(`/api/Courses/EditCourseIntroduction/${id}`,{CourseIntro},option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}
// Edit Course's Goals
export const edit_Goals=(id,CourseNewGoals)=>async(dispatch)=>{

    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Courses/EditCourseGoals/${id}`,CourseNewGoals,option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}

// EDIT  prerequistes
export const edit_Prerequistes=(id,Newprerequistes)=>async(dispatch)=>{
 
    try {
        
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
        axios.put(`/api/Courses/Editprerequistes/${id}`,{Newprerequistes},option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}

// EditTools
export const edit_Tools=(id,NewTools)=>async(dispatch)=>{

    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Courses/EditTools/${id}`,{NewTools},option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}

// ----------------------------------update Module
// Delete_Module
export const Delete_Module=(IdCourse,idModule)=>async(dispatch)=>{
    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Courses/EditCourse/${IdCourse}/DeleteModule/${idModule}`,option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}
// Add new Module
export const add_Module=(IdCourse,ModuleName,Chapters)=>async(dispatch)=>{

    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
        axios.put(`/api/Courses/EditCourse/${IdCourse}/AddModule`,{ModuleName,Chapters},option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}

// edit Module Name
export const edit_ModuleName=(IdCourse,idModule,NewModName)=>async(dispatch)=>{

    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Courses/${IdCourse}/${idModule}/EditModuleName`,{NewModName},option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}

// ----------------DELETE CHAPTER 
export const Delete_Chapter=(IdCourse,idModule,IdChapter)=>async(dispatch)=>{
    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Courses/EditCourse/${IdCourse}/EditModule/${idModule}/DeleteChapter/${IdChapter}`,option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}



// Add Chapter to module
export const Add_Chapter=(IdCourse,idModule,formdata)=>async(dispatch)=>{
   

    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Courses/${IdCourse}/${idModule}/AddChapter`,formdata,option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}

// edit chapter Content
export const edit_Chapter=(IdCourse,idModule,idChap,formdata)=>async(dispatch)=>{

    try { 
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
         axios.put(`/api/Courses/${IdCourse}/${idModule}/EditChapter/${idChap}`,formdata,option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}


// Add Quiz to module
export const add_Quiz=(IdCourse,IdModule,theQuiz)=>async(dispatch)=>{

    try { 
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
          axios.put(`/api/Courses/course/${IdCourse}/${IdModule}/AddQuiz`,{TheQuiz:theQuiz},option)
        dispatch(get_all_courses())
    }    
    catch (error) { console.log(error)
    }
}

// give rate

export const set_Rating=(CourseId,StudentId,Studentrating)=>async(dispatch)=>{

    try {
        axios.put(`/api/Courses/EditCourse/rating/${CourseId}`,{StudentId,Studentrating})
        axios.put(`/api/Courses/EditCourse/Editrate/${CourseId}`)
    
        dispatch(get_course(CourseId))
    }    
    catch (error) { console.log(error)
    }
}
