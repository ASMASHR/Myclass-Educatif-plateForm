import axios from 'axios'
import {GET_All_MESSAGES} from './ActionType'





  //----------------------------- get  /AllMessages
export const get_All_Messages=()=>async(dispatch)=>{
    try { 
        // 
        let res=await axios.get(`/api/messages/AllMessages`)
        dispatch({type:GET_All_MESSAGES,payload:res.data})
    } 
    catch (error) { console.log(error)
    }
}

//-----------------------------Send a message
export const send_message=(ContactForm)=>(dispatch)=>{
try {
   axios.post('api/messages/SendMessage',ContactForm)
    dispatch(get_All_Messages())

} catch (error) { console.log(error)
         }}

         //-----------------------------read message
        export const read_message=(messageId)=>(dispatch)=>{
            try {
            axios.put(`api/messages/ReadMessage/${messageId}`)
                dispatch(get_All_Messages())
                

            } catch (error) { console.log(error)
         }}
         
    // --------------------send message to trash
        export const send_message_Trash=(messageId)=>(dispatch)=>{
try {
    axios.put(`api/messages/SendToTrash/${messageId}`)
    dispatch(get_All_Messages())

} catch (error) { console.log(error)
         }}


// /DeleteMessage
   export const Delete_message=(messageId)=>(dispatch)=>{
try {
    axios.put(`api/messages/DeleteMessage/${messageId}`)
    dispatch(get_All_Messages())

} catch (error) { console.log(error)
         }}
// Answer message admiin
 export const Answer_message=(Name,useremail,MessageText,ResponseTxt)=>(dispatch)=>{


    try {
    axios.post("api/messages/AnswerMessage",{Name,useremail,MessageText,ResponseTxt})
    dispatch(get_All_Messages())

} 
catch (error) { console.log(error)
        }}