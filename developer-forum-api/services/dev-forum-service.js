let questionManager = require('../managers/questions-manager'),
    userManager = require('../managers/users-manager'),
    _ = require('lodash');

async function addOrUpdateUser(req,res) {
    try {
        res.send(await userManager.createOrUpdateUser(req.body));
    }
    catch(err){
        console.log(err);
        res.send("Error adding or updating user");
    }
}

async function getUserDataByUserId(req, res) {
    try {
        let response = await userManager.getUserDatabyUserId(req.params.userid);
        res.json(response);
    } catch (err) {
        console.log(err);
        res.send('Error Fetching Data');
    }
}

async function addOrUpdateQuestion(req,res) {
    try {
        /**
         * update user info
         */
        let questionResponse;
        let userData = await userManager.getUserDatabyUserId(req.body.user_id);
        //retrieve user data for update
        if(!_.isUndefined(userData))
            questionResponse = await questionManager.createOrUpdateQuestion(req.body);
        //update user with question asked and handle duplicate entry's while updating
        if(!userData.questions_asked.includes(_.get(questionResponse, 'question_id')))
            userData.questions_asked.push(_.get(questionResponse, 'question_id'));
       
        await userManager.createOrUpdateUser(userData);
        res.send(questionResponse);
    }
    catch(err){
        console.log(err);
        res.send("Error adding or updating question");
    }
}

async function addOrUpdateAnswer(req,res) {
    try {
        res.send("answer added");
    }
    catch(err){
        console.log(err);
        res.send("Error adding or updating answer");
    }
}

module.exports = {
    addOrUpdateQuestion,
    addOrUpdateUser,
    addOrUpdateAnswer,
    getUserDataByUserId,
    getAllQuestionsByUserId
}