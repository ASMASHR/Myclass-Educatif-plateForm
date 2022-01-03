import React,{ useEffect } from 'react'
import {useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout} from "../../../js/Actions/AuthAction";
import { useSelector} from "react-redux";
import {NavDropdown} from 'react-bootstrap'
import { get_all_students,get_student } from "../../../js/Actions/StudentAction";
import './AppNavbar.css'
function AppNavbar() {  
const isAuth = useSelector(state => state.authReducer.isAuth);
const role = useSelector(state => state.authReducer.role)
const user = useSelector(state => state.authReducer.user)

    const dispatch = useDispatch();
    useEffect(()=>{
    dispatch(get_all_students())

   },[])

const LogOut=()=>{
 dispatch(logout())
}
if(user)
dispatch(get_student(user._id))

  return (
    <div>
          <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Aclonica&family=Berkshire+Swash&display=swap" rel="stylesheet"></link>
            </head>
      <nav className="homeNav">
        <Link to="/" className="brand">MyClAsS</Link>
        <div className="userNav">

          {((isAuth===true)&&(role==="Student") )? (<div>
            {/* <div className="NavRegister">
            
            
            </div> */}
            <div className="accountDropDown">

               <i class="fas fa-user"></i>
               <NavDropdown title={user.firstName} id="collasible-nav-dropdown" style={{backgroundColor:"#022247"}}>
                  
                  <NavDropdown.Item><Link to="/Dashboard">My Dashboard</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link to="/ContactUs">Contact Us</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item style={{backgroundColor:"#022247"}}><Link to="/" onClick={LogOut}>LogOut</Link></NavDropdown.Item>
               
                </NavDropdown>
          </div>
          </div>
        
          ) :((isAuth===true)&&(role==="Administrator") )? 
            (<div className="AdminNav" >
            <Link to="/DashboardAdmin"className="nav-item"> Dashboard</Link>
            <Link to="/Courses"className="nav-item"> Courses</Link>
            <Link to="/Users"className="nav-item"> Users</Link>
            
            <Link to="/" onClick={LogOut} className="nav-item">Logout</Link>
          </div>)
          :(<div className="NavRegister">
            
            <Link to="/ContactUs" className="nav-item">Contact Us</Link>
            <Link to="/Register"className="nav-item"> Register</Link>
            <Link to="/Login"className="nav-item">Login</Link>
          </div>
          )}
        </div>
      </nav>
      

      </div>
  )};



export default AppNavbar