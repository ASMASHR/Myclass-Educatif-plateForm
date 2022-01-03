import React from 'react';
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {delete_Course} from '../../../../js/Actions/CoursesAction'
import ReactStars from "react-rating-stars-component";
import './CoursesAdmin.css'

function AdminCourseCard({course}) {
const  dispatch = useDispatch()
const DeleteCourse=()=>{
     if(window.confirm("do you want realy to delete this Course "))
          {
               dispatch(delete_Course(course._id))
               alert('Course Deleted');
          }     
}
return (
     
     <div className="CardContainer">
          <Link className="courseInfo" to={`/SeeCourse/${course._id}`}>    
               <h4> {course.CourseName}</h4>
               <h5>Last Update:  {(course.updatedAt).substr(0,10)}</h5>
               <h6>Followers: {course.Followers.length}</h6>
               <ReactStars edit={false} count={5} size={30} value={course.Rating} activeColor="#ffd700"/>
          </Link>
          
          <div className="courseButton">
               <button onClick={DeleteCourse}><i class="fa fa-trash" aria-hidden="true"></i> </button> 
          </div>
     
     </div>
)}

export default AdminCourseCard
