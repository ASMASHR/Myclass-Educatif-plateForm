
import React,{ useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {edit_Intro} from '../../../../js/Actions/CoursesAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditCourse.css'
function EditCourseIntro({Courses}) {
  const dispatch = useDispatch()
  var url = window.location.pathname;

  var id = url.substring(url.lastIndexOf('/') + 1);
  let thisCourse=Courses.find(el=>el._id===id)

  const [CourseIntro, setCourseIntro] = useState(thisCourse.MoreInfo);

    const handleConfim = () => {
    dispatch( edit_Intro(id,CourseIntro))
  };
    return (
      <div  class="wrapperCourse fadeInDownCourse">
        <div id="formContentCourse">
                <div class="fadeInCourse first">
                  <h5 className='formName'>Edit the Introduction</h5>
                </div>
                <form>
                 
                  <CKEditor
                        editor={ ClassicEditor }
                        class="fadeInCourse second ckeditorDiv"
                        data={CourseIntro}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        config={{
                            ckfinder:{
                                uploadUrl:'/upload'
                            },
                             mediaEmbed: {
                                previewsInData: true}}}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setCourseIntro(data)
                
                        } }
                    />
                   
                  <Link to={`/SeeCourse/${id}`}><input type="reset"  class="fadeInCourse third" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${id}`}><input type="submit" class="fadeInCourse fourth" value="Save Changes"onClick={handleConfim} /></Link>
                  </form>
    
            </div>
        </div>
    )
}
          

export default EditCourseIntro

