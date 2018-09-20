const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port',(process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());
app.listen(app.get('port'), function(){
    console.log('Server running on port:', app.get('port'));
});

const users = [];

function checkIfUserAlreadyExcist(email){
    let response = true;
    for(i in users){
        if(users[i].email == email){
            response = false;
        }
    }
    return response;
}

app.post("/api/user", function(req,res){
    let user = req.body;
    if(checkIfUserAlreadyExcist(user.email)===true){
    user.id = users.length + 1;
    users.push(user);
    res.json(user).end();
    } else {
        res.json({"Response":"User already created"}).end();
    }
    
});