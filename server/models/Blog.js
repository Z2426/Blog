const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0, 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        default:'All'
        
      },
    
},{
    timestamps: true,
})

module.exports = mongoose.model('Blog', BlogSchema);

