import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { send_message } from '../../../js/Actions/MessagesAction';
import { useHistory } from 'react-router-dom';
import './ContactUs.css'
function ContactUs() {
    const history=useHistory()
    const dispatch = useDispatch(); 
    const [ContactForm, setContactForm] = useState({
    Name: "",
    useremail: "",
    MessageTxt:""
});
const handleFormChange = (e) =>setContactForm({ ...ContactForm, [e.target.name]: e.target.value });
const sendMsg=()=>{
    if((ContactForm.Name=="")||(ContactForm.useremail=="")||(ContactForm.MessageTxt==""))
    alert("please send us available informations that we can contact you after")
    else
    {dispatch(send_message(ContactForm))
    alert("thank you for your message, we wiil respond you as soon as possible")
    history.push('/')
}}
    return (
        <div className='ContactUsContainer'>
        <div className="form-group">
        <label htmlFor="Name" >User Name: </label>
        <input type="text" className="form-control" name="Name" onChange={handleFormChange}/>
    </div>
    <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" name="useremail" onChange={handleFormChange}/>
    </div>
    <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5" name="MessageTxt" onChange={handleFormChange}></textarea>
    </div>
    <input className="SubmitCourse" type="submit"  value="send the message"onClick={()=>{sendMsg()}} />
    
    {/* {/* <button className="btn btn-primary" >Submit</button> */}
        </div>
    )
}

export default ContactUs
