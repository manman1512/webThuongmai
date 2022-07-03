const express = require('express');
const router = express.Router()

const {signup, signin, forgot} = require("../controllers/auth.controller")

router.post("/signup", signup)
// router.signin("/signin", signin)
// router.forgot("/forgot", forgot)
