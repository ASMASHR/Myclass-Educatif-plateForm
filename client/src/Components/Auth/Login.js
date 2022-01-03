import React,{ useState,useEffect } from 'react'
import './login.css'
import { useDispatch,useSelector } from "react-redux";
import { Link,useHistory } from "react-router-dom";
import { login } from "../../js/Actions/AuthAction";
function Login() {

let history=useHistory()
let dispatch = useDispatch();
let idCourse=null
let cr =useSelector(state=>state.CoursesReducer.Course) ;
if(cr!==null)
  idCourse=cr.course._id
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) =>setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleConfim = () => {
    dispatch(login(formData))
    if(idCourse!==null)
     return history.push(`/CourseDescription/${idCourse}`)
    else 
    return history.push("/")

  };
    return (
        <div class="wrapper fadeInDown" >
            <div id="formContent">
                <div class="fadeIn first">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png" id="icon" alt="User Icon" />
                </div>
                {/* <!-- Login Form --> */}
                <form>
                  <input id="login" type="email" class="fadeIn second" name="email" placeholder="Enter your Email..."onChange={handleFormChange}/>
                  <input type="text" id="password" class="fadeIn third" name="password" type="password" placeholder="Enter your password..." onChange={handleFormChange}/>
                  <div class="underlineHover" class="fadeIn fourth">
                    <Link style={{marginBottom:"1vw",marginTop:"1vw"}} to="SetNewPass">Forgot your Password?</Link>
                  </div>
                  <Link to="/"><input class="fadeIn fifth" type="reset"  value="Cancel"/></Link>
                  <input type="submit" class="fadeIn fifth" value="Log In"onClick={handleConfim} />
                </form>
                <div id="formFooter">
                  <p className="Registred text-right">you are not member yet? <Link class="underlineHover" to="/Register">Register Now</Link></p>
                </div>
                
              </div>
        </div>
    )
}

export default Login