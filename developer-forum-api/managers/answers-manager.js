const answersDataAccessor = require('../data-access/answers-data-accessor'),
    uuid = require('uuid'),
    _ = require('lodash');

async function createOrUpdateAnswer(data) {
    try {
        let response;
        if (_.isUndefined(data.answer_id)) {
            let answerId = uuid.v4();
            data.answer_id = answerId;
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

module.exports = {
    createOrUpdateAnswer,
    getAnswerDataByAnswerId
} 