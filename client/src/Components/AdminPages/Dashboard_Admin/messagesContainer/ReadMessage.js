import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import './ReadMessage.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Answer_message} from '../../../../js/Actions/MessagesAction'
function ReadMessage({theMessage,setReading}) {
     const dispatch = useDispatch()
     let [Reply,setReply]=useState(false)
     let [textResponse,settextResponse]=useState("")
        const SendEmail=()=>{
            let Name=theMessage.userName
            let useremail=theMessage.UserEmail
            let MessageText=theMessage.MessageText
            let ResponseTxt=textResponse
            dispatch(Answer_message(Name,useremail,MessageText,ResponseTxt))
            
        }
    return (
        <div className='ReadingMsgContainer'>
            {/* readFullMessage */}
            <button className='buttonGoBack' onClick={()=>setReading(false)}><i class="fas fa-arrow-left"></i></button>
            <div className='MessageInfo'>
                <div className='FirstRow'>
                <div className='UserInfoDiv'>
                    <h5> {theMessage.userName}</h5>
                    <h6>{theMessage.UserEmail}</h6>
                </div>
                <div className='RecivedDate'>
                <span>{(theMessage.createdAt).substr(0,10)} {(theMessage.createdAt).substr(11,5)}</span>
                </div>
                <button onClick={()=>setReply(!Reply)} className='buttonReply ' ><i class="fa fa-reply" aria-hidden="true"></i></button>
                
                </div>
                <div className='MessageContent'>
                    <p> {theMessage.MessageText}</p>
                </div>
                {Reply?
                <div className='ResponseDiv'>
                    <div  className='MessageToDiv'><span className='MessageSpan'>message to:</span><input type="text" value={theMessage.UserEmail} className='inputDiv'></input>
                    </div>
                    <div>
                    <span className='MessageSpan'>Your Response:</span>
                    <CKEditor
                            editor={ ClassicEditor }
                            data={textResponse}
                            onReady={ editor => {
                            } }
                            config={{

                                ckfinder:{
                                    uploadUrl:'/upload'
                                },
                                 mediaEmbed: {
                                previewsInData: true}}}
                        
                           
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                
                                settextResponse(data)
                    
                            } }
                            
                        />
                        </div>
                        <button onClick={SendEmail} className='buttonSend'>Send Email</button>
                   
                   
                </div>:
                <div></div>}

            </div>
        </div>
    )
}

export default ReadMessage
