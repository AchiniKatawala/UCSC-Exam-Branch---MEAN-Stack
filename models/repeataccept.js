const mongoose = require('mongoose');

const RepeatacceptSchema = mongoose.Schema({
    sreg:{
        type: String,
        require: true
    },
    scode:{
        type: String,
        require: true
    }
});

const Repeataccept = module.exports = mongoose.model('Repeataccept', RepeatacceptSchema);