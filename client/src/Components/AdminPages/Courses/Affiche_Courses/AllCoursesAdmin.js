import React from 'react'
import AdminCourseCard from './AdminCourseCard'
import './CoursesAdmin.css'
function AllCoursesAdmin({Courses,AdminSearch}) {
    if (AdminSearch.length>0)
        Courses=Courses.filter(el=>el.CourseName.toUpperCase().includes(AdminSearch.toUpperCase()))
    return (
        <div className="AllCoursesAdminContainer">
            {Courses.map(el=><AdminCourseCard course={el}/>)}
        </div>
    )
}

export default AllCoursesAdmin
