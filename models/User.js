const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: [true, 'Please fill your first name'],
        trim: true,
        maxlength: [25, 'Maximum 25 character long']
    },
    last_name:{
        type: String,
        required: [true, 'Please fill your last name'],
        trim: true,
        maxlength: [25, 'Maximum 25 character long']
    },
    email:{
        type: String,
        required: [true, 'Please fill a valid email'],
        trim: true,
        lowercase: true,
        unique: true,
        maxlength: [100, 'Email too long'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone:{
        type: String,
        required: [true, 'Please fill your phone number'],
        minlength: [8, 'Phone numbers are between 8-12 numbers'],
        match: [/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/, 'Please fill a valid phone numbers']
    }, 
    email:{
        type: String,
        required: [true, 'Please fill a valid address'],
        trim: true,
    }

})

module.exports = mongoose.model.User || mongoose.model('User', UserSchema);