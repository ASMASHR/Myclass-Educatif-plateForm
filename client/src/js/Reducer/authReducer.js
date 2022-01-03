import {LOGIN,LOGOUT,REGISTER,GET_AUTH_USER,SETLOADING } from '../Actions/ActionType'

const initialState={
    token: localStorage.getItem("token"),
    isLoading:false,
    user:null,
    isAuth:false,
    role:null,
    msg:null
}

export default function (state =initialState,action){
    switch (action.type) {
        
        case REGISTER:
            localStorage.setItem("token", action.payload.token)
            return {...state, isAuth : true,isLoading : false ,...action.payload}
// ,...istAuth:true ,isAuth:true
        case LOGIN:
            localStorage.setItem("token", action.payload.token)
            return {...state, isAuth : true,isLoading : false,role:action.payload.user.role,...action.payload}
        
        case GET_AUTH_USER:
          return {...state,isAuth:true,role:action.payload.user.role,...action.payload}

        case LOGOUT:
            localStorage.removeItem("token")
            return{ ...state, isAuth:false,user:null,token : null}

    case SETLOADING:
        return{ ...state, isLoading:true}
        
        default:
            return state
    }

}
