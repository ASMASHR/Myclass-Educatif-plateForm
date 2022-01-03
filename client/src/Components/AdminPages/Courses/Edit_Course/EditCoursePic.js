import React,{ useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link,useParams } from 'react-router-dom';
import './EditCourse.css'
import {edit_CoursePic} from '../../../../js/Actions/CoursesAction'
var FormData = require('form-data');

function EditCoursePic(props) {
 
  

 var url = window.location.pathname;


  var id = url.substring(url.lastIndexOf('/') + 1);

    const [img, setImg] = useState("")
     const dispatch = useDispatch()
  
  const handleConfim = (e) => {

     let CourseNewImg = new FormData();
   CourseNewImg.append('photo', img[0]);
    dispatch(edit_CoursePic(id,CourseNewImg))
  };
    return (
        <div class="wrapperCourse fadeInDownCourse" >
            <div id="formContentCourse">
                <div class="fadeInCourse first">
                  <h5 className='formName'>Edit The Course picture</h5>
                </div>
                <form enctype="multipart/form-data">
                  <input type="file"  id="NewPic"  class="fadeInCourse second inputFile" onChange={(e)=>setImg(e.target.files)}/>
                  <Link to={`/SeeCourse/${id}`}><input type="reset"  class="fadeInCourse second" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${id}`}><input type="submit"  value="Save Changes" class="fadeInCourse second" onClick={handleConfim} /></Link>
                </form>
    
            </div>
              
        </div>
    )
}

export default EditCoursePic