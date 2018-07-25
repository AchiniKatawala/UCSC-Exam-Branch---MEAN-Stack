const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

const StudentSchema = mongoose.Schema({
    reg_number:{
        type: String,
        require: true
    },
    full_name:{
        type: String,
        require: true
    },
    index_number:{
        type: String,
        require: true
    },
    year:{
        type: String,
        require: true        
    },
    age:{
        type: String,
        require: true
    },
    gender:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    tel:{
        type: String,
        require: true
    },
    pass:{
        type: String,
        require: true
    },
    cpass:{
        type: String,
        require: true
    },
    stype:{
        type: String,
        require: true
    },
    sid:{
        type: String,
        require: true
    },
    usertype:{
        type: String,
        require: true
    }

});

// StudentSchema.statics.hashpassword = function hashpassword(pass,cpass){
//     return bcrypt.hashSync(pass,10);
//     return bcrypt.hashSync(cpass,10);
// }

// StudentSchema.methods.isValid = function(hashedpassword){
//     return bcrypt.compareSync(hashedpassword, this.cpass);
//     return bcrypt.compareSync(hashedpassword, this.cpass);
// }

const Student = module.exports = mongoose.model('Student', StudentSchema);

// module.exports.getUserByID = function(id, callback){
//     Student.findById(id, callback);
// }

// module.exports.getUserByRegnumber = function(reg_number, callback){
//     console.log("Hello");
//     const query = {reg_number: reg_number}
//     Student.findOne(query, callback);
// }

// module.exports.save = function(newStudent, callback){
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newStudent.pass, salt, (err, hash) =>{
//             if(err){ throw err };
//             newStudent.pass = hash;
//             newStudent.save(callback);
//         });
//     });

// }

// module.exports.comparePassword = function(candidatePassword, hash, callback) {
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//         if(err) throw err;
//         callback(null, isMatch);
//     });
// }

module.exports.saveUser = function (newuser,callback){

    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newuser.pass, salt, function(err, hash) {
        
        newuser.pass = hash;
        if (err) throw err;
        
        newuser.save(callback);
        
    });
});

};

module.exports.findByRegnumber = function (reg_number,callback) {

    const query ={reg_number:reg_number};
    Student.findOne(query,callback);
    
};

module.exports.passwordCheck = function (plainpassword,hash,callback) {

    bcrypt.compare(plainpassword, hash, function(err, res) {
        //   if(err) throw err;
          if(res){
              callback(null,res);
          }
        else{
            callback(null,false);
        }
          
    });

    
};

module.exports.findUserbyId = function(id,callback){
 
            Student.findOne(id,callback);
}
