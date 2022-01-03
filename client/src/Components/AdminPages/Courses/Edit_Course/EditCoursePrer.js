
import React,{ useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {edit_Prerequistes} from '../../../../js/Actions/CoursesAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditCourse.css'
function EditCoursePrer({Courses}) {
  const dispatch = useDispatch()
  var url = window.location.pathname;
  

  var id = url.substring(url.lastIndexOf('/') + 1);
  let thisCourse=Courses.find(el=>el._id===id)

  const [Newprerequistes, setNewprerequistes] = useState(thisCourse.Prerequisites);
    const handleConfim = () => {
    dispatch( edit_Prerequistes(id,Newprerequistes))
  };
    return (
            <div  class="wrapperCourse fadeInDownCourse">
              <div id="formContentCourse">
                <div class="fadeInCourse first">
                  <h5 className='formName'>Edit the course prerequistes</h5>
                </div>
                <form>
                  <CKEditor
                    class="fadeInCourse second ckeditorDiv"
                        editor={ ClassicEditor }
                        data={Newprerequistes}
                        
                        config={{
                            ckfinder:{
                                uploadUrl:'/upload'
                            },
                            mediaEmbed: {
                                previewsInData: true}}}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setNewprerequistes(data)
                
                        } }
                    />
                  
                   <Link to={`/SeeCourse/${id}`}><input type="reset"  class="fadeInCourse third" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${id}`}><input type="submit" class="fadeInCourse fourth" value="Save Changes"onClick={handleConfim} /></Link>
                 </form>
    
            </div>
        </div>
    )
}
          

export default EditCoursePrer

