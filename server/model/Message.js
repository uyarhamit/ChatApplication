const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var messageSchema = new Schema({
    room: String,
    username: String,
    message: String,
    createdDate: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("message", messageSchema);