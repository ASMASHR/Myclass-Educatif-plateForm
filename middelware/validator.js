const { body,validationResult } = require('express-validator');
const multer=require('multer')
const multerConfig=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./client/public');},
     filename:(req,file,callback)=>{
         const ext=file.mimetype.split('/')[1]
         callback(null,`image-${Date.now()}.${ext}`)  
    }
})
const isImage=(req,file,callback)=>{
    if(file.mimetype.startsWith('image')){callback(null,true)}
    else{callback(new Error('Only Image is Allowed'))}
}
const uploadim=multer({
    storage:multerConfig,
    fileFilter:isImage
})
uploadImage=uploadim.single('photo')


const registerRules=()=>[
    body('firstName','firstname  is required and must be string').notEmpty(),
    body('lastName','lastname  is required and must be string').notEmpty(),
    body('age','age  is required and must be nuber').notEmpty(),
    body('gender','gender  is required').notEmpty(),
    body('email','it should be an email').isEmail(),
    body('password','password is required and must contain at least 6 caracters').isLength({min:6, max:12} )
    ]

const loginRules=()=>
   [ body('email','it should be an email').isEmail(),
    body('password','password is wrong').isLength({min:6, max:12})
    ]
const editEmailRules=()=>
[body('currentEmail','the Email should not be empty').notEmpty().isEmail(),
body('NewEmail','the new email should not be empty').notEmpty().isEmail(),
body('confirmmail','the confirm Email should be equal to the new email').notEmpty().isEmail()
]
const editMPRules=()=>
[body('currentPassword','the password should not be empty').notEmpty(),
body('NewPass','the new password should not be empty').notEmpty().isLength({min:6, max:12} ),
body('confirmPass','the confirm Password should not be empty').notEmpty().isLength({min:6, max:12} )
]
const Validator=(req,res,next)=>
 {const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(el=>({msg:el.msg})) });
    }
    next()
}



module.exports={registerRules,loginRules,editMPRules,editEmailRules,Validator,uploadImage}