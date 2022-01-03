
import React,{ useState} from 'react'
import { useDispatch } from "react-redux";
import { Link,useHistory,useParams } from 'react-router-dom';
import {add_Quiz} from '../../../../js/Actions/CoursesAction'

import './EditCourse.css'
function AddQuiz() {
 const dispatch = useDispatch()
 let history=useHistory()
 let [isFinish,setisFinish]=useState(false)
    let info=useParams()
    let IdCourse=info.idCourse
    let IdModule=info.idMod
   const [theQuiz,setTheQuiz]=useState([]) 
   const [Question, setQuestion] = useState({
  QuestionType:0,
  TheQuestion:"",
  QResponse:[]//SingleRep db
  
  });

  let [SingleRep,setSingleRep]=useState({
ResponseText:"",
    isCorrect:false
  })


  console.log("res",SingleRep)
  let [buttonResonse,setbuttonResonse]=useState("Add the Answer")
  let [buttonQuestion,setbuttonQuestion]=useState("Add This Question")

  const AddQuestion=()=>{
    setTheQuiz([...theQuiz,Question])
    setQuestion({
  QuestionType:0,
  TheQuestion:"",
  QResponse:[]})
       setSingleRep({ResponseText:""})
        console.log("object",SingleRep)
setbuttonQuestion("add One Other question")
setbuttonResonse("add respnse")
  }
  const handleAddResponse = (e) =>setSingleRep({ ...SingleRep, [e.target.name]: e.target.value });

   const addResponse=()=>{
   if(SingleRep.ResponseText==="")
         {alert("you should add the response")}
     else
     {
        setQuestion({...Question,...Question.QResponse.push(SingleRep)})
        setSingleRep({ResponseText:""})
        setbuttonResonse("Add one Other Response")
}
  }


    const handleFormChange = (e) =>{
    setQuestion({ ...Question, [e.target.name]: e.target.value });}
    const handleConfim = () => {
    dispatch( add_Quiz(IdCourse,IdModule,theQuiz))
    history.push(`/SeeCourse/${IdCourse}`)
  };
  console.log("quiz",theQuiz)
  const Addcomplet=()=>{
    setisFinish(true)
  }
    return (
          <div className='QuizzContainer'>
            <div className='QuizzAdding'>
                  <div className='QuestionsDiv'>
                    
                    <div className='thQuestionText'>
                      <span>Question :</span>
                      <input className='questionInput'value={Question.TheQuestion} type="text" name="TheQuestion" placeholder='Add Question'  onChange={handleFormChange}/>
                    </div>
                    <div className='QuestionType'> 
                      <div className='QuestionTypeChoice'> 
                        <input type="radio" name="QuestionType" value={1} onChange={handleFormChange}  />
                        <span  className="radio-span" > Single Answer Question </span> 
                      </div>
                      <div className='QuestionTypeChoice'> 
                        <input type="radio" name="QuestionType" value={2} onChange={handleFormChange} />
                        <span  className="radio-span" > Multiple Choice Question </span>
                      </div> 
                        
                    </div>   
                    <div className='respnsesContainer'>
                      <div>
                      <div className='thresponseText' >
                        <span>Response:</span>
                        <input className='responseInput' type="text" name="ResponseText" value={SingleRep.ResponseText} placeholder='Add Answer'  onChange={handleAddResponse}/>
                        <input class="button-5" type="button" value={buttonResonse} onClick={addResponse}/>
                      </div>
                      <div className='QuestionType'>
                        <div className='QuestionTypeChoice'>
                          <input type="radio" name="isCorrect" value={true} onChange={handleAddResponse}  />
                          <span  className="radio-span" > true </span> 
                        </div>
                        <div> 
                          <input type="radio" name="isCorrect" value={false} onChange={handleAddResponse} />
                          <span  className="radio-span"> false </span> 
                        </div>
                        </div>
                      </div>
                        {/* <button  onClick={addResponse}>{}</button> */}
                      
                        
                    </div>    
                    <div className='buttonAdd'>
                    <input type ="button" class="button-62" value={buttonQuestion} onClick={AddQuestion}/>
                    </div>
                    </div>
                 
            </div>
            {!isFinish?<div className='finishAddingDIV'>
                <button className='finishAdding' onClick={Addcomplet}>I finish adding Quiz</button>
            </div>:
                
            <div className='QuizReading'>
                  <div>
                    
                      <h4>verify the quiz before adding it </h4>   
                       {theQuiz.length==0?<div></div>:
                          <ol> 
                            {theQuiz.map(el=><li>
                            <form id={theQuiz.indexOf(el)}> 
                                <h7 className="QuizQuestions" style={{margin:"7px 2px 7px 0px",fontSize:"18px",padding:"1vw"}}>{el.TheQuestion}
                                </h7>
                            {el.QuestionType==="1"?
                    (<div>{el.QResponse.map(resp=>
                          <div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px"}}>
                              <label for={resp._id} >
                                  <input type="radio" name="resp" 
                                  value={resp._id} id={resp._id} 
                                  style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} 
                                  /> 
                                  {resp.ResponseText}
                              </label>
                          </div>)}
                      </div>): 
                      (<div>
                        {el.QResponse.map(resp=>
                      <div className={resp._id} style={{margin:"2px",height:"3vw"}}>
                          <label for={resp._id} >
                              <input type="checkbox" id={resp._id}value={resp._id} style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} />
                              {resp.ResponseText}
                          </label> 
                          </div>)}

                      </div>)}
                      </form>
                      </li>
            
            )} 
                          </ol> 
                          
                      }
                  </div>
                  <div className='addCancelDiv'>
                        <Link to={`/SeeCourse/${IdCourse}`}><input type="reset"  class="button-84" value="Cancel"/></Link>
                        <Link className="courseInfo" to={`/SeeCourse/${IdCourse}`}>
                          <input type="button"  class="button-79" value="Save Changes"onClick={handleConfim} /></Link>
                  </div>
            </div>
            }  
</div>
    )
}
          

export default AddQuiz