var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema=new Schema( {
  QuestionType:Number,
  TheQuestion:String,
  QResponse:[{
    ResponseText:{
      type:String,},
    isCorrect:{type: Boolean,
                required: true,
                default: false},
    isChosed:{type: Boolean,
                required: true,
                default: false},
  }]

})
var ChapterSchema=new Schema({
    ChapterName:{type:String,
    }, 
    ChapterContent:{type:String,},
    isDone:{type:Boolean,
    },
  
  })
  var Module=new Schema({
    ModuleName:{type:String,
    
  },
    Chapters:[ChapterSchema],
    Quiz:[QuestionSchema]
  })
   var Follower=new Schema({
    FollowerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
    ratingScore:Number,
  })
  // [ChapterSchema]
var courseSchema = new Schema({
  CourseName: {type:String,},
  CourseDescription: {type:String,},
  MoreInfo:{type:String,},
  courseImg:{type:String,},
  Duration:{type:String,},
  DificultieLevel:{type:String,},
  LearningGoals:{type:String,},
  Prerequisites:{type:String,},
  ToolRequired:{type:String,},
  Categorie:{type:String,},
  Followers:[Follower],
  Rating:{type:Number,default:0},
  Modules:[Module],
}, { timestamps: true, collection: 'courses' });

module.exports = mongoose.model('Course', courseSchema);




// var mongoose = require("mongoose");

// Get the Schema constructor
// var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
// var ProductSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   },
//   departments: {
//     type: Array,
//     required: true
//   },
//   review: {
//     type: Schema.Types.ObjectId,
//     ref: "Review"
//   }
// });

// Create model from the schema
// var Product = mongoose.model("Product", ProductSchema);

// // Export model
// module.exports = Product;
