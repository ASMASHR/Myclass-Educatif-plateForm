import axios from "axios"
import {LOGIN,LOGOUT,REGISTER,GET_AUTH_USER,AUTHERROR,SETLOADING } from './ActionType'

// ------------------------Register-----------------------
export const register=(formData)=>async(dispatch)=>{
    dispatch(setLoading())
    try {
        const res= await axios.post('/api/auth/Register',formData)
       dispatch({
           type:REGISTER,
        payload:res.data}) 
    } 
    catch (error) {
        console.dir(error)
            const errorsArray = error.response.data.errors
            const msg = error.response.data.msg            
            if(Array.isArray(errorsArray)){
             errorsArray.forEach(el=>alert(el.msg))
         }
         if(msg)
         {alert(msg)}
            dispatch({
             type : AUTHERROR
         })
         }
    } 
// -----------------------Login---------------------------
export const login=(FormData)=>async(dispatch)=>{
     dispatch(setLoading())
    try {
        const res= await axios.post('/api/auth/Login',FormData)
       dispatch({
           type:LOGIN,
        payload:res.data}) 
        
    } 
    catch (error) { 
        console.log(error)
}}
// -------------------GetAuthStudent---------------------
export const gethauthUser=()=>async(dispatch)=>{
    dispatch(setLoading())
    try {
        const option = {
            headers :{
               authorization : localStorage.getItem("token") 
            }
        }
    const res= await axios.get('/api/auth/Dashboard',option)
    dispatch({
        type:GET_AUTH_USER,
        payload:res.data})  
    } catch (error) { 
        console.dir(error)
        const errorsArray = error.response.data.errors
        const msg = error.response.data.msg
        if(Array.isArray(errorsArray)){
            errorsArray.forEach(el=>alert(el.msg))
        }
        if(msg)
        {
            alert(msg)
        }
        }
}

// ----------------Logout --------------------------------
export const logout=()=>async(dispatch)=>{
    try {
        dispatch({
        type:LOGOUT
    }) 
    } catch (error) {
        console.dir(error)   
    }
}

// setLoading
    const setLoading = () => dispatch => {
        dispatch({
            type :  SETLOADING
        })
    }
