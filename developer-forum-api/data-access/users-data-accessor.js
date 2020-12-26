const dbconn = require('../dbconfig.js');
const _ = require('lodash');
const queries = require('../common/sql-queries');



async function createUser(id,data) {
    try {
        let query = queries.user.create;
        query = _.replace(query,'{uuid}',id);
        query = _.replace(query,'{userData}', `${JSON.stringify(data)}`);
        let response = await dbconn.query(query);
        if(!_.isUndefined(_.get(response,'rows[0].description')))
            return _.get(response,'rows[0].description');
    } catch(error) {
        throw error;
    }
}

async function updateUser(id,data) {
    try {
        let query = queries.user.update;
        query = _.replace(query,'{uuid}',id);
        query = _.replace(query,'{userData}', `${JSON.stringify(data)}`);
        let response = await dbconn.query(query);
        if(!_.isUndefined(_.get(response,'rows[0].description')))
            return _.get(response,'rows[0].description');
    } catch(error) {
        throw error;
    }

}

async function getUserDataByUserId(userId) {
    try {
        let query = queries.user.getById;
        query = _.replace(query,'{uuid}',userId);
        let response = await dbconn.query(query);
        if(!_.isUndefined(_.get(response,'rows[0].description')))
            return _.get(response,'rows[0].description');

    } catch (error) {
        throw error;
    }
}



module.exports = {
    createUser,
    updateUser,
    getUserDataByUserId
}