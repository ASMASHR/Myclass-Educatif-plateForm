
import React,{ useState} from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {edit_email} from '../../js/Actions/StudentAction'

function EditEmail() {
  const dispatch = useDispatch()
  var url = window.location.pathname;

var id = url.substring(url.lastIndexOf('/') + 1);
  const [formData, setFormData] = useState({
    currentEmail: "",
    NewEmail:"",
    confirmmail: ""
  });
  const handleFormChange = (e) =>setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleConfim = () => {
    dispatch( edit_email(id,formData))
    alert("Your email has been changed")
  };
 
    return (
         <div class="wrapper fadeInDown" >
            <div id="formContent">
                <div class="fadeIn first">
                  <h5 style={{marginTop:"1vw"}}>Edit your Email</h5>
                </div>
                <form>
                  <input type="text" id="currentEmail"  class="fadeIn second" name="currentEmail" placeholder="your current Email" onChange={handleFormChange}/>
                  <input type="text" id="NewEmail" class="fadeIn third" name="NewEmail" placeholder="your New Email" onChange={handleFormChange}/>
                  <input type="text" id="confirmmail" class="fadeIn third" name="confirmmail" placeholder="confirm your email" onChange={handleFormChange}/>
                  <Link to="/Dashboard"><input type="reset"  value="Cancel"/></Link>
                  <Link to="/"><input type="submit"  value="Save Changes"onClick={handleConfim} /></Link>
                  
                </form>
    
            </div>
        </div>
    )
}




export default EditEmail

