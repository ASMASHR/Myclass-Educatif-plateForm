import React from 'react'
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom'
import { Delete_Chapter,Delete_Module} from '../../../../js/Actions/CoursesAction';
import './CoursesAdmin.css'
function AdminCourseV({Courses}) {
  
const dispatch = useDispatch()
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf('/') + 1);
    
    let theCourse=Courses.find(el=>el._id==id)
// const DeleteChapter=(ChapId)=>
return (

        <div>
            <div className='FirstCol'>
                <div className='imageEdit'>
                    <img src={theCourse.courseImg}/>
                    <Link to={`/EditCoursePic/${theCourse._id}`}><i class="fas fa-edit"></i></Link>
                </div>
                <div className='row-1'>
                        <div className='editNameDuration'>
                            <div className='NameDuration'>
                                <h2>{theCourse.CourseName}</h2>
                                <div className='difDuration'>
                                        <span>{theCourse.Duration}</span>                             
                                        <span>{theCourse.DificultieLevel}</span>
                                </div>
                            </div>
                            <Link to={`/EditCourseName/${theCourse._id}`}><i class="fas fa-edit"></i></Link>
                        
                        </div>
                    <div className='row-2'>
                        <span>create At:  {(theCourse.createdAt).substr(0,10)}</span>
                        <span>Last Update:  {(theCourse.updatedAt).substr(0,10)}</span>
                    </div>
                </div>
            </div>
            <div className='SecondCol'> 
                <div className='EditInformations'>
                    <div className='InformationsDiv'>
                        <h4>Description:</h4>
                        <div dangerouslySetInnerHTML={{__html:theCourse.CourseDescription}}></div> 
                    </div>
                    <Link to={`/EditCourseDesc/${theCourse._id}`}><i class="fas fa-edit"></i></Link>
                </div> 
                <div className='EditInformations'>
                    <div className='InformationsDiv'>
                        <h4>Introduction: </h4>
                        <div dangerouslySetInnerHTML={{__html:theCourse.MoreInfo}}></div>
                    </div>
                    <Link to={`/EditIntro/${theCourse._id}`}><i class="fas fa-edit"></i></Link>
                </div>

                <div className='EditInformations'>
                    <div  className='InformationsDiv'>  
                        <h4>Goals: </h4>
                        <div dangerouslySetInnerHTML={{__html:theCourse.LearningGoals}}></div>
                    </div>
                    <Link to={`/EditCourseGoals/${theCourse._id}`}><i class="fas fa-edit"></i></Link>
                </div>
                <div className='EditInformations'>
                    <div className='InformationsDiv'>
                        <h4>Prerequistes: </h4> 
                        <div dangerouslySetInnerHTML={{__html:theCourse.Prerequisites}}></div>
                    </div>
                    <Link to={`/EditCoursePrer/${theCourse._id}`}><i class="fas fa-edit"></i></Link> 
                </div>
                <div className='EditInformations'>  
                    <div className='InformationsDiv'>
                        <h4>tools: </h4>
                        <div dangerouslySetInnerHTML={{__html:theCourse.ToolRequired}}></div>
                    </div> 
                    <Link to={`/EditCourseTools/${theCourse._id}`}><i class="fas fa-edit"></i></Link>
                </div>
                 <div className='PlanDIV'> 
                <h4>Course Plan</h4> 
                
                <ol>
                    {theCourse.Modules.map(el=>
                        <li>
                            <div className='ModuleNameEdit'>
                                <h5>{el.ModuleName}</h5>
                                <div className='AddChapQuizModule'>
                                    <Link to={`/EditCourse/${theCourse._id}/${el._id}/AddChapter`}><button class="AddChapterQuiz" >Add New Chapter</button></Link>
                                   </div>
                                <div className='EditDeleteModule'>
                                    <Link to={`/EditCourse/${theCourse._id}/${el._id}/editModuleName`}><i class="fas fa-edit"></i></Link>
                                    <Link to={`/SeeCourse/${theCourse._id}`}>
                                                <button  className="DeleteButton" onClick={()=>
                                                        {
                                                            let IdCourse=theCourse._id
                                                            let idModule=el._id
                                                            if(window.confirm("do you want realy to delete this Module? "))
                                                            {
                                                                dispatch(Delete_Module(IdCourse,idModule))
                                                                alert('Module Deleted');}     
                                                        }
                                                    }>
                                                        
                                                <i class="fa fa-trash" aria-hidden="true"></i> </button> 
                                    </Link>
                                </div>
                                </div>
                                <ul>
                                    {el.Chapters.map(chapp=><li>
                                        <div className='ChapterNameRead'>{chapp.ChapterName} 
                                            <div className='ChapterReadDelete'>
                                                <Link to={`/${theCourse._id}/${el._id}/ReadChapter/${chapp._id}`}>
                                                    <i class="fas fa-book-reader"></i>
                                                </Link>
                                                <Link to={`/SeeCourse/${theCourse._id}`}>
                                                    <button  className="DeleteButton" onClick={()=>
                                                            {let IdCourse=theCourse._id
                                                                let idModule=el._id
                                                                let IdChapter=chapp._id
                                                            console.log("chapp._id",idModule)
                                                            if(window.confirm("do you want realy to delete this Chapter "))
                                                                {
                                                                    dispatch(Delete_Chapter(IdCourse,idModule,IdChapter))
                                                                    alert('Chapter Deleted');
                                                                    
                                                                }     
    }
                                                        
                                                        }><i class="fa fa-trash" aria-hidden="true"></i> </button> 
                                                </Link>
                                            </div>
                                        </div>
                                        
                                    </li>)}
                                    {el.Quiz.length!==0?<li className='ChapterNameRead'>Quiz:{el.ModuleName}</li>:
                                    <div style={{marginLeft:"30vw"}}><Link to={`/EditCourse/${theCourse._id}/${el._id}/AddQuiz`}><button className="AddChapterQuiz">Add Quiz</button></Link>
                                </div>}
                                </ul>
                    
                        </li> )} 
                    </ol>

                    <div className='AddModuleDiv'>
                        <Link to={`/EditCourse/${theCourse._id}/AddModule`}><button className="AddNewModule" >Add New Module</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCourseV
