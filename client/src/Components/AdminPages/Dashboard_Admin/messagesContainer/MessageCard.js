import React from 'react'
import {useDispatch} from 'react-redux'
import {read_message, send_message_Trash,Delete_message} from '../../../../js/Actions/MessagesAction'
import './MessagesContainer.css'
function MessageCard({message, settheMessage,setReading}) {
     const dispatch = useDispatch()
    let messageId=message._id
     const readMsg=()=>{
         settheMessage(message)
         setReading(true)
         dispatch(read_message(messageId))
     }
    let OnlyreadMsg=()=>{
         settheMessage(message)
         setReading(true)
     }
     const SendToTrash=()=>{
        if(message.isDeleted==false)
          dispatch(send_message_Trash(messageId))
          else
        dispatch(Delete_message(messageId))
  
   
     }
    return (
        <div>
        {!message.isOpened?(
            <div className='UnreadedmsgContainer'>
                <div className='UnreadedMsg'>
                <div className='MessageCard'>
                    {/* <Link to=""{`/readFullMessage/${message._id}`} */}
                    <button onClick={readMsg}>
                        <div className='msgcol'>
                            <h4 className='UnreadedUserNameDiv'>{message.userName}</h4> 
                            <p className='UnreadedMsgDiv'>{(message.MessageText).split(" ", 5).join(' ')}...</p>
                            <h6 className='UnreadedreceivedDiv'>{(message.createdAt).substr(0,10)} {(message.createdAt).substr(11,5)}</h6>
                        </div>
                        </button>
                    </div>
                    <button onClick={SendToTrash} className='buttoncol'><i class="fa fa-trash" aria-hidden="true"></i> </button> 
                </div>
            </div>):
        (   <div className='readedmsgContainer'>
                <div className='readedMsg'>
                <div className='MessageCard'>
                    {/* {`/readFullMessage/${message._id}`} */}
                <button onClick={OnlyreadMsg}>
                    <div className='msgcol'>
                        <h4 className='ReadedUserNameDiv'>{message.userName}</h4> 
                        <p className='readedMsgDiv'>{(message.MessageText).split(" ", 5).join(' ')}...</p>
                        <h6 className='readedreceivedDiv'>{(message.createdAt).substr(0,10)} {(message.createdAt).substr(11,5)}</h6>
                    </div>
                    </button>
                </div>
                <button onClick={SendToTrash} className='buttoncol'><i class="fa fa-trash" aria-hidden="true"></i> </button> 
            
                </div>
            </div>)
        }
        </div>
    )
}

export default MessageCard