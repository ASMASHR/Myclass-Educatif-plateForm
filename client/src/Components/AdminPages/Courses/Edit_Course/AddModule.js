import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link,useParams} from 'react-router-dom'
//import './AddCourse.css'
import {add_Module} from '../../../../js/Actions/CoursesAction'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function AddModule() {
   const dispatch = useDispatch(); 
    let info=useParams()
    let IdCourse=info.IdCourse
let [Chapter,setChapter]=useState({
    ChapterName:"",
    ChapterContent:null})
let [Chapters,setChapters]=useState([])
let [buttonChapter,setbuttonChapter]=useState("Add Chapter")


// buttonModule

const handleConfim = () => {
    
    dispatch(add_Module(IdCourse,ModuleName,Chapters))
};
const [ModuleName,setModuleName]=useState("")
const handleAddChapter = (e) =>setChapter({ ...Chapter, [e.target.name]: e.target.value });

const addChapter=()=>{
    if((Chapter.ChapterContent==="")||(Chapter.ChapterName===""))
        {alert("you should add a name and a content for your Chapter")}
    else
    { setChapters([...Chapters,Chapter])
        setChapter({ChapterName:"",ChapterContent:""})
        setbuttonChapter("Add one Other chapter")
        }
}


    return (
            <div className="AddComponent">
                <h3>Add New Module</h3>
                <div>
            <div className="ModuleDiv">
                
                <div className="AddModules">
                    <div className="InputDiv">
                        <label>Module Name:</label> 
                        <input className="AddInput" type="text" placeholder="Module Name" name="ModuleName" onChange={(e)=>setModuleName(e.target.value)}></input>
                    </div>
                    <div className="ChaptersDiv">
                        <h5>Module Chapters</h5>
                        <p>*Add chapters to the Module</p>
                        <div className="InputDiv">
                            <label>Chapter Name:</label>
                            <input className="AddInput" type="text" placeholder="ChapterName" name="ChapterName" value={Chapter.ChapterName} onChange={handleAddChapter}></input>
                        </div>
                        <div className="InputDiv">
                        <label>Chapter Content:</label>
                        <CKEditor
                                editor={ ClassicEditor }
                                data={Chapter.ChapterContent}
                                
                                config={{
                                    ckfinder:{
                                        uploadUrl:'/upload'
                                    },
                                mediaEmbed: {
                                previewsInData: true}}}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setChapter({...Chapter,ChapterContent:data})
                            } }
                        
                        />
                        </div>
                        <input type ="submit" value={buttonChapter} onClick={addChapter}/>
                    </div>    
                    
                </div>   
            </div>
        </div>
                    <Link className="courseInfo" to={`/SeeCourse/${IdCourse}`}> <input className="SubmitCourse" type="submit"  value="Add Module"onClick={()=>{handleConfim()}} /></Link> 
    

    </div>

    )
}

export default AddModule
