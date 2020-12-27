const commentsDataAccessor = require('../data-access/comments-data-accessor'),
    uuid = require('uuid'),
    templates = require('../common/templates'),
    _ = require('lodash');

async function createorUpdateComments(data) {
    try {
        let response;
        if (_.isUndefined(data.comment_id)) {
            let commentId = uuid.v4();
            data.comment_id = commentId;
            data = _.defaults(data, templates.createCommentPayload);
            response = await commentsDataAccessor.createComment(commentId, data);
        }
        else
            response = await commentsDataAccessor.updateComment(data.comment_id, data)
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createorUpdateComments
} 