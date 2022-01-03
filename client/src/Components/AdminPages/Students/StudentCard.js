import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {delete_student} from '../../../js/Actions/StudentAction'
function StudentCard({student,Courses}) {
     const  dispatch = useDispatch()
     let courseInfo=[]
     for(let i=0;i<student.courses.length;i++)
     {let el={course:Courses.find(el=>el._id===student.courses[i]._id),
    courseProgress:student.courses[i].Progress.ProgressPercent}
courseInfo.push(el);
    }
console.log("courses",courseInfo)
    const DeleteStudent=()=>{
        if(window.confirm("do you want realy to delete this Student "))
        {dispatch(delete_student(student._id))
        alert('User Deleted');
    }
  
    }
    console.log(Courses)
    console.log(student)
    // 
    // let stdC=student.courses.forEach(el => Courses.filter(cours=>cours._id==el._id));
    // console.log(stdC)
    return (
        <div className="CardStudentsContainer" >
           <div className="StudentInfo">
           <div className='nameEmail'>
                <h4> {student.firstName} {student.lastName}</h4>
                <h5>{student.email}</h5>
           </div>

            <h6>Signup date:  {(student.createdAt).substr(0,10)}</h6>
            <h6>last SignIn:  {(student.lastLogin).substr(0,10)}</h6>
        <div className='CoursesDiv'>
            <h4>courses</h4>
            <ul>{courseInfo.map(el=><li><span style={{fontWeight:"bold"}}>{el.course.CourseName}: </span><span className='courseProg'>{el.courseProgress}%</span></li>)}
            </ul>
        </div>
           </div>
           <div className="StudentButton">
            {/* <Link to={`/EditUser/${student._id}`}><i class="fas fa-edit"></i> </Link> */}
            <button onClick={DeleteStudent}><i class="fa fa-trash" aria-hidden="true"></i> </button> 
            </div>
        </div>
    )
}

export default StudentCard
