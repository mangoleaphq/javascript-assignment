module.exports = {
    user: {
        create: "INSERT INTO users(id,description) VALUES('{uuid}','{userData}') RETURNING description",
        update: "UPDATE users SET description = '{userData}' where id = '{uuid}' RETURNING description",
        getById: "SELECT * from users where id = '{uuid}'"
    },
    question: {
        create: "INSERT INTO questions(id,description) VALUES('{uuid}','{questionData}') RETURNING description",
        update: "UPDATE questions SET description = '{questionData}' where id = '{uuid}' RETURNING description",
        getQuestionsByUserId: "SELECT * FROM questions where description->>'user_id' = '{uuid}'",
        getById: "SELECT * from questions where id = '{uuid}'"
    },
    answer: {
        create: "INSERT INTO answers(id,description) VALUES('{uuid}','{answerData}') RETURNING description",
        update: "UPDATE answers SET description = '{answerData}' where id = '{uuid}' RETURNING description",
        getById: "SELECT * from answers where id = '{uuid}'",
        getByQuestionId: "SELECT * FROM answers where description->>'question_id' = '{uuid}'"
    },
    comment: {
        create: "INSERT INTO comments(id,description) VALUES('{uuid}','{commentData}') RETURNING description",
        update: "UPDATE comments SET description = '{commentData}' where id = '{uuid}' RETURNING description"
    }
}