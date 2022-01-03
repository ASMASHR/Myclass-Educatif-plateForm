import React, {useState} from 'react'
import './CourseDesc.css'
import { useDispatch } from 'react-redux';
import { useSelector} from "react-redux";
import {subscribe_course} from "../../../js/Actions/StudentAction"
import {Link, useHistory} from 'react-router-dom'
import { get_course } from '../../../js/Actions/CoursesAction';
import ReactHtmlParser from 'react-html-parser';
function CourseDescription({Allcourses}) {

   let [ isLoading, setisLoading ] = useState(true);
   let [Subcribed,setSubcribed]=useState(false)


    let history=useHistory()
    let  dispatch = useDispatch()
    let url = window.location.pathname;
    let CourseId = url.substring(url.lastIndexOf('/') + 1);
    dispatch(get_course(CourseId))
    let course = Allcourses.find((el) =>  el._id == CourseId)
    let isAuth = useSelector(state => state.authReducer.isAuth);
    let student = useSelector(state => state.authReducer.user)

    
    let SubscribeCourse=()=>{
    if((student)&&(student.courses.findIndex(el=>el._id===course._id)!==-1))
        {history.push(`/fullCourse/${CourseId}`)
    }
    else
    {
    let StudentId=student._id
    dispatch(subscribe_course(CourseId,StudentId))
    setTimeout(() => setisLoading(false), 1000)
    setSubcribed(true)

}
}

    return (
    <div>
           
        
        <div className="Desc-Container">
            <div className="Course-Info" >
                <div className="NameContainer">
                    <div className="containerN">
                        <div className="NameDiv">
                            <div className="ImgName">
                                <img src={course.courseImg}></img>
                                <div className="descRight">
                                    <h2 className="courseName">{course.CourseName}</h2>
                                    <div className="DificultieDurationDec">
                                    <div className="dificultieDiv">
                                        <i class="fas fa-signal"></i>
                                        <p>{course.DificultieLevel}</p>
                                    </div>
                                    <div className="durationDiv">
                                        <i class="fas fa-clock"></i>
                                        <p>{course.Duration}</p>
                                    </div>
                                </div>
                        </div>
                        
                            </div>
                        </div>
                    </div>
                </div>
                <div className="restDesc">
                    
                    <div>{ ReactHtmlParser(course.MoreInfo) }</div>
                    <div className="Goals" dangerouslySetInnerHTML={{__html: course.LearningGoals}}>
    
                    </div>

                    <div className="Prer-Tools">
                        <p className="Prer" dangerouslySetInnerHTML={{__html:course.Prerequisites}}></p>
                        <p className="Tools" dangerouslySetInnerHTML={{__html:course.ToolRequired}}></p>
                    </div>
                    <div className="buttons-Div">
                        {(isAuth==false)?
                        (<Link to="/Login">
                            <button className='button-82-pushable'> <span class="button-82-shadow"></span><span class="button-82-edge"></span><span class="button-82-front text">Subscribe to COURSE </span></button>
                        
                        </Link>):
                            (Subcribed==false?(<button className='button-82-pushable' onClick={SubscribeCourse}> 
                                <span class="button-82-shadow"></span><span class="button-82-edge"></span>
                                <span class="button-82-front text">
                                    Subscribe to COURSE
                                </span>
                            </button>):!isLoading?<Link to={`/fullCourse/${CourseId}`}><button class="button-76" role="button">Access to the Full Course</button></Link>:
                            <div class="loader">Loading...</div>)
                        }

                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default CourseDescription
