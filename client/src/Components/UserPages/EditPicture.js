
import React,{ useState,useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import {edit_picture,get_student} from '../../js/Actions/StudentAction'
var FormData = require('form-data');
function EditPicture(props) {
  var url = window.location.pathname;

var id = url.substring(url.lastIndexOf('/') + 1);
    const [img, setImg] = useState("")
     const dispatch = useDispatch()
       useEffect(()=>{
     dispatch(get_student(id))
   },[])
  
  const handleConfim = (e) => {

     let Newpic = new FormData();
   Newpic.append('photo', img[0]);

    dispatch(edit_picture(id,Newpic))
    alert("Please refresh the page to see your new pic!")
    
console.log(Newpic)
  };
    return (
        <div class="wrapper fadeInDown" >
            <div id="formContent">
                <div class="fadeIn first">
                  <h5 style={{marginTop:"1vw"}}>Edit your picture</h5>
                </div>
                <form enctype="multipart/form-data">
                  <input type="file"  id="NewPix"  class="fadeIn second inputFile" onChange={(e)=>setImg(e.target.files)}/>
                  <Link to="/Dashboard"><input type="reset"  class="fadeIn third" value="Cancel"/></Link>
                  <input type="submit"  value="Save Changes" class="fadeIn third" onClick={handleConfim} />
                  
                </form>
    
            </div>
              
        </div>
    )
}

export default EditPicture

// function Login(props) {
//   const dispatch = useDispatch();
    // return (
    //     <div class="wrapper fadeInDown" >
    //         <div id="formContent">
    //          {/* <!-- Tabs Titles --> */}
    //         {/* <!-- Icon --> */}
    //             <div class="fadeIn first">
    //                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png" id="icon" alt="User Icon" />
    //             </div>
    //             {/* <!-- Login Form --> */}
    //             <form>
    //               <input id="login" type="email" class="fadeIn second" name="email" placeholder="Enter your Email..."onChange={handleFormChange}/>
    //               <input type="text" id="password" class="fadeIn third" name="password" type="password" placeholder="Enter your password..." onChange={handleFormChange}/>
    //                 {/* name="login" */}
    //               <div><Link to="/"><input type="submit"  value="Log In"onClick={handleConfim} /></Link></div>
    //               <div><Link to="/"><input type="reset"  value="Cancel"/></Link></div>
    //             </form>
