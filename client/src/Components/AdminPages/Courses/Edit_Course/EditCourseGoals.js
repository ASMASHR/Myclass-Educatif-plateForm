
import React,{ useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {edit_Goals} from '../../../../js/Actions/CoursesAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditCourse.css'
function EditCourseGoals({Courses}) {
  const dispatch = useDispatch()
  var url = window.location.pathname;


  var id = url.substring(url.lastIndexOf('/') + 1);
  let thisCourse=Courses.find(el=>el._id===id)

  const [formData, setFormData] = useState({
    CourseNewGoals:thisCourse.LearningGoals
    
  });
    const handleConfim = () => {
    dispatch( edit_Goals(id,formData))
  };

    return (
            <div  class="wrapperCourse fadeInDownCourse">
              <div id="formContentCourse">
                <div class="fadeInCourse first">
                  <h5 className='formName'>Edit the course Goals</h5>
                </div>
                <form>
                  <CKEditor
                    class="fadeInCourse second ckeditorDiv"
                        editor={ ClassicEditor }
                        data={formData.CourseNewGoals}
                      
                        config={{
                            ckfinder:{
                                uploadUrl:'/upload'
                            },
                            mediaEmbed: {
                                previewsInData: true}}}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setFormData({...formData,CourseNewGoals:data})
                
                        } }
                    />
                  <Link to={`/SeeCourse/${id}`}><input type="reset"  class="fadeInCourse third" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${id}`}><input type="submit" class="fadeInCourse fourth" value="Save Changes"onClick={handleConfim} /></Link>
                  
                </form>
    
            </div>
        </div>
    )
}
          

export default EditCourseGoals

