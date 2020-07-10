const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register route
// @access  Public
router.post('/', [
  check('name', '이름을 입력해주세요')
  .not()
  .isEmpty(),
  check('email', '부적절한 이메일 주소입니다').isEmail(),
  check('password', '비밀번호는 6자 이상의 문자로 입력해주세요')
  .isLength({ min: 6 })
],
async (req, res) => { 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });

    if(user) {
      res.status(400).json({ errors: [{ msg: 'User already exists' }]});
    }

    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken

    const payload = {
      user: {
        id: user.id
      }
    }

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