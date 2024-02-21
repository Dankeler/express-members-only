const asyncHandler = require("express-async-handler")
const {body, validationResult} = require("express-validator")

const User = require("../models/user_model")
const Message = require("../models/message_model")


exports.message_get = asyncHandler(async (req, res, next) => {
    const [allMessages, user] = await Promise.all([
        Message.find({}).sort({datetime: -1}).populate("author").exec(),
        User.findById(req.params.id).exec()
    ])

    res.render("message-board", {
        title: "Message Board",
        messages: allMessages,
        user: user
    })
})

// GET FORM
exports.message_form_get = asyncHandler(async (req, res, next) => {
    res.render("message_form")
})

// POST FORM
exports.message_form_post = [
    body("title", "Title must be between 3 and 30 characters")
    .trim()
    .isLength({min: 3, max: 20})
    .escape(),
    body("message", "Message must be between 3 and 100 characters")
    .trim()
    .isLength({min: 3, max: 15})
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        const message = new Message({
            author: req.currentUser,
            message: req.body.message,
            title: req.body.title,
            datetime: new Date()
        })

        if (!errors.isEmpty()) {
            res.render("message_form", {title: req.body.title, message: req.body.message})
        } else {
            await message.save()
            res.redirect("/messageboard")
        }
    })
]

exports.message_delete_post = asyncHandler(async (req, res, next) => {
    await Message.findByIdAndDelete(req.body.messageId)
    res.redirect("/messageboard")
})