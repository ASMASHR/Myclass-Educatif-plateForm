
import React,{ useState } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {edit_Tools} from '../../../../js/Actions/CoursesAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditCourse.css'
function EditCourseTools({Courses}) {
  const dispatch = useDispatch()
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
  let thisCourse=Courses.find(el=>el._id===id)

  const [NewTools, setNewTools] = useState(thisCourse.ToolRequired);
  const handleConfim = () => {
    dispatch( edit_Tools(id,NewTools))
  };
    return (
       <div  class="wrapperCourse fadeInDownCourse">
        <div id="formContentCourse">
                <div class="fadeInCourse first">
                  <h5 className='formName'>Edit the course description</h5>
                </div>
                <form>
                  <CKEditor
                    class="fadeInCourse second ckeditorDiv"
                        editor={ ClassicEditor }
                        data={NewTools}
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
                            setNewTools(data)
                
                        } }
                    />
                  
                   <Link to={`/SeeCourse/${id}`}><input type="reset"  class="fadeInCourse third" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${id}`}><input type="submit" class="fadeInCourse fourth" value="Save Changes"onClick={handleConfim} /></Link>
                 </form>
    
            </div>
        </div>
    )
}

export default EditCourseTools

