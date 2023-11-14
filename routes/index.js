var express = require('express');
const {isLoggedIn} = require('../middleware/protectors');
const {getRecentPosts, getPostById, getCommentsForPostById} = require('../middleware/posts');
var router = express.Router();

/* GET home page. */
router.get('/', getRecentPosts, function (req, res, next) {
  res.render('index', { css: ["style.css"], /*js: ["fetch.js"]*/ title: 'CSC 317 App', name: "Jeremy Chan" });
});

router.get("/login", function (req, res) {
  res.render('login', { css: ["style.css"] });
});

router.get("/register", function (req, res) {
  res.render('registration', { css: ["style.css"], js: ["validation.js"] });
});

router.get("/post", isLoggedIn, function (req, res) {
  res.render('postimage', { css: ["style.css"] });
});

router.get("/posts/:id(\\d+)", getPostById, getCommentsForPostById, function (req, res) {
  res.render('viewpost', { css: ["style.css", "viewpost.css"], js: ["viewpost.js"] });
});

module.exports = router;
