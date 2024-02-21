const mongoose = require("mongoose")
const {DateTime} = require("luxon")

const Schema = mongoose.Schema

const messageSchema = new Schema ({
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, maxLength: 30, minLength: 5, required: true},
    message: {type: String, maxLength: 100, minLength: 3, required: true},
    datetime: {type: Date, default: Date.now}
})

messageSchema.virtual("date_formatted").get(function () {
    return DateTime.fromJSDate(this.datetime).toLocaleString(DateTime.DATETIME_MED)
})


module.exports = mongoose.model("Message", messageSchema)