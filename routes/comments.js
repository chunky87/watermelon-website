const express = require('express');
const router = express.Router();
const db = require('../conf/database');

router.post("/create", function (req, res, next) {
    if (!req.session.userId) {
        res.json({
            status: "error",
            message: "You must be logged in to post"
        })
    }
    else {
        let { comment, postid } = req.body;
        let { userId, username } = req.session;
        console.log({ comment, userId, postid });
        db.execute(`INSERT INTO comments (text, fk_authorId, fk_postId) 
        value (?,?,?);`, [comment, userId, postid])
            .then(function ([results, fields]) {
                if (results && results.affectedRows === 1) {
                    res.json({
                        status: "success",
                        message: "Your comment has been created",
                        data: {
                            comment: comment,
                            username: username,
                            commentId: results.insertId
                        },
                    })
                }
                else {
                    res.json({
                        status: "error",
                        message: "Comment could not be created"
                    })
                }
            })
    }

})

module.exports = router;