const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type: String, maxLength: 20, minLength: 3, required: true},
    password: {type: String, required: true, minLength: 3},
    membership: {type: String, enum: ["user", "member", "admin"], required: true, default: "user"}
})

userSchema.virtual("url").get(function () {
    return `/forum/user/${this._id}`
})

module.exports = mongoose.model("User", userSchema)