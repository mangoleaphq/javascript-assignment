module.exports = {
    createUserPayload : {
        "email"           : "test",
        "name"            : "test",
        "answers_added"   : [],
        "questions_asked" : [],
        "comments_added"  : [],
        "user_id"         : "testid"
    },
    createQuestionPayload : {
        "title"            : "test question",
        "desc"             : "test",
        "user_id"          : "testid",
        "question_id"      : "testid",
        "comment_ids"      : [],
        "answer_ids"       : [],
        "right_answer_ids" : []
    },
    createAnswerPayload : {
        "desc"             : "test answer",
        "user_id"          : "testid",
        "answer_id"        : "testid",
        "comment_ids"      : [],
        "question_id"       : "test_id"
    },
    createCommentPayload : {
        "desc"             : "test comment",
        "user_id"          : "testid",
        "comment_id"       : "test_id",
        "question_id"      : null,
        "answer_id"        : null
    }
}