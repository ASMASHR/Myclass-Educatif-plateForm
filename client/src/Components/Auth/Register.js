import React, {useState} from 'react'
import { useDispatch,useSelector } from "react-redux";
import {register} from '../../js/Actions/AuthAction'
import './register.css'
import { Link,useHistory } from "react-router-dom";
function Register(props) {
    let dispatch = useDispatch()
    let history=useHistory()
    let cr =useSelector(state=>state.CoursesReducer.Course) ;
let idCourse=null
if(cr!==null)
idCourse=cr.course._id


    const [formData,setformData]=useState({
        firstName:"",lastName:"",email:"", password:"", age:0, gender:""
     })
     const handleFormChange=(e)=>{setformData({...formData,[e.target.name]:e.target.value})}
    const handleConfirm=()=>{
        dispatch(register(formData))
        if(idCourse!==null)
            return history.push(`/CourseDescription/${idCourse}`)
        else 
            return history.push("/")
        }
     return (
    <div class="wrapper fadeInDown" >
        <div id="formContent">
            <div class="fadeIn first">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png" id="icon" alt="User Icon" />
            </div>
            <input  class="fadeIn first" onChange={handleFormChange} type="text" name="firstName" id="" placeholder="Enter Your First Name.." ></input>             
            <input  class="fadeIn second" onChange={handleFormChange} type="text" name="lastName" id="" placeholder="Enter Your Last Name.." ></input>
            <input  class="fadeIn third" onChange={handleFormChange} type="email" name="email" id="" placeholder="Enter Your Email.."></input>
            <input  class="fadeIn fourth" onChange={handleFormChange} type="password" name="password" id="" placeholder="Enter Your password.."></input>   
            <input  class="fadeIn fifth" onChange={handleFormChange} type="text" name="age" id="" placeholder="Enter Your Age.."></input>
            <div class="fadeIn sixth">
                <label className="genderLabel"> 
                    <input type="radio" name="gender"  onChange={handleFormChange} value="male" />
                    <span  className="radio-span" > Male </span> 
                </label>
                <label  className="genderLabel"> 
                    <input type="radio" name="gender" onChange={handleFormChange} value="female"/>
                    <span className="radio-span">Female </span> 
                </label>
            </div>
            
            <Link to="/"><input type="reset" class="fadeIn seventh"  value="Cancel"/></Link>
           <input type="submit" class="fadeIn seventh"  value="Confirm"onClick={()=>{handleConfirm()}} />
            
            <div id="formFooter">
                <p className="Registred text-right">Already registered <Link class="underlineHover" to="/Login">log in?</Link></p>
            </div>
        </div>
        
</div>
)}

export default Register