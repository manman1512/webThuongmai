const express = require('express');
const 
router = express.Router()

const {signup, signin, forgot} = require("../controllers/auth.controller")

router.post("/signup", signup)
router.post("/signin", signin)
// router.post("/forgot", forgot)


module.exports = router;