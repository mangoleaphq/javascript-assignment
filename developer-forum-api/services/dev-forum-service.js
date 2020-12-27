let questionManager = require('../managers/questions-manager'),
    userManager = require('../managers/users-manager'),
    answerManager = require('../managers/answers-manager'),
    commentManager = require('../managers/comments-manager')
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
        console.log(userData);
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

async function getAllQuestionsByUserId(req, res) {
    try {
        let response = await questionManager.getQuestionsByUserId(req.params.userid);
        let unansweredQuestions = [];
        let isFalse = (req.query['isAnswered'] == 'false')
        if (isFalse) { //List UnAnswered Questions
            for (let data of response) {
                if (_.isEmpty(data.description.answer_ids)) {
                    unansweredQuestions.push(data)
                }
            }
            res.json(unansweredQuestions)
        }
        else
            res.json(response);
    } catch (err) {
        console.log(err)
        res.send('Error adding or updating question')
    }
}

async function addOrUpdateAnswer(req, res) {
    try {
        if (_.isUndefined(req.body.question_id)) {
            res.send("Invalid Question ID")
        }

        //get question data
        let questionInfo = await questionManager.getQuestionDataByQuestionId(req.body.question_id);
        let questionData = _.get(questionInfo, 'description');

        let answerDataResponse;
        if(!_.isUndefined(questionData))
            answerDataResponse = await answerManager.createOrUpdateAnswer(req.body);

        //update answer id in question data and handle duplicate entry's while updating
        if(!questionData.answer_ids.includes(_.get(answerDataResponse,'answer_id')))
            questionData.answer_ids.push(_.get(answerDataResponse, 'answer_id'));
        await questionManager.createOrUpdateQuestion(questionData);

        /**
       * update user info
       */
        let userInfo = await userManager.getUserDatabyUserId(req.body.user_id);
        //update user with answer_posted and handle duplicate entry's while updating
        if(!userInfo.answers_added.includes(_.get(answerDataResponse, 'answer_id')) && !_.isUndefined(answerDataResponse))
            userInfo.answers_added.push(_.get(answerDataResponse, 'answer_id'));

        await userManager.createOrUpdateUser(userInfo);
        res.json(answerDataResponse)
    } catch (err) {
        console.log(err)
        res.send('Error adding or updating answer')
    }
}

async function getAllAnswersByQuestionId(req, res) {
    try {
        let response = await answerManager.getAnswerListByQuestionId(req.params.questionid);
        let answerList = [];
        for (let data of response) {
            answerList.push(data.description.answer_id)
        }
        res.json({ "answerList" : answerList });
    } catch (err) {
        console.log(err);
        res.send('Error Fetching Data');
    }
}

async function addorUpdateComments(req,res) {
    try {
        let commentResponse = await commentManager.createorUpdateComments(req.body);
        if(req.body.question_id) { //add comment to a question
            let questionInfo = await questionManager.getQuestionDataByQuestionId(req.body.question_id);
            let questionData = _.get(questionInfo, 'description');
            //update answer id in question data and handle duplicate entries
            if(!questionData.comment_ids.includes(_.get(commentResponse, 'comment_id')))
                questionData.comment_ids.push(_.get(commentResponse, 'comment_id'));
            await questionManager.createOrUpdateQuestion(questionData);
        }
        if(req.body.answer_id) { //add comment to an answer
            let answerInfo = await answerManager.getAnswerDataByAnswerId(req.body.answer_id);
            let answerData = _.get(answerInfo, 'description');
            //update answer id in question data and handle duplicate entries
            if(!answerData.comment_ids.includes(_.get(commentResponse, 'comment_id')))
                answerData.comment_ids.push(_.get(commentResponse, 'comment_id'));
            await answerManager.createOrUpdateAnswer(answerData);
        }
        let userInfo = await userManager.getUserDatabyUserId(req.body.user_id);
        //update comment id in user Data and handle duplicate entries
        if(!userInfo.comments_added.includes(_.get(commentResponse, 'comment_id')))
            userInfo.comments_added.push(_.get(commentResponse, 'comment_id'))
        await userManager.createOrUpdateUser(userInfo);
        //removing null values
        commentResponse = _.pickBy(commentResponse, _.identity)
        res.json(commentResponse);
    } catch (err) {
        console.log(err)
        res.send('Error adding or updating comments')
    }
}

async function markRightAnswer(req, res) {
    try {
        let questionInfo = await questionManager.getQuestionDataByQuestionId(req.body.question_id);
        let questionData = _.get(questionInfo, 'description');
        if (questionData.user_id != req.body.user_id) {
            res.send("Invalid user trying to update right answer")
        }
        _.set(questionData, 'right_answer_ids', req.body.answer_id);
        let response = await questionManager.createOrUpdateQuestion(questionData);
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('Error marking answer');
    }
}

module.exports = {
    addOrUpdateQuestion,
    addOrUpdateUser,
    addOrUpdateAnswer,
    addorUpdateComments,
    getUserDataByUserId,
    getAllQuestionsByUserId,
    getAllAnswersByQuestionId,
    markRightAnswer
}