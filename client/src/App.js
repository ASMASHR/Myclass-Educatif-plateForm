import './App.css';
import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {BrowserRouter, Switch, Route }from 'react-router-dom'

import {gethauthUser} from './js/Actions/AuthAction'
import { get_all_courses } from './js/Actions/CoursesAction';
import { get_all_students} from './js/Actions/StudentAction';
import {get_All_Messages } from './js/Actions/MessagesAction';

import AppNavbar from './Components/Home/NavBar/AppNavbar';
import Home from './Components/Home/HomePage'
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Footer from './Components/Home/Footer/Footer';
import ChangePassword from './Components/Home/NewPassword/ChangePassword'
import CourseDescription from './Components/CoursesPage/CourseDescription/CourseDescription'
import CoursesPage from './Components/CoursesPage/CoursesContainer/CoursesPage'
import FullCourse from './Components/CoursesPage/FullCourseContainer/FullCourse';

import StudentRoute from './Components/Routes/StudentRoute';
import AdminRoute from './Components/Routes/AdminRoute';

import Dashboard from './Components/UserPages/Dashboard'
import EditPicture from './Components/UserPages/EditPicture';
import EditName from './Components/UserPages/EditName';
import EditPassword from './Components/UserPages/EditPassword'
import EditEmail from './Components/UserPages/EditEmail';

import DashboardAdmin from './Components/AdminPages/Dashboard_Admin/DashboardAdmin'
import AllCoursesAdmin from './Components/AdminPages/Courses/Affiche_Courses/AllCoursesAdmin'
import AddCourse from './Components/AdminPages/Courses/Add_Course/AddCourse';
import AdminCourseV from './Components/AdminPages/Courses/Affiche_Courses/AdminCourseV'
import PageCoursesAdmin from './Components/AdminPages/Courses/Affiche_Courses/PageCoursesAdmin'
import PageUsersAdmin from './Components/AdminPages/Students/PageUsersAdmin'
import EditCoursePic from './Components/AdminPages/Courses/Edit_Course/EditCoursePic'
import EditCourseName from './Components/AdminPages/Courses/Edit_Course/EditCourseName'
import EditCourseDesc from './Components/AdminPages/Courses/Edit_Course/EditCourseDesc'
import EditCourseGoals from './Components/AdminPages/Courses/Edit_Course/EditCourseGoals'
import EditCoursePrer from './Components/AdminPages/Courses/Edit_Course/EditCoursePrer';
import EditCourseTools from './Components/AdminPages/Courses/Edit_Course/EditCourseTools';
import EditCourseIntro from './Components/AdminPages/Courses/Edit_Course/EditCourseIntro';
import EditModuleName from './Components/AdminPages/Courses/Edit_Course/EditModuleName';
import AddChapter from './Components/AdminPages/Courses/Edit_Course/AddChapter';
import ReadChapter from './Components/AdminPages/Courses/Edit_Course/ReadChapter'
import EditChapter from './Components/AdminPages/Courses/Edit_Course/EditChapter';
import AddModule from './Components/AdminPages/Courses/Edit_Course/AddModule';
import AddQuiz from './Components/AdminPages/Courses/Edit_Course/AddQuiz';
import ContactUs from './Components/Home/Contact/ContactUs';

function App() {
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(gethauthUser())
    dispatch(get_all_courses())
    dispatch(get_all_students())
    dispatch(get_All_Messages())
    
  },[])
    
  let Allmsg=useSelector(state => state.MessagesReducer.Messages.allMsg)
  const Allcourses=useSelector(state => state.CoursesReducer.Courses)
  const Allstudents = useSelector(state => state.StudentReducer.Students)
  const user = useSelector(state =>state.authReducer.user)

  return (
    <BrowserRouter>
    <div className="App">
    <AppNavbar/>
    
    <Switch>
        <Route exact path="/" render ={()=><Home Allcourses={Allcourses}  user={user}/>}/>
        <Route exact path="/AllCourses" render ={()=><CoursesPage Allcourses={Allcourses} user={user} />}/>
        <Route  path="/Login" component={Login}/>
        <Route exact path="/Register" component={Register}/>
        <Route path="/CourseDescription" render ={()=><CourseDescription Allcourses={Allcourses}/>} /> 
        <Route path="/SetNewPass" render ={()=><ChangePassword />} /> 
        <Route path="/ContactUs" render={()=><ContactUs/>}/>
      
        <StudentRoute  path="/Dashboard" render ={()=><Dashboard  /> } />
        <StudentRoute path="/EditStudentPic" render ={()=><EditPicture /> }/>
        <StudentRoute path="/EditStudentName" render ={()=><EditName /> }/>
        <StudentRoute path="/EditStudentPassword" render ={()=><EditPassword/> }/>
        <StudentRoute path="/EditEmail" render ={()=><EditEmail/> }/>
        <StudentRoute path="/fullCourse" render ={()=><FullCourse Allcourses={Allcourses}/>}/>
        
        <AdminRoute path="/DashboardAdmin" render ={()=><DashboardAdmin Allmsg={Allmsg} Allcourses={Allcourses}  students={Allstudents}/>} />}/>
        <AdminRoute path="/AddCourse" render ={()=><AddCourse />}/>
        <AdminRoute path="/ALLCOURSESAdmin" render ={()=><AllCoursesAdmin Courses={Allcourses} />}/>
        <AdminRoute path="/AddCourse" render ={()=><AddCourse />}/>
        <AdminRoute path="/Courses" render={()=><PageCoursesAdmin Courses={Allcourses}/>}/>
        <AdminRoute path="/users" render={()=><PageUsersAdmin Courses={Allcourses} students={Allstudents}/>}/>
        <AdminRoute path="/SeeCourse" render={()=><AdminCourseV Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCoursePic" render={()=><EditCoursePic/>}/>
        <AdminRoute path="/EditCourseName" render={()=><EditCourseName  Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCourseDesc" render={()=><EditCourseDesc  Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCourseGoals" render={()=><EditCourseGoals  Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCoursePrer" render={()=><EditCoursePrer  Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCourseTools" render={()=><EditCourseTools Courses={Allcourses}/>}/>
        <AdminRoute path="/EditIntro" render={()=><EditCourseIntro Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCourse/:idCourse/:idMod/editModuleName" render={()=><EditModuleName Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCourse/:idCourse/:idMod/AddChapter" render={()=><AddChapter  Courses={Allcourses}/>}/>
        <AdminRoute path="/:idCourse/:idMod/ReadChapter/:idChap" render={()=><ReadChapter  Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCourse/:idCourse/:idMod/EditChapter/:idChap" render={()=><EditChapter Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCourse/:idCourse/:idMod/AddQuiz" render={()=><AddQuiz Courses={Allcourses}/>}/>
        <AdminRoute path="/EditCourse/:IdCourse/AddModule" render={()=><AddModule Courses={Allcourses}/>}/>
      </Switch>
      <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
