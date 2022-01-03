import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import './AddCourse.css'
import {Add_Course} from '../../../../js/Actions/CoursesAction'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function AddCourse() {
    
const dispatch = useDispatch(); 

let [Chapter,setChapter]=useState({
    ChapterName:"",
    ChapterContent:null})
let [module,setModule]=useState({
    ModuleName:"",
    Chapters:[]
})
let [buttonChapter,setbuttonChapter]=useState("Add Chapter")
let [buttonModule,setbuttonModule]=useState("Add Module")

// buttonModule
const [formData, setFormData] = useState({
    CourseName: "",
    CourseDescription: "",
    MoreInfo:"",
    
    courseImg:"",
    Categorie:"",
    Duration:"",
    DificultieLevel:"",
    LearningGoals:"",
    Prerequisites:"",
    ToolRequired:"",
    // ChaptersF:[],
    ModuleF:[]
 
});
const handleFormChange = (e) =>setFormData({ ...formData, [e.target.name]: e.target.value });
const handleModuleChange=(e)=>setModule({ ...module, [e.target.name]: e.target.value })
const handleConfim = () => {
    if((formData.CourseName=="")||(formData.CourseDescription== "")||(formData.MoreInfo=="")||(formData.courseImg=="")||(formData.Categorie=="")||(formData.Duration=="")||(formData.DificultieLevel=="")||(formData.LearningGoals=="")||(formData.Prerequisites=="")||(formData.ToolRequired=="")||(formData.ModuleF.length==0))
    alert("you should fill all the input")
    else
    dispatch(Add_Course(formData))
};
const [ModuleName,setModuleName]=useState("")
const [ChapName,setChapName]=useState("")
const handleAddChapter = (e) =>setChapter({ ...Chapter, [e.target.name]: e.target.value });
const addChapter=()=>{
    if((Chapter.ChapterContent==="")||(Chapter.ChapterName===""))
        {alert("you should add a name and a content for your Chapter")}
    else
    { setModule({...module,...module.Chapters.push(Chapter)})
        setChapter({ChapterName:"",ChapterContent:""})
        setbuttonChapter("Add one Other chapter")
        console.log("cc",Chapter)}
}
const addModule=()=>{

    if((Chapter.ChapterContent==="")||(Chapter.ChapterName===""))
        {alert("you should add an name and a content for your Chapter")}
        else
            {
            setFormData({...formData,...formData.ModuleF.push(module)})
            setModule({
                ModuleName:"",
                Chapters:[]
            }) 
            setChapter({ChapterName:"",ChapterContent:""})
            setbuttonModule("Add one Other Model")
            setbuttonChapter("Add Chapters")
    } 
}  

    return (
            <div className="AddComponent">
                <h3>Add New Course</h3>
                <div className="InputDiv">
                    <label>Course's Name:</label>
                    <input className="AddInput" type="text" placeholder="Course's name" name="CourseName" onChange={handleFormChange}></input> 
                </div>
                <div className="InputDiv">
                    <label>Course's Description:</label>
                    <textarea  rows="8" cols="33" className="AddInput" type="text" placeholder="Course's Description"name="CourseDescription" onChange={handleFormChange}></textarea> 
                </div>
                <div className="InputDiv">
                    <label>Course's Image:</label>
                    <input className="AddInput" type="text" placeholder="Course's Img" name="courseImg" onChange={handleFormChange}></input>
                </div>
                <div className="InputDiv">
                    <label>Categorie:</label>
                    <input className="AddInput" type="text" placeholder="categorie" name="Categorie" onChange={handleFormChange}></input>
                </div>
                <div className="InputDiv">
                    <label>Duration:</label>
                    <input className="AddInput" type="text" placeholder="Duration" name="Duration" onChange={handleFormChange}></input>
                </div>
                <div className="InputDiv">
                    <label>Dificultie Level:</label>
                    <span className="DificultieLevelDiv"> 
                        <input type="radio" name="DificultieLevel" value="Easy" onChange={handleFormChange}  />
                        <span  className="radio-span" > Easy </span> 
                        <input type="radio" name="DificultieLevel" value="Medium" onChange={handleFormChange} />
                        <span  className="radio-span" > Medium </span> 
                        <input type="radio" name="DificultieLevel" value="Hard" onChange={handleFormChange}  />
                        <span  className="radio-span" > Hard </span> 
                    </span>
                </div>
                <div className="InputDiv">
                    <label>More Informations:</label>
                    <CKEditor
                            editor={ ClassicEditor }
                            data={formData.MoreInfo}
                            
                            config={{

                                ckfinder:{
                                    uploadUrl:'/upload'
                                },
                                 mediaEmbed: {
                                previewsInData: true}}}
                        
                           
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                
                                setFormData({...formData,MoreInfo:data})
                    
                            } }
                            
                        />
                   
                </div>
    
                <div className="InputDiv">
                    <label>Learning Goals</label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={formData.LearningGoals} 
                    
                        config={{
                            ckfinder:{
                                uploadUrl:'/upload'
                            },
                                 mediaEmbed: {
                                previewsInData: true}}}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setFormData({...formData,LearningGoals:data})
                
                        } }
                    />

                </div>

                <div className="InputDiv">
                    <label>Prerequisites</label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={formData.Prerequisites}
                        config={{
                            ckfinder:{
                                uploadUrl:'/upload'
                            },
                                 mediaEmbed: {
                                previewsInData: true}}}
                        
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setFormData({...formData,Prerequisites:data})
                
                        } }
                    />
                </div>


                <div className="InputDiv">
                    <label>required tools</label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={formData.ToolRequired}
                        config={{
                            ckfinder:{
                                uploadUrl:'/upload'
                            },
                                 mediaEmbed: {
                                previewsInData: true}}}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                            setFormData({...formData,ToolRequired:data})
                
                        } }
                    />

                </div>
            <div>
            <div className="ModuleDiv">
                <h4 className="ModuleDivTitle">Add Modules to course</h4>
                <div className="AddModules">
               
                    <div className="InputDiv">
                        <label>Module Name:</label> 
                        <input className="AddInput" type="text" placeholder="Module Name" name="ModuleName" value={module.ModuleName} onChange={handleModuleChange}></input>
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
                                    console.log( { event, editor, data } );
                                    setChapter({...Chapter,ChapterContent:data})
                            } }
                        />
                        </div>
                        <input type ="submit" value={buttonChapter} onClick={addChapter}/>
                    </div>    
                    <input type ="submit" value={buttonModule} onClick={addModule}/>
                </div>   
            </div>
        </div>
                    <Link to="/"><input className="SubmitCourse" type="submit"  value="Add Course"onClick={()=>{handleConfim()}} /></Link> 
    

    </div>

    )
}

export default AddCourse
