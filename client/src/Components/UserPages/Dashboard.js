import React from 'react'
import { useSelector } from "react-redux"
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './userPages.css'
import {get_courses,get_student} from '../../js/Actions/StudentAction'
import StudentCourseCard from './StudentCourseCard'
function Dashboard() {
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(get_student(user._id))
 },[])
 const student=useSelector(state => state.StudentReducer.Student.Student)

const user = useSelector(state => state.authReducer.user)
    const Allcourse=useSelector(state => state.CoursesReducer.Courses)


    if(!user)
    {
        return <h1> waiting ... </h1>
    }
    return (
            <div className="myProfileDiv">
                <div className="Left">
                    <div className="Profile-pic">
                        <img className="pictureP"src={student.profilePic}></img>
                        <Link to={`/EditStudentPic/${student._id}`} className="editPicture"><i class="fas fa-camera"></i></Link>
                    </div>
                    <div className="Student-Info">
                        <div className="info">
                            <span>Full Name:</span>
                            <div className='EditInfo'>
                                <h4>{student.firstName} {student.lastName}</h4>
                                <Link to={`/EditStudentName/${student._id}`}><i class="fas fa-edit"></i> </Link>
                            </div>
                        </div>
                        <div className="info">
                            <span>Email:</span>
                            <div className='EditInfo'>
                                <h4>{student.email} </h4>
                                <Link to={`/EditEmail/${student._id}`}><i class="fas fa-edit"></i> </Link>
                            </div>
                        </div>
                        <div className="info">
                            <span>Password:</span>
                            <div className='EditInfo'>
                                <h4> Edit your Password </h4>
                                <Link to={`/EditStudentPassword/${student._id}`}><i class="fas fa-edit"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Right">
                    <h5 >my courses</h5>
                            {student.courses.map(el=><Link to={`/fullCourse/${el._id}`}><StudentCourseCard course={el} Allcourse={Allcourse}/></Link>)}
            
                    
                </div>
        </div>
    )
}

export default Dashboard
