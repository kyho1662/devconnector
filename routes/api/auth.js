const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [
  check('email', '부적절한 이메일 주소입니다').isEmail(),
  check('password', '비밀번호를 입력해주세요')
  .exists()
],
async (req, res) => { 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });

    if(!user) {
      return res.status(400).json({ errors: [{ msg: '이메일 혹은 비밀번호가 잘못되었습니다' }]});
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(400).json({ errors: [{ msg: '이메일 혹은 비밀번호가 잘못되었습니다' }]});
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if(err) throw err;
        res.json({ token });
      });
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

});

module.exports = router;