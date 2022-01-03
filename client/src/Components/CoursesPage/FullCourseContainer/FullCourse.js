import React, {useState}  from 'react'
import { useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import ProgressB from '../../ProgressBar/ProgressB'
 import {saveLevel} from '../../../js/Actions/StudentAction'
import './FullCourse.css'
import LastPage from './LastPage'
import ModuleQuiz from './theQuiz/ModuleQuiz'
function FullCourse({Allcourses}) {
    const history=useHistory()
    let  dispatch = useDispatch()
    let url = window.location.pathname;
    let CoursId = url.substring(url.lastIndexOf('/') + 1);
    
    let student=useSelector(state => state.StudentReducer.Student.Student)
    let courseContent = Allcourses.find((el) =>  el._id == CoursId)
    let Mycourse=student.courses.find(el=>el._id==CoursId)
    let ModL=Mycourse.Progress.ModuleLevel
    let ChapL=Mycourse.Progress.ChapterLevel
    let progressPer=Mycourse.Progress.ProgressPercent
    let [nMod,setnMod]=useState(ModL)
    let [nCh,setnCh]=useState(ChapL) 
    let [next,setNext]=useState(false) //to control going to the next chap
    let [modules,setmodules]=useState(courseContent.Modules)
    let [pos,setpos]=useState(0) //to save the chapter position if we are going to go back using course plan or button right left
    let [completed,setcompleted]=useState(false) //to control the storage in the database; if it's false chapter is not completed yet=> saved in the database
    let [isDisabled,setisDisabled]=useState(true) //to control going right when the chapter in completed
    const ChapterFinish=()=>{
        console.log("position",pos)
          if(nCh===pos)
            {
                
                setcompleted(false)}      

        let LevelChapter=courseContent.Modules[nMod].Chapters.indexOf(courseContent.Modules[nMod].Chapters[nCh])
        let LevelModule=courseContent.Modules.indexOf(courseContent.Modules[nMod])
    if(completed==false)
        Level(LevelChapter,LevelModule)
    }           
// save level in the database
    const Level=(LevelChapter,LevelModule)=>{
        dispatch(saveLevel(student._id,{CourseId:CoursId,ModLevel:LevelModule,ChapLevel:LevelChapter}))
        setNext(true)
    }
let nextchappter=()=>{
      if(nCh<courseContent.Modules[nMod].Chapters.length)
            {  setnCh(nCh+1);
                }
                setNext(false)
}
    const goLeft=()=>{
        if(nCh>0)
            {
                setnCh(nCh-1)
            }
        else
            {   
                setnMod(nMod-1); 
                setnCh(modules[nMod-1].Chapters.length-1)
            }
            setpos(nCh)
            setcompleted(true)
            setNext(true)
            setisDisabled(false)
    }
    const goRight=()=>{
        if(nCh==ChapL-1)
            setisDisabled(true)
        if(nCh<modules[nMod].Chapters.length)
            setnCh(nCh+1)
        else
        {
            setnCh(0)
            setnMod(nMod+1) 
        } 
         setNext(true)
       setcompleted(true)       
    }
   
    const goLeftQuiz=()=>{
        setnCh(modules[nMod-1].Chapters.length)
            setnMod(nMod-1) 
     
    }
    const goRightQuiz=()=>{
        
        setnMod(nMod+1)
            setnCh(0)
    }
    const gohome=()=>{history.push("/")}

    return (
    <div className="FullCourseContainer">
        <div className="goBackhome">
            <button onClick={gohome}><i class="fas fa-home"></i></button>
            <div className="CourseTitle" >
                <h2>{courseContent.CourseName}</h2>
                <div className="DificultieDuration">
                    <div className="dificultieDiv">
                        <i class="fas fa-signal"></i>
                        <p>{courseContent.DificultieLevel}</p>
                    </div>
                    <div className="durationDiv">
                        <i class="fas fa-clock"></i>
                        <p>{courseContent.Duration}</p>
                    </div>                        
                </div>
                <ProgressB progressPer={progressPer}/>
            </div>
        </div>
        <div className="CourseContent">
            <div className="coursePlan">
                <ul className='modules'>
                    {courseContent.Modules.map(el=><li className='modName'>{el.ModuleName}
                        <ul className='chaptersUl'>
                            {el.Chapters.map(chapp=><li className='chappName'> 
                            <button onClick={()=>{
                
                              setpos(nCh) 
                                setNext(true)
                                    setcompleted(true)
                                       setisDisabled(false)
                             if(ModL>courseContent.Modules.indexOf(el)) 
                                {   
                                    
                                    setnMod(courseContent.Modules.indexOf(el))
                                    setnCh(el.Chapters.indexOf(chapp))
                                    
                                }
                            
                            else 
                            if((ModL===courseContent.Modules.indexOf(el)))
                            
                                {setnMod(courseContent.Modules.indexOf(el))
                                setnCh(el.Chapters.indexOf(chapp))
                            }
                            }
                        
                    }
                            
                            >{chapp.ChapterName}</button></li>
                            )}
                            <li className='chappName'><button onClick={()=>{
                                if(ModL>courseContent.Modules.indexOf(el))
                                {setnMod(courseContent.Modules.indexOf(el))
                                 setnCh(el.Chapters.length)}
                            }}>Quiz:{el.ModuleName}</button></li>
                        </ul>
                    </li>)}
                </ul>
            </div>
            
                {(nMod>=(courseContent.Modules.length)&&(nCh==0))?
                
                    (<LastPage Mycourse={Mycourse} courseContent={courseContent} student={student}module={modules[nMod]} setnMod={setnMod} setnCh={setnCh}/>):
                    (
                    <div className="rightSide">
                        <div className="rightSideButton">
                            {((nMod==0)&&(nCh==0))?(<div className='buttonLeftRight'></div>):
                            ((nCh===0)?
                                (<button className='buttonLeftRight' onClick={goLeftQuiz}>
                                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                                    <span>Quiz: {modules[nMod-1].ModuleName}</span></button>)
                                : (<button className='buttonLeftRight' onClick={goLeft}><i class="fa fa-angle-left" aria-hidden="true"></i><span>{modules[nMod].Chapters[nCh-1].ChapterName}</span></button>)
                        )}
                         {/* gooo right */}
                         {((nMod===courseContent.Modules.length-1)&&(nCh===modules[nMod].Chapters.length))?(<div className='buttonLeftRight'></div>):
                         ((nCh==modules[nMod].Chapters.length-1)?
                         (<button className='buttonLeftRight' onClick={goRight} disabled={isDisabled}>
                              <span>Quiz {modules[nMod].ModuleName}</span> 
                              <i class="fa fa-angle-right" aria-hidden="true"></i>
                              </button>)
                         :
                         (nCh<modules[nMod].Chapters.length-1)?
                          (<button className='buttonLeftRight' onClick={goRight} disabled={isDisabled}>
                              <span>{modules[nMod].Chapters[nCh+1].ChapterName}</span> 
                              <i class="fa fa-angle-right" aria-hidden="true"></i>
                              </button>):
                          (<button className='buttonLeftRight' onClick={goRightQuiz} disabled={isDisabled}>
                              <span>{modules[nMod+1].Chapters[0].ChapterName}</span>
                              <i class="fa fa-angle-right" aria-hidden="true"></i></button>)
                        // <span>{modules[nMod+1].Chapters[0].ChapterName}</span>
                     )}
                    </div> 
                    {nCh===modules[nMod].Chapters.length? 
                        // (((Mycourse.Progress.QuizResult.length!==0)&&(Mycourse.Progress.QuizResult.map(el=>el.IdModule==modules[nMod]._id)!==null))?
                        // <ModuleQuizAnswers Mycourse={Mycourse} courseContent={courseContent} studentId={student._id}CoursId={CoursId} module={modules[nMod]} setnMod={setnMod} nMod={nMod} setnCh={setnCh} nCh={nCh}/>:
                        <ModuleQuiz Mycourse={Mycourse} courseContent={courseContent} studentId={student._id}CoursId={CoursId} module={modules[nMod]} setnMod={setnMod} nMod={nMod} setnCh={setnCh} nCh={nCh}/>
                        // )
                        :
                    <div className="theContent">
                        <h5 className='Chaptername'>{modules[nMod].Chapters[nCh].ChapterName}</h5>
                        <p className='Chaptercontent' dangerouslySetInnerHTML={{__html:modules[nMod].Chapters[nCh].ChapterContent}}></p>
                       {next==false? <button className="buttonNextChapter" onClick={ChapterFinish}>I finish this chapter</button>
                       : <button onClick={nextchappter} className="buttonNextChapter">TO THE NEXT CHAPTER</button>
                    }</div>}
                       <div className="rightSideButton">
                            {((nMod==0)&&(nCh==0))?(<div className='buttonLeftRight'></div>):
                            ((nCh===0)?
                                (<button className='buttonLeftRight' onClick={goLeftQuiz}>
                                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                                    <span>Quiz: {modules[nMod-1].ModuleName}</span></button>)
                                : (<button className='buttonLeftRight' onClick={goLeft}><i class="fa fa-angle-left" aria-hidden="true"></i><span>{modules[nMod].Chapters[nCh-1].ChapterName}</span></button>)
                        )}
                         {/* gooo right */}
                         {((nMod===courseContent.Modules.length-1)&&(nCh===modules[nMod].Chapters.length))?(<div className='buttonLeftRight'></div>):
                         ((nCh==modules[nMod].Chapters.length-1)?
                         (<button className='buttonLeftRight' onClick={goRight} disabled={isDisabled}>
                              <span>Quiz {modules[nMod].ModuleName}</span> 
                              <i class="fa fa-angle-right" aria-hidden="true"></i>
                              </button>)
                         :
                         (nCh<modules[nMod].Chapters.length-1)?
                          (<button className='buttonLeftRight' onClick={goRight} disabled={isDisabled}>
                              <span>{modules[nMod].Chapters[nCh+1].ChapterName}</span> 
                              <i class="fa fa-angle-right" aria-hidden="true"></i>
                              </button>):
                          (<button className='buttonLeftRight' onClick={goRightQuiz} disabled={isDisabled}>
                              <span>{modules[nMod+1].Chapters[0].ChapterName}</span>
                              <i class="fa fa-angle-right" aria-hidden="true"></i></button>)
                        // <span>{modules[nMod+1].Chapters[0].ChapterName}</span>
                     )}
                    </div> 
                </div>
                )}
        </div>
        
    </div>
)}

export default FullCourse
