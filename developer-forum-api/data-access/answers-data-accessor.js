const dbconn = require('../dbconfig.js');
const _ = require('lodash');
const queries = require('../common/sql-queries');


async function createAnswer(id, data) {
    try {
        let query = queries.answer.create;
        query = _.replace(query, '{uuid}', id);
        query = _.replace(query, '{answerData}', `${JSON.stringify(data)}`);
        let response = await dbconn.query(query);
        if (!_.isUndefined(_.get(response, 'rows[0].description')))
            return _.get(response, 'rows[0].description')
    } catch (error) {
        throw error;
    }
}

async function updateAnswer(id, data) {
    try {
        let query = queries.answer.update;
        query = _.replace(query, '{uuid}', id);
        query = _.replace(query, '{answerData}', `${JSON.stringify(data)}`);
        let response = await dbconn.query(query);
        if (!_.isUndefined(_.get(response, 'rows[0].description')))
            return _.get(response, 'rows[0].description')
    } catch (error) {
        throw error;
    }
}

async function getAnswerDataByAnswerId(questionId) {
    try {
        let query = queries.answer.getById;
        query = _.replace(query, '{uuid}', questionId);
        let response = await dbconn.query(query);
        return response.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createAnswer,
    updateAnswer,
    getAnswerDataByAnswerId
}