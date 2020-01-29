const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, thisDept('fighter'),(req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function thisDept(dept) {
  return function(req, res, next) {
    // console.log("user", req.user)
    if (req.user && req.user.dept && req.user.dept.toLowerCase() === dept) {
      next()
      } else {
        res.status(403).json({ Admin: 'Unauthorized use is not allowed' })
      }
  }
}  

module.exports = router;