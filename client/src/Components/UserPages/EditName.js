
import React,{ useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {get_student,edit_name} from '../../js/Actions/StudentAction'

function EditName(props) {
  const dispatch = useDispatch()
  var url = window.location.pathname;
  var id = url.substring(url.lastIndexOf('/') + 1);
    const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
  });
  const handleFormChange = (e) =>setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleConfim = () => {
    dispatch( edit_name(id,formData))
    alert("Please refresh the page!")
  };
    return (
      <div class="wrapper fadeInDown" >
            <div id="formContent">
                <div class="fadeIn first">
                  <h5 style={{marginTop:"1vw"}}>Edit your Name</h5>
                </div>
                <form>
                  <input id="FirstName" type="text" class="fadeIn second" name="FirstName" placeholder="your First Name" onChange={handleFormChange}/>
                  <input type="text" id="LastName" class="fadeIn third" name="LastName" placeholder="your Last Name" onChange={handleFormChange}/>
                  <Link to="/Dashboard"><input type="reset"  value="Cancel"/></Link>
                  <Link to="/"><input type="submit"  value="Save Changes"onClick={handleConfim} /></Link>
                  
                </form>
    
            </div>
        </div>
    )
}
          

export default EditName

