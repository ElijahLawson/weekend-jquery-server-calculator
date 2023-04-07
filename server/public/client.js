$(document).ready(onReady);
let currentOperator = ''
function onReady() {
    $('#equate-btn').on('click', postExpressionToServer);
    $('#clear-btn').on('click', clearInputFields);
    $('#input-section').on('click', '.operand-btn', determineOperator);
    renderResultToDom();
}

function postExpressionToServer(event) {
    event.preventDefault();

    let firstNumber = $('#first-number-input').val();
    let secondNumber = $('#second-number-input').val();

    expressionToPost = {
        firstNumber: firstNumber,
        operator: currentOperator,
        secondNumber: secondNumber
    }

    $.ajax({
        method: 'POST',
        data: expressionToPost,
        url: '/expression'
    }).then( function(response) {
        renderResultToDom();
    })

}

function renderResultToDom() {
    $.ajax({
        method: "GET",
        url: "/expression"
    }).then(function (response) {
        let calculations = response;
        let mostRecentGuessObject;

        $('#result-section').empty();


        $('#first-number-input').val('');
        $('#second-number-input').val('');
        
        for (i in calculations) {
            $('#history-list').append(`<li>${Number(i)+1}. ${calculations[i][i].expression} = ${calculations[i][i].answer}</li>`)
        }
        mostRecentGuessObject = calculations[calculations.length - 1];
        mostRecentAnswer = mostRecentGuessObject[Object.keys(mostRecentGuessObject)[0]].answer;
        
        $('#result-section').append(`<h1>${mostRecentAnswer}</h1>`)
    })
}

function determineOperator() {
    currentOperator = $(this).text();
};

function clearInputFields() {
    $('#first-number-input').val('');
    $('#second-number-input').val('');
    currentOperator = '';
}