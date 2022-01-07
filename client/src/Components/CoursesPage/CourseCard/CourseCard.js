import React from 'react'
import './CourseCard.css'
import {Link} from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import ProgressB from '../../ProgressBar/ProgressB'

function CourseCard({course, user}) {
    let userCourse={}
    if(user)
    {userCourse=user.courses.find(el=>el._id==course._id)}
    return (
        <div>
        {user===null?
        (<Link to={`CourseDescription/${course._id}`} style={{textDecoration: "none",color: "black"}}> 
            <div className="CourseContainer" >
                <img className="courseImg" src={course.courseImg} alt="course img"/>
                <div className="Right-Side">
                    <h5 className="CourseCategorie">{course.Categorie}</h5>
                    <h3 className="courseName">{course.CourseName}</h3>
                    <ReactStars edit={false} count={5} size={30} value={course.Rating} activeColor="#ffd700"/>
                    <p className="courseDesc">{course.CourseDescription}</p>
                </div>
            </div>
        </Link>)
        :(user.courses.findIndex(el=>el._id===course._id)===-1)?
        (<Link to={`CourseDescription/${course._id}`} style={{textDecoration: "none",color: "black"}}> 
            <div className="CourseContainer">
                    <img src={course.courseImg} className="courseImg"  alt="course img"/>
                    <div className="Right-Side">
                        <h5 className="CourseCategorie">{course.Categorie}</h5>
                        <h3 className="courseName">{course.CourseName}</h3>
                         <ReactStars edit={false} count={5} size={30} value={course.Rating} activeColor="#ffd700"/>

                        <div className="courseDesc" dangerouslySetInnerHTML={{__html:course.CourseDescription}}/>
                        </div>
        </div>
        </Link>):
        (<Link to={`/fullCourse/${course._id}`} style={{textDecoration: "none",color: "black"}}> 
        <div className="CourseContainer">
                    <img src={course.courseImg} className="courseImg" alt="course img"/>
                    <div className="Right-Side">
                        <h5 className="CourseCategorie">{course.Categorie}</h5>
                        <h3 className="courseName">{course.CourseName}</h3>
                         <ReactStars edit={false} count={5} size={30} value={course.Rating} activeColor="#ffd700"/>

                        <p className="courseDesc">{course.CourseDescription}</p>
                    <div  style={{width:"90%",margin:"3px 5px"}}>
                        <ProgressB progressPer={userCourse.Progress.ProgressPercent}/>
                    </div>
        </div>
                    
        </div>
        </Link>)}
       </div>
    )
}

export default CourseCard
