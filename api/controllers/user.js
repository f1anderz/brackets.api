const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.get_users = async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
};

exports.get_user = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (user) {
      return res.status(200).json(user);
    }
    res.status(404).json({
      message: 'User not found'
    });
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
};

exports.users_register = async (req, res) => {
  try {
    const user = await User.find({ login: req.body.login }).exec();
    if (user.length > 0) {
      return res.status(409).json({
        message: 'Login exists'
      });
    }
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        login: req.body.login,
        password: hash,
        nickname: req.body.nickname
      });
      try {
        const result = await user.save();
        res.status(201).json({
          status: true,
          user: result
        });
      } catch (err) {
        res.status(500).json({
          error: err
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
};

exports.users_login = async (req, res) => {
  try {
    const user = await User.findOne({ login: req.body.login }).exec();
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      res.status(200).json({
        status: true,
        user: user
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err
    });
  }
};
