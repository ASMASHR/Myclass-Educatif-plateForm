 import React from 'react'
import {useSelector} from 'react-redux'
import {Redirect,Route} from "react-router-dom"

function StudentRoute({component:Component,student, setstudent,...rest}) {

const isAuth = useSelector(state => state.authReducer.isAuth) 
const role = useSelector(state => state.authReducer.role)
   if ((isAuth===false)&&(role!=="Student")) {
      {return  <Redirect to ="/"/>}
   }
   return (
        <div>
         <Route component={Component} {...rest} />
        </div>
    )
}

export default StudentRoute

