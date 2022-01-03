import React,{useState } from 'react'
import {useDispatch} from 'react-redux'
import Allmessages from './Allmessages'
import './DashboardAdmin.css'
import ReadMessage from './messagesContainer/ReadMessage'
function DashboardAdmin({Allmsg}) {
    let [theMessage,settheMessage]=useState([])
    let [searchContent,setsearchContent]=useState("")
let [Reading,setReading]=useState(false)
let [AllMessages,setAllMessages]=useState(true)
let [Unreaded,setUnreaded]=useState(false)
let [DeletedMessages,setDeletedMessages]=useState(false)
let AllmsgFunction=()=>{
    setReading(false)
    setUnreaded(false)
    setDeletedMessages(false)
    setAllMessages(true)

}
let UnreadedmsgFunction=()=>{
    setReading(false)
    setUnreaded(true)
    setDeletedMessages(false)
    setAllMessages(false)
}
 let TrashmsgFunction=()=>{
    setReading(false)
    setDeletedMessages(true)
    setUnreaded(false)
    setAllMessages(false)
}

    console.log("Allmsg",)
    return (
        <div className="dashContainer">
            <div className='MessagesDiv'>
                <div className='MessagesDivButton'>
                    <button className='MsgButtons' onClick={AllmsgFunction}>All Messages</button>
                    <button className='MsgButtons'onClick={UnreadedmsgFunction}> unreaded Messages</button>
                    <button className='MsgButtons'onClick={TrashmsgFunction}>Trashs</button>
                </div>
                {!Reading?
                <div className='MessagesDivColumn'>
                                <div className='SearchBarDash'>
                                <input type="text" placeholder='search message' className='SearchAdmin' onChange={(e)=>setsearchContent(e.target.value)}></input></div>

                        <Allmessages searchContent={searchContent} Allmsg={Allmsg} Unreaded={Unreaded} DeletedMessages={DeletedMessages} AllMessages={AllMessages} theMessage={theMessage} settheMessage={settheMessage} setReading={setReading}/>
                       
                </div>:
                <ReadMessage theMessage={theMessage} setReading={setReading}/>}
            </div>
        </div>
    )
}

export default DashboardAdmin
