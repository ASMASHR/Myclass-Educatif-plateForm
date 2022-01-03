import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import StudentCard from './StudentCard'
import './pageUsersAdmin.css'
function PageUsersAdmin({students,Courses}) {
    let [StudentSearch,setStudentSearch]=useState("")
     if(StudentSearch.length>0)
    students=students.filter(el=>el.firstName.toUpperCase().includes(StudentSearch.toUpperCase()))    
    
    return (
        <div className="AllStudentsContainer">
            <input type="text" placeholder="Search Student" className="StudentSearchInput" onChange={(e)=>setStudentSearch(e.target.value)}></input>
            <div className='AllStudentsC'>
             {students.map(el=><StudentCard student={el} Courses={Courses} />)}
               </div>
        </div>
    )
}

export default PageUsersAdmin
