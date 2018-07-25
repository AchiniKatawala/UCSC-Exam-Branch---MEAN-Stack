const mongoose = require('mongoose');

const SturepeatSchema = mongoose.Schema({
    sturepreg:{
        type: String,
        require: true
    },
    sturepindex:{
        type: String,
        require: true
    },
    sturepsub_code:{
        type: String,
        require: true
    },
    sturepsub_name:{
        type: String,
        require: true
    },
    sturepsub_year:{
        type: String,
        require: true
    },
    sturepsub_sem:{
        type: String,
        require: true        
    }
});

const Sturepeat = module.exports = mongoose.model('Sturepeat', SturepeatSchema);