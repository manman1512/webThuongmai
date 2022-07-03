const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/user.models');




module.exports={
  signup : async (req, res) => {
    const { username, password} = req.body;
  
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Username hoac Password khong dung!' });
    }
    try {
      const user = await User.findOne({username})
      
      if(user){
        return res.status(400).json()
      }
    } catch (error) {
      
    }
  }
}