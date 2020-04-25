const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../users/users-model');

router.post("/register", ( req, res ) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash; //replaces password with hash 
  Users.add(user)
    .then(users => {
      res.status(201).json({users});
    })
    .catch(err => {
      res.status(500).json({message: 'problem with the db', err})
    })
})

router.post("/login", ( req, res) => {
  const { username, password } = req.body;

  Users.findBy({username})//returns an array
    .then(([user]) => {// could be more than one record in the query
      if ( user && bcrypt.compareSync(password, user.password)){
        req.session.user = username;
        res.status(200).json({message: "Welcome"})
      } else {
        res.status(401).json({ message: 'Invalid login information'})
      }
    })
    .catch ( err => {
      res.status(500).json({message: 'problem with db'})
    })
})

router.get('/logout', ( req, res ) => {
  req.session.destroy((err) => {
    if (err) {
      res.send('Unable to logout')
    } else {
      res.send('You Logged Out')
    }
  })
})


module.exports = router;