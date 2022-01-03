import React ,{ useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link,useParams } from 'react-router-dom';
import {saveQuiz,saveLevel,Retake_Quiz} from '../../../../js/Actions/StudentAction'
import './ModuleQuiz.css'
function ModuleQuiz({Mycourse,courseContent,CoursId,studentId, module,setnMod,nMod,setnCh,nCh}) {
    let theQuiz=module.Quiz 
console.log("progersscr",nCh)
    let UserQuiz=Mycourse.Progress.QuizResult.find(el=>el.ModuleId==module._id)
    console.log("UserQuiz",UserQuiz)
    let [ShowScore,setShowScore]=useState(false)
    let [Info,setInfo]=useState(false)
    let [retake,setRetake]=useState(false)
    let [Propositionretake,setPropositionretake]=useState(false)
    let [QuizScore,setQuizScore]=useState(0)
    let sommeRep=0
    let score=0
    let correctAnswers=0
    let NbQuestionsWithoutResponse=0
    let ModuleId=module._id
    const dispatch = useDispatch()
    // verify Quiz And Show Answers
    const verifyQuiz=()=>{
        // get the checked radio input 
        for(let i=0;i<theQuiz.length;i++)
            {
                if(theQuiz[i].QuestionType==1)
                    {
                        for(let j=0;j<theQuiz[i].QResponse.length;j++)
                        {
                            if(document.getElementById(theQuiz[i].QResponse[j]._id).checked==true)
                                theQuiz[i].QResponse[j].isChosed=true  
                        }          
                    }
            }
        // verify if the user Answer All the Questions
        for (let i=0;i<theQuiz.length;i++)
            {   
                let nbIsChosed=0 
                for(let j=0;j<theQuiz[i].QResponse.length;j++)
                    {
                        if(theQuiz[i].QResponse[j].isChosed==true)
                            nbIsChosed++
                    }
                if(nbIsChosed==0)
                    {
                        NbQuestionsWithoutResponse++
                    }
        }
        if(NbQuestionsWithoutResponse!==0)
            alert("you Should Answer all the Questions")
    // if the user answer all the questions =>Show Answers ,calcul score an show info about correction colors
        else
        { setInfo(true)
            setRetake(false)
            for(let i=0;i<theQuiz.length;i++)
            { 
                for(let j=0;j<theQuiz[i].QResponse.length;j++)
                    {  //disabled the input button and show the answers
                        document.getElementById(theQuiz[i].QResponse[j]._id).disabled = true
                        if((theQuiz[i].QResponse[j].isChosed==true)&&(theQuiz[i].QResponse[j].isCorrect==true)) //correct answer 
                            {
                                let d = document.getElementsByClassName(theQuiz[i].QResponse[j]._id) // get all elements
                                        for(let x=0;x<d.length;x++)   
                                            d[x].style.backgroundColor = "lightgreen"  //true "#71D17E"
                            }
                        if((theQuiz[i].QResponse[j].isChosed==false)&&(theQuiz[i].QResponse[j].isCorrect==true))  //true but missing answer
                            {
                                let d = document.getElementsByClassName(theQuiz[i].QResponse[j]._id) // get all elements
                                        for(let x=0;x<d.length;x++)   
                                            d[x].style.backgroundColor = "yellow"  
                        }
                        
                        if((theQuiz[i].QResponse[j].isChosed==true)&&(theQuiz[i].QResponse[j].isCorrect==false))//wrong answer  
                            {
                                let d = document.getElementsByClassName(theQuiz[i].QResponse[j]._id) // get all elements
                                        for(let x=0;x<d.length;x++)   
                                            d[x].style.backgroundColor = "#FFB5B5"   //true "#71D17E"
                        }
                    }
                }
        CalculeScore()
        setShowScore(true)
        dispatch(saveQuiz(studentId,CoursId,ModuleId,theQuiz,score))
}   
    }
// Calculate Score
    let CalculeScore=()=>{

        for (let i=0;i<theQuiz.length;i++)
        {// get all the rigth answers
        for(let j=0;j<theQuiz[i].QResponse.length;j++)
            {
                if(theQuiz[i].QResponse[j].isCorrect==true)
                sommeRep++
            }
            // get the Student rigth answers
            for(let j=0;j<theQuiz[i].QResponse.length;j++)
            {  
            if((theQuiz[i].QResponse[j].isChosed==true)&&(theQuiz[i].QResponse[j].isCorrect==true))
            {correctAnswers=correctAnswers+1}
        }}
        score=Math.round(100*(correctAnswers/sommeRep))
        setQuizScore(score)
        if (score<70)
        setPropositionretake(true)
        }
// ---------------------Next Module
const toTheNext=()=>{
    let userId=studentId
dispatch(saveLevel(userId,{CourseId:CoursId,ModLevel:nMod,ChapLevel:nCh}))   
    setnMod(nMod+1)
 setnCh(0)       
 }
 const NextModule=()=>{ 
    setnMod(nMod+1)
 setnCh(0)       
 }
//  retake the Quiz
let RetakeQuiz=()=>{
    dispatch(Retake_Quiz(studentId,CoursId,ModuleId))
     UserQuiz=[]
    setRetake(true)
    setInfo(false)
}

   return (<div>
      {
      (ShowScore)?
      (QuizScore>70)?
                    (<div className='CorrectQuiz'>Congratulations ! you have successfully passed this Quiz</div>):
                
                <div className='retakeQuiz'>
                    <div className='retakeQuizInfo'>
                        <h4>Your Score is under Than 70% !</h4>
                        <p>if you Want, you will be able to retake this quiz in 24h.</p> 
                    </div>
                </div>
            :<div></div>
            }
           {(UserQuiz||Info)?(
       <div className='infoColorDIV'>
                    <div className="infoColorCol">
                        <div className='rightAnswerAndChecked'></div>
                        <h4>right Answer</h4>
                    </div>

                    <div className="infoColorCol">
                        <div className='rightAnswerAndNotChecked'></div>
                        <h4>Missing Answer</h4>
                    </div>
                    <div className="infoColorCol">
                        <div className='wrongAnswer'></div>
                        <h4>Wrong Answer</h4>
                    </div>
            </div>)
            :(<div></div>)}

        {(retake||!UserQuiz)?
        <div>
        <ol> 
        {theQuiz.map(el=><li>
        <form id={theQuiz.indexOf(el)}> 
            <h7 className="QuizQuestions" style={{margin:"7px 2px 7px 0px",fontSize:"18px",padding:"1vw"}}>{el.TheQuestion}
            </h7>
        {el.QuestionType===1?
        (<div>{el.QResponse.map(resp=>
            <div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px"}}>
                <label for={resp._id} >
                    <input type="radio" name="resp" 
                    id={resp._id}                  
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
                <input type="checkbox" id={resp._id} onChange={()=>resp.isChosed=!resp.isChosed} style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} />
                {resp.ResponseText}
            </label> 
            </div>)}

        </div>)}
        </form>
        </li>
        
        )} 
        </ol>
          <div className='buttonQuiz'>
{ShowScore?
<div className='score-to-next'> 
                <div className='ScoreDiv' >
                    <span className='scorespan'>your score is : </span>
                    <h2 className='QuizScoreH'>{QuizScore}% </h2>
                </div> 
                {!retake?
                <button onClick={toTheNext} className='buttonNextModule'> next module</button>
            :<button onClick={NextModule} className='buttonNextModule'> next module</button>}
            </div>:
            <div>
                <button className='buttonNextModule' onClick={verifyQuiz}>Verify Answers</button>
            </div>
             } 
        </div>
        </div>

        : 
        <div>
            
                {(UserQuiz.QuizScore>70)?
                    (<div className='CorrectQuiz'>Congratulations ! you have successfully passed this Quiz</div>):
                !Propositionretake?
               ( <div className='retakeQuiz'>
                    <div className='retakeQuizInfo'>
                    <p>You can retake this quiz now.</p>
                    <p>If you fail, you will be able to retake this quiz in 24h.</p> 
                    <p>Check your answers carefully.</p>
                </div>
                <button className='retakeQuizButton' onClick={RetakeQuiz}>TAKE THIS QUIZ AGAIN</button>
            </div>)
            :<div></div>
            }
                <ol> 
            {UserQuiz.theQuiz.map(el=><li>
            <form id={UserQuiz.theQuiz.indexOf(el)}> 
                <h7 className="QuizQuestions" style={{margin:"7px 2px 7px 0px",fontSize:"18px",padding:"1vw"}}>{el.TheQuestion}
                </h7>
                {el.QuestionType===1?
                (<div>
                    {el.QResponse.map(resp=>
                    <div>
                        {
                        ((resp.isCorrect==true)&&(resp.isChosed==true))?
                            <div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px", backgroundColor:"lightgreen"}}>
                    
                            <label for={resp._id} >
                                <input type="radio" name="resp"  
                                value={resp._id} id={resp._id}
                                style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} 
                                disabled
                                checked/> 
                                {resp.ResponseText}
                                
                            </label>
                        </div>
                        :
                        ((resp.isCorrect==true)&&(resp.isChosed==false))?
                        (<div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px",backgroundColor:"yellow"}}>
                        <label for={resp._id} >
                                <input type="radio" name="resp"  
                                value={resp._id} id={resp._id} 
                                style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} 
                                disabled/> 
                                {console.log("input id",resp._id)}
                                {resp.ResponseText}
                                
                            </label>
                        </div>):
                        ((resp.isCorrect==false)&&(resp.isChosed==true))?
                        (<div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px",backgroundColor:"#FFB5B5" }}>
                        <label for={resp._id} >
                            <input type="radio" name="resp"  
                                value={resp._id} id={resp._id} 
                                style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} 
                                disabled
                                checked/> 
                                {resp.ResponseText}
                                
                        </label>
                        </div>)
                        :
                        (<div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px",backgroundColor:"white"}}>
                        <label for={resp._id} >
                                <input type="radio" name="resp"  
                                value={resp._id} id={resp._id} 
                                style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} 
                                disabled/> 
                                
                                {resp.ResponseText}
                                
                            </label>
                        </div>)

                        }
                </div>)}
                </div>): 
                (<div>
                    {el.QResponse.map(resp=>
                    <div>
                        {
                        ((resp.isCorrect==true)&&(resp.isChosed==true))?
                            <div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px", backgroundColor:"lightgreen"}}>
                    
                            <label for={resp._id} >
                                <input type="checkbox" id={resp._id} value={resp._id} style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} checked disabled/> 
                                
                                {resp.ResponseText}
                                
                            </label>
                        </div>
                        :
                        ((resp.isCorrect==true)&&(resp.isChosed==false))?
                        (<div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px",backgroundColor:"yellow"}}>
                        <label for={resp._id} >
                                <input type="checkbox" id={resp._id} value={resp._id} style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} disabled/>{console.log("input id",resp._id)}
                                {resp.ResponseText}
                                
                            </label>
                        </div>):
                        ((resp.isCorrect==false)&&(resp.isChosed==true))?
                        (<div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px",backgroundColor:"#FFB5B5" }}>
                        <label for={resp._id} >
                                <input type="checkbox" id={resp._id} value={resp._id} style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} checked disabled/>
                            
                                {resp.ResponseText}
                                
                            </label>
                        </div>)
                        :
                        (<div className={resp._id} style={{margin:"2px",height:"3vw",padding:"5px",backgroundColor:"white"}}>
                        <label for={resp._id} >
                                <input type="checkbox" id={resp._id} value={resp._id} style={{height:"14px",width:"14px",margin:"4px 7px 4px 4px"}} disabled/> 
                                {resp.ResponseText}
                                
                            </label>
                        </div>)

                        }
                    
                    </div>)}

                </div>)}
            </form>
            </li>
            
            )} 
                </ol>
                <div className='buttonQuiz'>
                    <div className='ScoreDiv' >
                        <span className='scorespan'>your score is : </span>
                        <h2 className='QuizScoreH'>{UserQuiz.QuizScore}%</h2>
                    </div>
                    <button onClick={NextModule} className='buttonNextModule'> next module</button>
                </div>

            </div>
            } 
         </div>)
}
export default ModuleQuiz
