
var express = require('express');
var Courseroute = express.Router();
const Course = require('../Models/Course')

var adminAuth = require('../middelware/adminAuth')
var isAuth= require('../middelware/isAuth')
const {uploadImage}=require("../middelware/validator");


// GET COURSES
Courseroute.get('/AllCourses', async(req, res) => {
try {
  let courses=await Course.find()
  res.status(200).send({msg : "courses" , courses})
} catch (error) {
  res.status(500).send({error: 'Could not get courses '})
}

});


// GET SINGLE COURSE
Courseroute.get('/Course/:_id', async(req, res) => {
  let {_id} = req.params;
try {
  let course=await Course.findById({_id})
  res.status(200).send({msg : "course exist" , course})
} catch (error) {
  res.status(500).send({error: 'Could not get course '})
}

});



//give Note to course
Courseroute.put('/EditCourse/rating/:_id', async(req, res) => {
  let {_id}=req.params
  let {StudentId,Studentrating}=req.body
  try {

    let course = await Course.findById({_id})
    let follower=course.Followers.find(el=>el.FollowerId==StudentId)

  follower.ratingScore=Studentrating
  course.save()
res.status(200).send({msg : "course rating updated" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update course rating '})
  }

});

// EDIT COURSE Rating
Courseroute.put('/EditCourse/Editrate/:_id', async(req, res) => {
  let {_id}=req.params
  try {
    
    let SomeRate=0
    let nbPerRate=0
    let course = await Course.findById({_id})
  for(let i = 0;i<course.Followers.length; i++) {
    if(course.Followers[i].ratingScore!==0)  
        {SomeRate += course.Followers[i].ratingScore;
        nbPerRate++}
        console.log("SomeRate",SomeRate)
        console.log("persobn",nbPerRate)

  }
  let courseRate=SomeRate/(nbPerRate)
  course.Rating=courseRate
course.save() 

res.status(200).send({msg : "course rating updated" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update course rating '})
  }

});



// CREATE COURSE -- SECURITY 
Courseroute.post('/AddCourse'  ,isAuth,adminAuth, async(req, res) => {
let {CourseName,CourseDescription,MoreInfo,courseImg,Duration,DificultieLevel,LearningGoals,Prerequisites,ToolRequired,Categorie,ModuleF}=req.body

try
{var course = await new Course({CourseName,CourseDescription,MoreInfo,courseImg,Duration,LearningGoals,Prerequisites,ToolRequired,DificultieLevel,Categorie});
for(let i=0;i<ModuleF.length;i++)
{course.Modules.push(ModuleF[i])
}
 course.save()
 res.status(200).send({msg : "course added" , course})
}
catch(error){
  res.status(500).send({error: 'Could not create course '})
}
});

//// delete the course   adminAuth
Courseroute.delete('/DeleteCourse/:_id',isAuth,adminAuth, async(req, res) => {
  let {_id}=req.params
try {
    const course = await Course.findByIdAndDelete({_id})
course.save()
res.status(200).send({msg : "course Deleted" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not Delete course '})
  }
})


// -------------------Edit Course ------------------------
// Change the course Img ,isAuth,adminAuth
Courseroute.put('/EditCourseImg/:_id',uploadImage,(req, res) => {
  let {_id}=req.params
  let CourseNewImg=req.file
  var newImg = CourseNewImg.path.substring(CourseNewImg.path.lastIndexOf('\\') + 1);
Course.findByIdAndUpdate(_id,{ courseImg:newImg,},{new:true})
 .then (course=>res.send({"we update": course}))
    .catch(err=>{console.log(err)})
    })


    // change the course Name, duration and difficultie level 
Courseroute.put('/EditCourseName/:_id',isAuth,adminAuth, async(req, res) => {
  let {_id}=req.params
  let {CourseNewName,CourseNewDuration,CourseNewDLevel}=req.body
  try {
    const course = await Course.findByIdAndUpdate(_id,{ CourseName:CourseNewName,Duration:CourseNewDuration,DificultieLevel:CourseNewDLevel },{new:true})
course.save()
res.status(200).send({msg : "course Name, duration and difficultie Level updated" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not create course '})
  }

});

   
// change the course Description 
Courseroute.put('/EditCourseDescription/:_id',isAuth,adminAuth, async(req, res) => {
  let {_id}=req.params
  let {CourseNewDesc}=req.body
  try {
    const course = await Course.findByIdAndUpdate(_id,{ CourseDescription:CourseNewDesc},{new:true})
course.save()
res.status(200).send({msg : "course Description updated" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update course description '})
  }

});


// change the course Introduction    
Courseroute.put('/EditCourseIntroduction/:_id',isAuth,adminAuth, async(req, res) => {
  let {_id}=req.params
  let {CourseIntro}=req.body
  try {
    const course = await Course.findByIdAndUpdate(_id,{MoreInfo:CourseIntro},{new:true})
course.save()
res.status(200).send({msg : "course Introduction updated" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update course introduction '})
  }

});


// Change the course goals 

Courseroute.put('/EditCourseGoals/:_id',isAuth,adminAuth, async(req, res) => {
  let {_id}=req.params
  let {CourseNewGoals}=req.body
  try {
    const course = await Course.findByIdAndUpdate(_id,{ LearningGoals:CourseNewGoals},{new:true})
course.save()
res.status(200).send({msg : "course LearningGoals updated" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update course\'s LearningGoals '})
  }

});


// change the course prerequistes 

Courseroute.put('/Editprerequistes/:_id',isAuth,adminAuth, async(req, res) => {
  let {_id}=req.params
  let {Newprerequistes}=req.body
  try {
    const course = await Course.findByIdAndUpdate(_id,{ Prerequisites:Newprerequistes},{new:true})
course.save()
res.status(200).send({msg : "course Prerequisites updated" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update course\'s Prerequisites '})
  }

});

// Change the course required tools 

Courseroute.put('/EditTools/:_id',isAuth,adminAuth, async(req, res) => {
  let {_id}=req.params
  let {NewTools}=req.body
  try {
    const course = await Course.findByIdAndUpdate(_id,{ ToolRequired:NewTools},{new:true})
course.save()
res.status(200).send({msg : "course  Required Tools updated" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update course\'s Required Tools '})
  }

});

// Edit course's module
    // AddModule
Courseroute.put('/EditCourse/:IdCourse/AddModule',isAuth,adminAuth, async(req, res) => {
let {IdCourse}=req.params
  let {ModuleName,Chapters}=req.body
try
{let course = await Course.findOne({_id:IdCourse});
course.Modules.push({ModuleName,Chapters})
 course.save()
 res.status(200).send({msg : "Module added" , course})
}
catch(error){
  res.status(500).send({error: 'Could not edit course '})
}
});


// edit Module Name
Courseroute.put('/:IdCourse/:idModule/EditModuleName',isAuth,adminAuth, async(req, res) => {
  let {IdCourse,idModule}=req.params
  let {NewModName}=req.body
  
  try {
    const course = await Course.findOne({_id:IdCourse})
    const Module=course.Modules.find(el=>el._id==idModule)
    Module.ModuleName=NewModName

course.save()
res.status(200).send({msg : "Module name updated " , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update Module Name '})
  }

});


// add chapter to Module
Courseroute.put('/:IdCourse/:idModule/AddChapter',isAuth,adminAuth, async(req, res) => {
  let {IdCourse,idModule}=req.params
  let {ChapterName,ChapterContent}=req.body
  try {
    const course = await Course.findOne({_id:IdCourse})
    const Module=course.Modules.find(el=>el._id==idModule)
    Module.Chapters.push({ChapterName,ChapterContent})

course.save()
res.status(200).send({msg : "Module name updated " , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update Module Name '})
  }

});


//Edit a chapter
Courseroute.put('/:IdCourse/:idModule/EditChapter/:idChap',isAuth,adminAuth, async(req, res) => {
  let {IdCourse,idModule,idChap}=req.params
  let {NewChapterName,NewChapterContent}=req.body 
  try {
    const course = await Course.findOne({_id:IdCourse})
    const Module=course.Modules.find(el=>el._id==idModule)
    const Chapter=Module.Chapters.find(el=>el._id==idChap)
    Chapter.ChapterName=NewChapterName
Chapter.ChapterContent=NewChapterContent
 course.save()
 res.status(200).send({msg : "Chapter updated " , course})
  } catch (error) {
 res.status(500).send({error: 'Could not update Chapter '})
  }

});


// delete a module isAuth,adminAuth,
Courseroute.put('/EditCourse/:IdCourse/DeleteModule/:IdModule', async(req, res) => {
  let {IdCourse,IdModule}=req.params
try { 
    const course = await Course.findOne({_id:IdCourse})
  course.Modules=  course.Modules.filter(el=>el._id.toString()!==IdModule)
    console.log("newM",course.Modules)

  course.save()
  res.status(200).send({msg : "Module Deleted" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not Delete Module '})
  }
})

// delete a Chapter isAuth,adminAuth,
Courseroute.put('/EditCourse/:IdCourse/EditModule/:IdModule/DeleteChapter/:IdChapter', async(req, res) => {
  let {IdCourse,IdModule,IdChapter}=req.params
try {
  let Moduleindex=0
    const course = await Course.findOne({_id:IdCourse})
while((course.Modules[Moduleindex]._id.toString()!==IdModule)&&(Moduleindex<course.Modules.length))
{Moduleindex++}
if(course.Modules[Moduleindex]._id.toString()===IdModule)
  course.Modules[Moduleindex].Chapters= course.Modules[Moduleindex].Chapters.filter(el=>el._id.toString()!==IdChapter)

 course.save()
 res.status(200).send({msg : "Chapter Deleted" , course})
  } catch (error) {
 res.status(500).send({error: 'Could not Delete Chapter '})
  }
})


// add quizz  to Module 

Courseroute.put('/course/:IdCourse/:IdModule/AddQuiz',isAuth,adminAuth, async(req, res) => {
  let {IdCourse,IdModule}=req.params
  let {TheQuiz}=req.body
  // 1 radio ,
  try {
     const course = await Course.findOne({_id:IdCourse})
    const Module=course.Modules.find(el=>el._id==IdModule)
    Module.Quiz=TheQuiz
    let Mod=Module.ModuleName
 course.save()
 res.status(200).send({msg : "quiz added " ,Mod, TheQuiz})
  } 
  catch (error) {
 res.status(500).send({error: 'Could not add quiz to the course '})
  }

});



module.exports = Courseroute
