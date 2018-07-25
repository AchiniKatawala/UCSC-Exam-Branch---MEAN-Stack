const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    sub_code:{
        type: String,
        require: true
    },
    sub_name:{
        type: String,
        require: true
    },
    sub_year:{
        type: String,
        require: true
    },
    sub_sem:{
        type: String,
        require: true        
    },
    sub_examDate:{
        type: String,
        require: true        
    },
    sub_time:{
        type: String,
        require: true        
    },
    sub_etime:{
        type: String,
        require: true        
    },
    sub_venue:{
        type: String,
        require: true        
    },
    sub_type:{
        type: String,
        require: true        
    },
    sub_other:{
        type: String,
        require: true        
    }
});

const Subject = module.exports = mongoose.model('Subject', SubjectSchema);