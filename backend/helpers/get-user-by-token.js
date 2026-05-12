const jwt = require('jsonwebtoken')

const User = require('../models/User')

module.exports = async function getUserByToken(token) {

  const decoded = jwt.verify(token, 'nossosecret')

  const user = await User.findById(decoded.id)

  return user

}

