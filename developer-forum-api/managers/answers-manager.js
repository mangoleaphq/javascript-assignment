const answersDataAccessor = require('../data-access/answers-data-accessor'),
    uuid = require('uuid'),
    templates = require('../common/templates'),
    _ = require('lodash');

async function createOrUpdateAnswer(data) {
    try {
        let response;
        if (_.isUndefined(data.answer_id)) {
            let answerId = uuid.v4();
            data.answer_id = answerId;
            data = _.defaults(data, templates.createAnswerPayload);
            response = await answersDataAccessor.createAnswer(answerId, data);
        }
        else
            response = await answersDataAccessor.updateAnswer(data.answer_id, data)
        return response;
    } catch (error) {
        throw error;
    }
}

async function getAnswerDataByAnswerId(answerId) {
    try {
        let response;
        if (!_.isUndefined(answerId)) {
            response = await answersDataAccessor.getAnswerDataByAnswerId(answerId);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

async function getAnswerListByQuestionId(questionId) {
    try {
        let response;
        if (!_.isUndefined(questionId)) {
            response = await answersDataAccessor.getAnswerListByQuestionId(questionId);
        }
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createOrUpdateAnswer,
    getAnswerDataByAnswerId,
    getAnswerListByQuestionId
} 