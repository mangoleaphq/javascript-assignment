const dbconn = require('../dbconfig.js');
const _ = require('lodash');
const queries = require('../common/sql-queries');


async function createComment(id, data) {
    try {
        let query = queries.comment.create;
        query = _.replace(query, '{uuid}', id);
        query = _.replace(query, '{commentData}', `${JSON.stringify(data)}`);
        let response = await dbconn.query(query);
        if (!_.isUndefined(_.get(response, 'rows[0].description')))
            return _.get(response, 'rows[0].description')

    } catch (error) {
        throw error;
    }
}

async function updateComment(id, data) {
    try {
        let query = queries.comment.update;
        query = _.replace(query, '{uuid}', id);
        query = _.replace(query, '{commentData}', `${JSON.stringify(data)}`);
        let response = await dbconn.query(query);
        if (!_.isUndefined(_.get(response, 'rows[0].description')))
            return _.get(response, 'rows[0].description')
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createComment,
    updateComment
}