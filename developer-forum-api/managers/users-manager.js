const userDataAccessor = require('../data-access/users-data-accessor'),
     _ = require('lodash'),
    templates = require('../common/templates'),
    uuid = require('uuid');



async function createOrUpdateUser(data) {
    try {
        let response;
        if(_.isUndefined(data.user_id)) {
            let userId = uuid.v4();
            data.user_id = userId;
            data = _.defaults(data,templates.createUserPayload);
            response = await userDataAccessor.createUser(userId,data);
        }
        else 
        {
            response = await userDataAccessor.updateUser(data.user_id,data);
        }
        return response;
    } catch(error) {
        throw(error);
    }
}

async function getUserDatabyUserId(userId)
{
    try {
        let response;
        if (!_.isUndefined(userId)) {
            response = await userDataAccessor.getUserDataByUserId(userId);
        }
        return response;
    } catch (error) {
        throw error;
    }
}






module.exports = {
    createOrUpdateUser,
    getUserDatabyUserId
}
