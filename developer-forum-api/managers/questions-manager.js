const questionDataAccessor = require('../data-access/questions-data-accessor'),
     _ = require('lodash'),
    templates = require('../common/templates'),
    uuid = require('uuid');





async function createOrUpdateQuestion(data) {
    try {
        let response;
        if(_.isUndefined(data.question_id)) {
            let questionId = uuid.v4();
            data.question_id = questionId;
            data = _.defaults(data, templates.createQuestionPayload);
            response = await questionDataAccessor.createQuestion(questionId, data);
        }
        else 
            response = await questionDataAccessor.updateQuestion(data.question_id, data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function getQuestionsByUserId(userId) {
    try {
        let response;
        if (!_.isUndefined(userId)) {
            response = await questionDataAccessor.getQuestionsByUserId(userId);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

async function getQuestionDataByQuestionId(questionId) {
    try {
        let response;
        if (!_.isUndefined(questionId)) {
            response = await questionDataAccessor.getQuestionDataByQuestionId(questionId);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrUpdateQuestion,
    getQuestionDataByQuestionId,
    getQuestionsByUserId
}