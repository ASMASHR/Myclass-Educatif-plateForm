
import React,{ useState} from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {edit_password} from '../../js/Actions/StudentAction'

function EditPassword() {
  const dispatch = useDispatch()
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);

    const [formData, setFormData] = useState({
    currentPassword: "",
    NewPass:"",
    confirmPass: ""
  });

  const handleFormChange = (e) =>setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleConfim = () => {
    dispatch( edit_password(id,formData))
    alert("your password has been changed")
  };
 
    return (
        <div class="wrapper fadeInDown" >
            <div id="formContent">
                <div class="fadeIn first">
                  <h5 style={{marginTop:"1vw"}}>Edit your Password</h5>
                </div>
                <form>
                  <input type="password" id="currentPassword"  class="fadeIn second" name="currentPassword" placeholder="your current Password" onChange={handleFormChange}/>
                  <input type="password" id="NewPass" class="fadeIn third" name="NewPass" placeholder="your New Password" onChange={handleFormChange}/>
                  <input type="password" id="confirmPass" class="fadeIn third" name="confirmPass" placeholder="confirm your Password" onChange={handleFormChange}/>
                  <Link to="/Dashboard"><input type="reset"  value="Cancel"/></Link>
                  <Link to="/"><input type="submit"  value="Save Changes"onClick={handleConfim} /></Link>
                  
                </form>
    
            </div>
        </div>
    )
}

export default EditPassword

