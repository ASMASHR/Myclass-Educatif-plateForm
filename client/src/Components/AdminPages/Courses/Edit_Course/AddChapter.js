
import React,{ useState } from 'react'
import { useDispatch } from "react-redux";
import { Link,useParams } from 'react-router-dom';
import {Add_Chapter} from '../../../../js/Actions/CoursesAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditCourse.css'
function AddChapter({Courses}) {
 const dispatch = useDispatch()
    let info=useParams()
    let IdCourse=info.idCourse
    let idModule=info.idMod
    let course=Courses.find(el=>el._id==IdCourse)
    let Module=course.Modules.find(el=>el._id==idModule)
  const [formdata, setformdata] = useState({
    ChapterName:""
    ,ChapterContent:""
    
  });
  const handleFormChange = (e) =>{
    setformdata({ ...formdata, [e.target.name]: e.target.value });}
    const handleConfim = () => {
    dispatch( Add_Chapter(IdCourse,idModule,formdata))
  };
  console.log(formdata)
    return (
      <div  class="wrapperCourse fadeInDownCourse">
        <div id="formContentCourse">
                <div class="fadeInCourse first">
                  <h5 className='formName'>Add new chapter</h5>
                </div>
                <form>
                  <input  type="text" class="fadeIn second" name="ChapterName" placeholder='Chapter Name' value={formdata.ChapterName} onChange={handleFormChange}/>
                  
                  <CKEditor
                    class="fadeInCourse second ckeditorDiv"
                        editor={ ClassicEditor }
                        data={formdata.ChapterContent}
                        
                        config={{
                            ckfinder:{
                                uploadUrl:'/upload'
                            },
                            mediaEmbed: {
                                previewsInData: true}}}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setformdata({...formdata,ChapterContent:data})
                
                        } }
                    />
                  
                  <Link to={`/SeeCourse/${IdCourse}`}><input type="reset"  class="fadeInCourse second" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${IdCourse}`}><input type="submit"  class="fadeInCourse third" value="Save Changes"onClick={handleConfim} /></Link>
                  </form>
    
            </div>
        </div>
    )
}
          

export default AddChapter

