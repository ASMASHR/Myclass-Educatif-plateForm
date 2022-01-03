import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {Link, useHistory} from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { set_Rating } from '../../../js/Actions/CoursesAction';
import './LastPage.css'
function LastPage({Mycourse,courseContent,student,setnMod,setnCh}) {
    let history=useHistory()
    let CourseId=Mycourse._id
    let StudentId=student._id
    let ss=courseContent.Followers.find(el=>el.FollowerId===StudentId)
    console.log("bb",ss)
    
const dispatch = useDispatch()
let [Studentrating, setStudentrating]=useState(0)
const [open,setOpen]=useState(false)
const ratingChanged = (newRating) => {
    console.log(newRating);
    setStudentrating(newRating)
}; 
//  const verify=()=>{
//      if(ss)
//     {
// setOpen(true)
//     }
//  }
console.log("ccc",CourseId)

console.log("sss",StudentId)
console.log("rrr",Studentrating)
const saveR =()=>{
        dispatch(set_Rating(CourseId,StudentId,Studentrating))
        setOpen(true)
    }
    return (
       
            
            <div className='rateContainer'>
             <div class="card-body text-center"> <img id='imgcongr' src="https://img.icons8.com/bubbles/200/000000/trophy.png"></img>
             <h4>CONGRATULATIONS!</h4>
                 <p className='coourseP'>you have completed this course</p> 
            
            <div className='Cousecompleted'>
                
                
            
                {!open?
                <div>
                <h4 className='rateH4'>We would love to know what you think about this course!</h4>
                {/* <button onClick={verify}></button> */}
                <div className='givRate'>
                    <ReactStars isHalf={true} count={5} size={40} onChange={ratingChanged} activeColor="#ffd700"/>
                    <button className='buttonRate' onClick={saveR}>Save your Rating</button>
                </div>
                </div>:
                <div className='rateafter'>thank you for your rating!
                
            </div>}
            <div className='buttDiv'>
                <button className='buttoncl' onClick={()=>{setnMod(0);setnCh(0)}}>go to the first page</button>
            <button className='buttoncl'onClick={()=>{
                history.push("/")
            }}>go to home</button>
            </div>
            
            </div> 
        </div>
        </div>
    )
}

export default LastPage
