const express = require("express")
const asyncHandler = require("express-async-handler")
const {body, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")

// models
const User = require("../models/user_model")

exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render("sign_up_form")
})

exports.sign_up_post = [
    body("username", "Username must be between 3 and 20 characters")
    .trim()
    .isLength({min: 3, max: 20})
    .escape(),
    body("password", "Password must be between 3 and 15 characters")
    .trim()
    .isLength({min: 3, max: 15})
    .escape(),
    body("confirm_password", "Password must be between 3 and 15 characters and must match")
    .trim()
    .isLength({min: 3, max: 15})
    .escape(),
    body('confirm_password', "Password confirmation does not match password").custom((value, { req }) => {
        return value === req.body.password;
      }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
    
        const allUsers = await User.findOne({username: req.body.username})
        
        if (allUsers) {
            throw new Error("User already exists")
        } else {
            let hashedPassword;
            bcrypt.hash(req.body.password, 5, async (err, hash) => {
                if (err) throw err;
                hashedPassword = hash;
    
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword
                });
    
                if (!errors.isEmpty()) {
                    res.render("sign_up_form", {errors: errors.array(), user})
                } else {
                    await user.save()
                    res.redirect("/log-in")
                }
            })
        }
    })
]