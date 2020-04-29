const router = require('express').Router();
const restricted = require('../auth/restricted-middleware');
const Users = require('../users/users-model');

router.get('/', restricted, ( req, res ) => {
  Users.find()
    .then(list => {
      res.json(list);
    })
    .catch(err => res.send(err));
});


module.exports = router;

