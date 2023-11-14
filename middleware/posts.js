const db = require('../conf/database');
const PostError = require('../helpers/error/PostError');

module.exports = {
    getRecentPosts: function (req, res, next) {
        db.query('select id, title, description, thumbnail from posts ORDER BY createdAt DESC LIMIT 16')
            .then(function ([results, fields]) {
                if (results && results.length) {
                    res.locals.results = results;
                }
                next();
            })
            .catch(err => next(err));
    },

    getPostById: function (req, res, next) {
        let postId = req.params.id;
        let baseSQL = `SELECT p.id, p.title, p.description, p.image, p.createdAt, u.username 
        FROM posts p
        JOIN users u 
        ON p.fk_authorId=u.id
        WHERE p.id=?;`;
        db.query(baseSQL, [postId])
            .then(function ([results, fields]) {
                if (results && results.length == 1) {
                    res.locals.currentPost = results[0];
                }
                else {
                    res.status(404).send("Not found.");
                    throw new Error('post id does not exist');
                }
                next();
            })
            .catch(function (err) {
                if (err instanceof PostError) {
                    req.flash("error", err.getMessage())
                    req.session.save(function (saveErr) {
                      res.redirect(err.getRedirectURL());
                    })
                  }
                  else {
                    next(err);
                  }
            })
    },

    getCommentsForPostById: function(req,res,next) {
        let postId = req.params.id;
        let baseSQL= `select c.id, c.text, c.createdAt, u.username
        FROM comments c
        JOIN users u
        ON c.fk_authorId=u.id
        WHERE fk_postId=?;`
        db.execute(baseSQL,[postId])
        .then(function([results, fields]){
            res.locals.currentPost.comments = results;
            next();
        })
        .catch(err => next(err))
    }
};