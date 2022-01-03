
import React,{ useState } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {edit_Description} from '../../../../js/Actions/CoursesAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditCourse.css'
function EditCourseDesc({Courses}) {
  const dispatch = useDispatch()
  var url = window.location.pathname;


  var id = url.substring(url.lastIndexOf('/') + 1);
  let thisCourse=Courses.find(el=>el._id===id)

  const [CourseNewDesc, setCourseNewDesc] = useState(thisCourse.CourseDescription);
    const handleConfim = () => {
    dispatch( edit_Description(id,CourseNewDesc))
  };
    return (
      <div  class="wrapperCourse fadeInDownCourse">
        <div id="formContentCourse">
                <div class="fadeInCourse first">
                  <h5 className='formName'>Edit the course description</h5>
                </div>
                <form>
                  <CKEditor
                    
                        editor={ ClassicEditor }
                        data={CourseNewDesc}
                        config={{
                            ckfinder:{
                                uploadUrl:'/upload'
                            },
                             mediaEmbed: {
                                previewsInData: true}}}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setCourseNewDesc(data)
                
                        } }
                    />                  
                  <Link to={`/SeeCourse/${id}`}><input type="reset"  class="fadeInCourse second" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${id}`}><input type="submit"  class="fadeInCourse third" value="Save Changes"onClick={handleConfim} /></Link>
                  </form>
    
            </div>
        </div>
    )
}
          

export default EditCourseDesc

