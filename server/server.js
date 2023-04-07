const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.listen('3000', function() {
    console.log('Server is up and running on port 3000');
});

let calculationsArray = [];
let counter = 0;

//How I think it's going to run when equate button is clicked
//Client side assigns input fields and button presses to an object
//Object is pushed to the server, object will probably look like:

// {
//     firstNumber: first-number-Input.val(),
//     operand: number based off ,
//     secondNumber: second-number-input.val()
// }

//On the server, it will be calculated based of operand number
//Then return an object to the dom that will look like this:

// {
    // counter : {
//     answer: calculatedAnswer,
//     expression: expression
//     }
// }

// The clear button will clear the user input, and honestly that can happen just on the front end
// The history will be built based off the return object and built in the client the string will look like:

// 1. Expression = Answer -> `${counter}. ${expression}=${calculatedAnswer}

app.get('/expression', (req, res) => {
    res.send(calculationsArray);
    console.log('Sent calculationsArray from the Server to DOM')
});

app.post('/expression', (req, res) => {
    let calculatedAnswer;
    let calculationDataToReturn = {};
    let firstNumber = Number(req.body.firstNumber);
    let operator = req.body.operator;
    let secondNumber = Number(req.body.secondNumber);

    switch (operator) {
        case '+':
            calculatedAnswer = firstNumber + secondNumber;
            break;
        case '-':
            calculatedAnswer = firstNumber - secondNumber;
            break;
        case '*':
            calculatedAnswer = firstNumber * secondNumber;
            break;
        case '/':
            calculatedAnswer = firstNumber / secondNumber;
    }

    calculationDataToReturn[counter] = {
        expression: `${firstNumber} ${operator} ${secondNumber}`,
        answer: calculatedAnswer
    }

    calculationsArray.push(calculationDataToReturn);

    counter++;
    
    res.send('The expression was posted from the DOM to the Server')
});