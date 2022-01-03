
import React,{ useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link,useParams } from 'react-router-dom';
import {edit_CourseName} from '../../../../js/Actions/CoursesAction'
import './EditCourse.css'
function EditCourseName({Courses}) {
  const dispatch = useDispatch()
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);

  let thisCourse=Courses.find(el=>el._id===id)

  const [formData, setFormData] = useState({
    CourseNewName:thisCourse.CourseName ,
    CourseNewDuration:thisCourse.Duration,
    CourseNewDLevel:thisCourse.DificultieLevel
  });

  const handleFormChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });}
    const handleConfim = () => {
    dispatch( edit_CourseName(id,formData))
  };
    return (
      <div class="wrapperCourse fadeInDownCourse" >
            <div id="formContentCourse">
                <div class="fadeInCourse first">
                  <h5 className='formName'>Edit the course Name</h5>
                </div>
                <form>
                  <input  type="text" class="fadeInCourse second" name="CourseNewName" value={formData.CourseNewName} onChange={handleFormChange}/>
                  <input type="text"  class="fadeInCourse third" name="CourseNewDuration" value={formData.CourseNewDuration}  onChange={handleFormChange}/>
                
                    <div  class="fadeInCourse fourth Dlevel"> 
                        <input type="radio" name="CourseNewDLevel" value="Easy" onChange={handleFormChange}  />
                        <span  className="radio-span" > Easy </span> 
                        <input type="radio" name="CourseNewDLevel" value="Medium" onChange={handleFormChange} />
                        <span  className="radio-span" > Medium </span> 
                        <input type="radio" name="CourseNewDLevel" value="Hard" onChange={handleFormChange}  />
                        <span  className="radio-span" > Hard </span> 
                    </div>
                    <Link to={`/SeeCourse/${id}`}><input type="reset"  class="fadeInCourse second" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${id}`}><input type="submit"  value="Save Changes"onClick={handleConfim} /></Link>
                  </form>
    
            </div>
        </div>
    )
}
          

export default EditCourseName

