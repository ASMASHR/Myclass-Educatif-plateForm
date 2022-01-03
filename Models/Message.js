const mongoose=require('mongoose')

var messagechema=new mongoose.Schema({
    userName:{type:String,
    required:true},
    UserEmail:{type:String,
    required:true},
    MessageText:{type:String,
    required:true},
    isOpened:Boolean,
    isDeleted:Boolean
    
},{ timestamps: true });

module.exports=mongoose.model("messages",messagechema)