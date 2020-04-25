const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const restricted = require('../auth/restricted-middleware')
const knexSessionStore = require('connect-session-knex')(session)

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

const server = express()

const sessionConfig = {
    name: 'helloWorld',
    secret: 'supercalafragalistic',
    cookie: {
      maxAge: 3600 * 1000,
      secure: false,
      httponly: true,
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore(
      {
        knex: require('../data/dbConfig'),
        tablename: "sessions",
        sidefieldname: "sid",
        createtable: true,
        clearInterval: 3600 * 1000
      }
    )
  }

server.use(helmet());
server.use(express.json());
server.use(cors())
server.use(session(sessionConfig))

server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", ( req, res ) => {
  res.json({api: "up"})
});

module.exports = server;

