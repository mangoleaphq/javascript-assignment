const router = require('express').Router(),
    devForumService = require('./services/dev-forum-service');

//question routes
router.post('/questions/', devForumService.addOrUpdateQuestion);
router.get('/questions/:userid', devForumService.getAllQuestionsByUserId);

//User routes
router.post('/users/', devForumService.addOrUpdateUser);
router.get('/users/:userid', devForumService.getUserDataByUserId);

//answer routes
router.post('/answers/', devForumService.addOrUpdateAnswer);



module.exports = (app) => {
    app.use('/api', router);
}