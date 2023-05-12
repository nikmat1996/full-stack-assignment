const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {

  const { email, password } = req.body;

  if(!email || !password)
    return res.status(400).send("Email and Password required.")

  let userExist = USERS.find( user => user.email === email );
  
  if(userExist)
    return res.status(400).send("User email exist.");

  USERS.push({ email, password })

  res.status(200).send("User successfully registered")




})

app.post('/login', function(req, res) {
  
  const { email, password } = req.body;

  if(!email || !password)
    return res.status(400).send("Email and Password required.")

  let user = USERS.find( user => user.email === email );

  if(!user)
    return res.status(401).send("User not found")

  if(user.password === password)
    return res.status(200).send("skdjbaskdjbasjdbkas")
  else
    return res.status(401).send("Wrong Password")

})

app.get('/questions', function(req, res) {

  res.status(200).json(QUESTIONS)
  
})

app.get("/submissions", function(req, res) {

  const { UserId, QuestionId } = req.body;

  if(!UserId || !QuestionId)
    return res.status(400).send("need to know who you are and what you want")
  
  let hisSubmissions = SUBMISSION.filter( solution => solution.UserId === UserId && solution.QuestionId === QuestionId )

  if(hisSubmissions)
    res.status(200).json(hisSubmissions)
  else
    res.status(200).send("No data found")

});


app.post("/submissions", function(req, res) {
  
  const { UserId, QuestionId, solution } = req.body;

  if(!UserId || !QuestionId || !solution)
    return res.status(400).send("Answer not in")
  
  let isAccepted = Math.random() <= 0.5;

  SUBMISSION.push({ UserId , QuestionId, solution, isAccepted });

  if(isAccepted)
    return res.status(200).send("Good Answer")
  else
    return res.status(200).send("Wrong")

});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})