// pre-define variables to be used in fetch function
let results = null;
const questionAmount = 10;

// reference variables pointing to corresponding elements
const question = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options-list');

async function fetchQuestionnaireData() {
    try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${questionAmount}&category=18`);
        const data = await response.json();
        results = data.results;
    } catch (error) {
        console.error(error);
    }
}

fetchQuestionnaireData()
    .then(() => {
        console.log(results);
        question.innerHTML = results[0]['question'];
    });

function printQuestions() {
    console.log(results);
}