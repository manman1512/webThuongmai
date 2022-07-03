const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/user.models');

module.exports = {
  // SIGNUP
  signup: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Thieu Username hoac Password!',
      });
    }
    try {
      const user = await User.findOne({ username });

      if (user)
        return res
          .status(400)
          .json({ success: false, message: 'Username da duoc su dung!' });

      //all good
      const hashedPassword = await argon2.hash(password);

      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      //return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({ success: true, message: 'Tao User thanh cong!', accessToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Loi server!' });
    }
  },

  // SIGNIN
  signin: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Thieu Username hoac Password!',
      });
    }
    try {
      const user = await User.findOne({ username })

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: 'Username khong ton tai!' });
      }
      const valipassword = await argon2.verify(user.password, password);
      if (!valipassword) {
        return res.status(400).json({
          success: false,
          message: 'Username hoac Password khong dung!',
        });
      }

      // all good
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: 'Dang nhap thanh cong!',
        accessToken,
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Loi Server!' });
    }
  },
};
