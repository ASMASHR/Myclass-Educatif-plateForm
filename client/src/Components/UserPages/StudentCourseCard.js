import React,{useState} from 'react'
import ProgressB from '../ProgressBar/ProgressB'
// import {ProgressBar} from 'react-bootstrap'
function StudentCourseCard({course,Allcourse}) {
    let courseInfo=Allcourse.find(el=>el._id===course._id)
    let progressPer=course.Progress.ProgressPercent
    return (

        <div className='studentcourseCard' >
            <div className='CourseIMG'> 
                <img src={courseInfo.courseImg}></img>
            </div>
            <div className='CourseINFO'>
                <h2>{courseInfo.CourseName}</h2>
                <span>Course Progress</span>
                <ProgressB progressPer={progressPer}/>
                <div className='subDiv'>
                    <p>Subsbcribed at:</p>
                    <p>{(course.InscriptionDate).substr(0,10)}</p>
                </div>
    </div>
            
        </div>
    )
}

export default StudentCourseCard
