import React from 'react'
import { Link,useParams,useHistory } from 'react-router-dom';
import './EditCourse.css'
function ReadChapter({Courses}) {
    let history=useHistory()
    let info=useParams()
    let IdCourse=info.idCourse
    let idModule=info.idMod
    let idChapter=info.idChap
    let course=Courses.find(el=>el._id==IdCourse)
    let Module=course.Modules.find(el=>el._id==idModule)
 let Chapter=Module.Chapters.find(el=>el._id==idChapter)
 const goBack=()=>{
     history.push(`/SeeCourse/${IdCourse}`)
 }   
 return (
        <div className='ReadeChpContainer'>
            <div className='goBackbutton'>
                <button onClick={goBack}className="button-52" role="button">go back to the full course </button>
            </div>
            <div className='editChapterDiv'>
                <div className='ChapterInfo'>
                    <h4>{Chapter.ChapterName}</h4>      
                    <div className='chapContent' dangerouslySetInnerHTML={{__html:Chapter.ChapterContent}}></div>
                </div>
                <Link to={`/EditCourse/${IdCourse}/${idModule}/EditChapter/${idChapter}`}><i class="fas fa-edit"></i></Link>
            </div>
        </div>
    )
}

export default ReadChapter
