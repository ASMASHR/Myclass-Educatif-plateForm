
import React,{ useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link,useParams } from 'react-router-dom';
import {edit_Chapter} from '../../../../js/Actions/CoursesAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './EditCourse.css'
function EditChapter({Courses}) {
 const dispatch = useDispatch()
let info=useParams()
    let IdCourse=info.idCourse
    let idModule=info.idMod
    let idChapter=info.idChap
    let course=Courses.find(el=>el._id==IdCourse)
    let Module=course.Modules.find(el=>el._id==idModule)
 let Chapter=Module.Chapters.find(el=>el._id==idChapter)
  const [formdata, setformdata] = useState({
    NewChapterName:Chapter.ChapterName
    ,NewChapterContent:Chapter.ChapterContent
    
  });
  const handleFormChange = (e) =>{
    setformdata({ ...formdata, [e.target.name]: e.target.value });}
    const handleConfim = () => {
    dispatch( edit_Chapter(IdCourse,idModule,idChapter,formdata))
  };
  console.log(formdata)
    return (
     <div  class="wrapperCourse fadeInDownEdit">
        <div id="formContentCourse">
                <div class="fadeInCourse first ">
                  <h5 className='formName'>edit chapter</h5>
                </div>
                <form>
                  <input  type="text" class="fadeInCourse second" name="NewChapterName" value={formdata.NewChapterName} onChange={handleFormChange}/>
                  <div class="fadeInCourse">
                  <CKEditor
                    
                        editor={ ClassicEditor }
                        data={formdata.NewChapterContent}
                        
                        config={{
                            ckfinder:{
                                uploadUrl:'/upload'
                            },
                            mediaEmbed: {
                                previewsInData: true}}}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setformdata({...formdata,NewChapterContent:data})
                
                        } }
                    />
                  </div>
                 <Link to={`/SeeCourse/${IdCourse}`}><input type="reset"  class="fadeInCourse third" value="Cancel"/></Link>
                  <Link to={`/SeeCourse/${IdCourse}`}><input type="submit" class="fadeInCourse fourth" value="Save Changes"onClick={handleConfim} /></Link>
                  </form>
    
            </div>
        </div>
    )
}
          

export default EditChapter

