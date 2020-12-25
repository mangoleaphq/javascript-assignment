

async function addOrUpdateUser(req,res) {
    try {
        res.send("User added");
    }
    catch(err){
        console.log(err);
        res.send("Error adding or updating user");
    }
}

async function addOrUpdateQuestion(req,res) {
    try {
        res.send("question added");
    }
    catch(err){
        console.log(err);
        res.send("Error adding or updating question");
    }
}

async function addOrUpdateAnswer(req,res) {
    try {
        res.send("answer added");
    }
    catch(err){
        console.log(err);
        res.send("Error adding or updating answer");
    }
}

module.exports = {
    addOrUpdateQuestion,
    addOrUpdateUser,
    addOrUpdateAnswer
}