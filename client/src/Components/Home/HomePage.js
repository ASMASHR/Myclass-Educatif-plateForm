import React,{useState} from 'react'
import { useSelector } from "react-redux"
import CoursesPage from '../CoursesPage/CoursesContainer/CoursesPage'
import Categories from './Categories'
import './Home.css'


function Home({Allcourses,user}) {
const users = useSelector(state => state.StudentReducer.Students)
let [inputsearch,setInputSearch]=useState("")
const courses = useSelector(state => state.CoursesReducer.Courses)
let NBStudents=users.length
let NBCourse=courses.length
let [categorie,setCategorie]=useState("")
    return (
        <div className="home">
            <div className="HomeFirstDiv">
                <span className="siteName">My ClAsS ... </span>
                <p className="logoo">One Site to replace them all</p>
                <div className="searchDiv">
                    <input type="text" className="input-search" onChange={(e)=>setInputSearch(e.target.value)}/>
                    <button>find your course</button>
                </div>
                <div className="siteInfo">
            
                        <div className="StudentsNumb">
                            <i class="fas fa-graduation-cap"></i>
                            <div className="infoDetails">
                                <span>{NBStudents}</span>
                                <p>Active Students</p>
                            </div>
                        </div>
                        <div className="CoursesNumb"><i class="fa fa-book" aria-hidden="true"></i><div className="infoDetails"><span>{NBCourse}</span><p>Courses</p></div></div>
                        <div className="certifsNumb"><i class="fas fa-award"></i><div className="infoDetails"><span>NB</span><p>Professionnal Certicates</p></div></div>


                </div>
        </div>
        {inputsearch.length>0?<div></div>:
        <Categories categorie={categorie} setCategorie={setCategorie}/>}
        <CoursesPage categorie={categorie} user={user} Allcourses={Allcourses} setInputSearch={setInputSearch} inputsearch={inputsearch}/>
        
        </div>
    )
}

export default Home
