import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import AllCoursesAdmin from './AllCoursesAdmin'
import './CoursesAdmin.css'
function PageCoursesAdmin({Courses}) {
    let [AdminSearch,setAdminSearch]=useState("")
    return (
        <div className="CoursesAdminContainer">
            <Link to="/AddCourse"><button className="AddCourseDiv">Add New Course</button></Link>
            <input type="text" placeholder="Search Course" className="SearchAdmin" onChange={(e)=>setAdminSearch(e.target.value)}></input>
            <AllCoursesAdmin Courses={Courses} AdminSearch={AdminSearch}></AllCoursesAdmin>
            
        </div>
    )
}

export default PageCoursesAdmin
