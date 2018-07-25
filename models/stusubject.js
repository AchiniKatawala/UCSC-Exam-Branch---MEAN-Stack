const mongoose = require('mongoose');

const StuSubjectSchema = mongoose.Schema({
    stusub_code:{
        type: String,
        require: true
    },
    stusub_name:{
        type: String,
        require: true
    },
    stusub_year:{
        type: String,
        require: true
    },
    stusub_sem:{
        type: String,
        require: true        
    }
});

const StuSubject = module.exports = mongoose.model('StuSubject', StuSubjectSchema);