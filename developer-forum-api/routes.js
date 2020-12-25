const router = require('express').Router(),
    devForumService = require('./services/dev-forum-service');

//question routes
router.post('/questions/', devForumService.addOrUpdateQuestion);

//User routes
router.post('/users/', devForumService.addOrUpdateUser);

//answer routes
router.post('/answers/', devForumService.addOrUpdateAnswer);



module.exports = (app) => {
    app.use('/api', router);
}