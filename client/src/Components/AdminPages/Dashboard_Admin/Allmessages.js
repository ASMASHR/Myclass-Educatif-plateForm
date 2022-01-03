import React from 'react'
import MessageCard from './messagesContainer/MessageCard'
function Allmessages({searchContent,Allmsg, Unreaded, DeletedMessages,AllMessages,settheMessage,setReading}) {
    if(AllMessages)
    {Allmsg=Allmsg.filter(el=>el.isDeleted!==true)}
    if(searchContent.length>0)
    {Allmsg=Allmsg.filter(el=>el.userName.toUpperCase().includes(searchContent.toUpperCase()))}
    if(Unreaded)
    {  Allmsg=Allmsg.filter(el=>el.isOpened==false)}
if(DeletedMessages)
 {  Allmsg=Allmsg.filter(el=>el.isDeleted==true)}
 
    return (
        <div>
             {Allmsg.map(mss=><MessageCard message={mss} settheMessage={settheMessage} setReading={setReading}/>)}
        </div>
    )
}

export default Allmessages
