const dbconn = require('../dbconfig.js');
const _ = require('lodash');
const queries = require('../common/sql-queries');


async function createQuestion(id,data) {
    try{
        let query = queries.question.create;
        query = _.replace(query, '{uuid}', id);
        query = _.replace(query, '{questionData}',`${JSON.stringify(data)}`);
        let response = await dbconn.query(query);
        if(!_.isUndefined(_.get(response,'rows[0].description')))
            return _.get(response,'rows[0].description');
    } catch(error) {
        throw error;
    }
}


async function updateQuestion(id,data) {
    try{
        let query = queries.question.update;
        query = _.replace(query, '{uuid}', id);
        query = _.replace(query, '{questionData}',`${JSON.stringify(data)}`);
        let response = await dbconn.query(query);
        if(!_.isUndefined(_.get(response,'rows[0].description')))
            return _.get(response,'rows[0].description');
    } catch(error) {
        throw error;
    }
}


async function getQuestionsByUserId(userId) {
    try {
        let query = queries.question.getQuestionsByUserId;
        query = _.replace(query, '{uuid}', userId);
        let response = await dbconn.query(query);
        return response.rows;
    } catch (error) {
        throw error;
    }
}

async function getQuestionDataByQuestionId(questionId) {
    try {
        let query = queries.question.getById;
        query = _.replace(query, '{uuid}', questionId);
        let response = await dbconn.query(query);
        return response.rows[0];
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createQuestion,
    updateQuestion,
    getQuestionDataByQuestionId,
    getQuestionsByUserId
}