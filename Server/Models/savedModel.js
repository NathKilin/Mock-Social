const mongoose =require("mongoose")

const savedSchema = new mongoose.Schema({
    userId:{
        required: true,
    },
    postId:{
        require: true,
    }
})

module.exports = mongoose.model("Saved" , savedSchema);