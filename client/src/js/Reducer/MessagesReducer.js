import { GET_UNREADED_MESSAGES,GET_All_MESSAGES } from "../Actions/ActionType";

const initialState={
    Messages:[],
    isOpened:false
}
 const MessagesReducer=(state=initialState, action)=>{
    switch (action.type) {
        case GET_UNREADED_MESSAGES:
            return {...state,Messages:action.payload}
            // GET_All_MESSAGES
               case GET_All_MESSAGES:
            return {...state,Messages:action.payload}
        default:
            return state
    }
}
export default MessagesReducer