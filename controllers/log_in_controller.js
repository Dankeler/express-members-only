const asyncHandler = require("express-async-handler")
const {body, validationResult} = require("express-validator")

const passport = require("passport")
const User = require("../models/user_model")

exports.log_in_get = asyncHandler(async (req, res, next) => {
    res.render("log_in_form")
})

exports.log_in_post = [
    body("username", "Username must be between 3 and 20 characters")
    .trim()
    .isLength({min: 3, max: 20})
    .escape(),
    body("password", "Password must be between 3 and 15 characters")
    .trim()
    .isLength({min: 3, max: 15})
    .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.render("log_in_form", {errors: errors.array()})
            return
        }

        const allUsers = await User.findOne({username: req.body.username})

        if (!allUsers) {
            res.redirect("/log-in")
        }

        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/log-in",
            failureMessage: true
        })(req, res, next);
    })
]

exports.log_out_get = asyncHandler(async (req, res, next) => {
    res.render("log_out")
})

exports.log_out_post = asyncHandler(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect("/")
    })
})

exports.secret_get = asyncHandler(async (req, res, next) => {
    res.render("secret")
})

exports.secret_post = [
    body("secret", "Wrong")
    .custom((value) => {
        if (value !== "secret") {
            throw new Error("Invalid secret.")
        }
        return true
    }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty() && !currentUser) {
            res.redirect("/")
            return next(err)
        }

        const user = {
            membership: "member"
        }

        await User.findByIdAndUpdate(res.locals.currentUser.id, user, {})
        res.redirect("/")
    })
]