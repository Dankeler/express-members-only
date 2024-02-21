var express = require('express');
var router = express.Router();

const sign_up_controller = require("../controllers/sign_up_controller")
const log_in_controller = require("../controllers/log_in_controller")
const message_controller = require("../controllers/message_controller")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

// sign up

// GET
router.get("/sign-up", sign_up_controller.sign_up_get)

// POST
router.post("/sign-up", sign_up_controller.sign_up_post)


// log in

// GET
router.get("/log-in", log_in_controller.log_in_get)

// POST
router.post("/log-in", log_in_controller.log_in_post)

// log out

// GET
router.get("/log-out", log_in_controller.log_out_get)

// POST
router.post("/log-out", log_in_controller.log_out_post)

// messages

// GET
router.get("/messageboard", message_controller.message_get)

// GET form
router.get("/messageboard/create", message_controller.message_form_get)

// POST form
router.post("/messageboard/create", message_controller.message_form_post)

// POST delete message
router.post("/messageboard", message_controller.message_delete_post)

// SECRET

// get
router.get("/secret", log_in_controller.secret_get)

// post
router.post("/secret", log_in_controller.secret_post)


module.exports = router;
