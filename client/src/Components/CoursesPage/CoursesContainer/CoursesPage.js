import React from 'react'
import CourseCard from '../CourseCard/CourseCard'
import './CoursesPage.css'

function CoursesPage({Allcourses, user,inputsearch,categorie}) {
    if(categorie.length>0)
     {Allcourses=Allcourses.filter((el =>el.Categorie.toUpperCase().includes(categorie.toUpperCase())))
    }
if (inputsearch.length>0)
        {Allcourses=Allcourses.filter((el =>el.CourseName.toUpperCase().includes(inputsearch.toUpperCase())))
    }
    return (
       <div className="CoursesComponent">
            <h2 className='CoursesComponentsName'>MyClass COURSES</h2>
            <div className="CoursesCard">
                {Allcourses.map(el=><CourseCard course={el}  user={user} />)}
            </div>
        
        </div>
    )
}

export default CoursesPage
