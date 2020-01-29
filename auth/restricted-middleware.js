const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets')
//const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization

    if (token) {
      
      jwt.verify(token, jwtSecret, (err, decodedToken) => {

        if(err) {
// the token is not valid
          res.status(401).json({
            error: "you can't touch this!"
          })

        } else {
          req.user = { dept: decodedToken.dept }
          next()
        }
      })

    } else {
      res.status(401).json({
        BlackKnight: "None shall pass!, "
      })
    }
  }