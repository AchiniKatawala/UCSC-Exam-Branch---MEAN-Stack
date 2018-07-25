const express = require('express');
const router = express.Router();

const Student = require('../models/student');
const Subject = require('../models/subject');
const StuSubject = require('../models/stusubject');
const Sturepeat = require('../models/sturepeat');
const Repeataccept = require('../models/repeataccept');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Accept = require('../models/repeataccept');
// const flash = require('express-flash-notification');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
 
const app = express();



// router.post('/login', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//       if (err) { return res.status(501).json(err); }
//       if (!user) { return res.status(501).json(info); }
//       req.logIn(user, function(err) {
//         if (err) {return res.status(501).json(err); }
//         return res.status(200).json({message:"Login OK"})
//       });
//     })(req, res, next);
//   });

// let student;

// router.post('/login', (req, res, next)=>{
//     const reg_number = req.body.reg_number;
//     const pass = req.body.pass;
//     // console.log("Data pass");
//     Student.getUserByRegnumber(reg_number, (err, newStudent) => {
//         if(!err) {
//             console.log(newStudent);
//         }
//         else {
//             console.log(err);
//         }
//         if(err) throw err;
//         if(!newStudent){
//             res.json({msg: 'User not found'});
//         }
//         else{
//             res.json({success:true, msg: 'User found'});
//         }
//     });
//     // console.log(this.student);
//     Student.comparePassword(pass, newStudent.pass, (err, isMatch) => {
//         if(err) throw err;
//         if(isMatch){
//           const token = jwt.sign(newStudent, config.secret, {
//             expiresIn: 604800 // 1 week
//           });
  
//           res.json({
//             success: true,
//             token: 'JWT '+token,
//             user: {
//               id: newStudent._id,
//               reg_number: req.body.reg_number,
//               full_name: req.body.full_name,
//                index_number: req.body.index_number,
//                year: req.body.year,
//               age: req.body.age,
//               gender: req.body.gender,
//               email: req.body.email,
//               tel: req.body.tel,
//               stype: req.body.stype,
//               sid: req.body.sid

//             }
//           });
//         } else {
//           return res.json({success: false, msg: 'Wrong password'});
//         }
//       });
// });

router.post("/login",function(req,res){

    const reg_number = req.body.reg_number;
    const pass = req.body.pass;

    Student.findByRegnumber(reg_number,function(err,user){

        if(err) throw err;
        if (!user) {
            res.json({state:false,msg:"User Not found"});
            return false; 
            
        }

        Student.passwordCheck(pass,user.pass,function(err,match){

            if (err) throw err;
            
            if(match){
                const token = jwt.sign(user.toObject(),config.secret,{expiresIn:86400});
                res.json({
                    state:true,
                    token:'bearer ' + token,
                    user : {
                        id:user._id,
                        reg_number: user.reg_number,
                        full_name: user.full_name,
                        index_number: user.index_number,
                        year: user.year, 
                        age: user.age,
                        gender: user.gender,
                        email: user.email,
                        tel: user.tel,
                        stype: user.stype,
                        sid: user.sid,
                        usertype: user.usertype
                    }

                })
                
            }
            if(!match){
                res.json({state:false,msg:"Incorrect Password"});
                return false; 
            }
        });


    });




});

router.get('/stuhome',passport.authenticate('jwt', { session: false }),function(req, res) {
    res.json({user:req.user});
}
);

//retrieving student data

router.get('/students', (req, res, next)=>{
    Student.find(function(err, students){
        res.json(students);
        console.log(students)
    })
});

//add student data

router.post('/student', (req, res, next)=>{
    let newStudent = new Student({
        reg_number: req.body.reg_number,
        full_name: req.body.full_name,
        index_number: req.body.index_number,
        year: req.body.year,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        tel: req.body.tel,
        stype: req.body.stype,
        sid: req.body.sid,
        pass: req.body.pass,
        cpass: req.body.cpass,
        usertype: "user"
    });

    Student.saveUser(newStudent,function(err, student){
        if(err){
            res.json({msg: 'Failed to add new student'});
        }
        else{
            res.json({success:true, msg: 'Successfully added'});
            // res.redirect('/student');
        }
    });
});

//delete student data

router.delete('/student/:id', (req, res, next)=>{
    Student.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});


//retrieving subject data

router.get('/subjects', (req, res, next)=>{
    
    Subject.find(function(err, subjects){
        res.json(subjects);
        console.log(subjects)
    })
});


//add subject 

router.post('/subject', (req, res, next)=>{
    let newSubject = new Subject({
        sub_code: req.body.sub_code,
        sub_name: req.body.sub_name,
        sub_year: req.body.sub_year,
        sub_sem: req.body.sub_sem,
        sub_examDate: req.body.sub_examDate,
        sub_time: req.body.sub_time,
        sub_venue: req.body.sub_venue,
        sub_etime: req.body.sub_etime,
        sub_type: req.body.sub_type,
        sub_other: req.body.sub_other,
    });

    newSubject.save((err, subject)=>{
        if(err){
            res.json({msg: 'Failed to add new subject'});
        }
        else{
            res.json({msg: 'Successfully added'});
        }
    });
});

//delete subject data

router.delete('/subject/:id', (req, res, next)=>{
    Subject.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});


//retrieving stusubject data

router.get('/stusubjects', (req, res, next)=>{
    // const query = { stuID : req.body.stuID };
    StuSubject.find(function(err, stusubjects){
        res.json(stusubjects);
        console.log(stusubjects)
    })
});


//add stusubject 

router.post('/stusubject', (req, res, next)=>{
    // if (req.method !== 'POST') return next();
    // if (!req.body) return next(new Error('no data was sent to the server, please try again'));

    let newstuSubject = new StuSubject({
        // stuID: req.body.stuID,
        stusub_code: req.body.stusub_code,
        stusub_name: req.body.stusub_name,
        stusub_year: req.body.stusub_year,
        stusub_sem: req.body.stusub_sem
    });

    newstuSubject.save((err, stusubject)=>{
        if(err){
            res.json({msg: 'Failed to add new stusubject'});
        }
        else{
            res.json({msg: 'Successfully added'});
        }
    });
});

//delete stusubject data

router.delete('/stusubject/:id', (req, res, next)=>{
    StuSubject.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});


//retrieving sturepeat data

router.get('/sturepeats', (req, res, next)=>{
    Sturepeat.find(function(err, sturepeats){
        res.json(sturepeats);
        console.log(sturepeats)
    })
});


//add sturepeat

router.post('/sturepeat', (req, res, next)=>{
    let newsturepeat = new Sturepeat({
        sturepreg: req.body.sturepreg,
        sturepindex: req.body.sturepindex,
        sturepsub_code: req.body.sturepsub_code,
        sturepsub_name: req.body.sturepsub_name,
        sturepsub_year: req.body.sturepsub_year,
        sturepsub_sem: req.body.sturepsub_sem
    });

    newsturepeat.save((err, sturepeat)=>{
        if(err){
            res.json({msg: 'Failed to add new sturepeat'});
        }
        else{
            res.json({msg: 'Successfully added'});
        }
    });
});

//delete sturepeat data

router.delete('/sturepeat/:id', (req, res, next)=>{
    Sturepeat.remove({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

//retrive accept repeat

router.get('/repeataccepts', (req, res, next)=>{
    Accept.find(function(err, repeataccepts){
        res.json(repeataccepts);
        console.log(repeataccepts)
    })
});

//accept repeat

router.post('/repeataccept', (req, res, next)=>{
    let accept = new Repeataccept({
        sreg: req.body.sreg,
        scode: req.body.scode
    });

    accept.save((err, repeataccept)=>{
        if(err){
            res.json({msg: 'Failed to accept'});
        }
        else{
            res.json({msg: 'Successfully accepted'});
        }
    });
});




module.exports = router;