import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {Link,useParams} from 'react-router-dom'
import { edit_ModuleName } from '../../../../js/Actions/CoursesAction'
import './EditCourse.css'
function EditModuleName({Courses}) {
 const dispatch = useDispatch()
    let info=useParams()
    let IdCourse=info.idCourse
    let idModule=info.idMod
    let course=Courses.find(el=>el._id==IdCourse)
    let Module=course.Modules.find(el=>el._id==idModule)
    const [NewModName, setNewModName] = useState(Module.ModuleName);
 
    const handleConfim = () => {
    dispatch( edit_ModuleName(IdCourse,idModule,NewModName))
  };
  
    return (
     <div  class="wrapperCourse fadeInDownCourse">
        <div id="formContentCourse">
                <div class="fadeInCourse first">
                  <h5 className='formName'>Edit the Module Name</h5>
                </div>
                <form>
                  <input  type="text" class="fadeIn second" name="CourseNewName" value={NewModName} onChange={e=>setNewModName(e.target.value)}/>
                  <Link to={`/SeeCourse/${IdCourse}`}><input type="reset"  class="fadeInCourse third" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${IdCourse}`}><input type="submit" class="fadeInCourse fourth" value="Save Changes"onClick={handleConfim} /></Link>
                 </form>
    
            </div>
        </div>
    )
}
          


export default EditModuleName
