// pre-define variables to be used in fetch function
let categories;
let results;
const questionAmount = 10;

let currentQuestion;

// reference variables pointing to corresponding elements
const welcomeScreen = document.getElementById('welcome-setup');
const questionnaireScreen = document.getElementById('questionnaire-form');
const categorySelect = document.getElementById('category');
const questionAmountSelect = document.getElementById('question-count');

const categoryText = document.getElementById('category-text');
const questionCounter = document.getElementById('question-counter');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options-list');

// Fetch categories to provide the ability to select one category (to the user)
async function fetchCategories() {
    try {
        const response = await fetch(`https://opentdb.com/api_category.php`);
        const data = await response.json();
        categories = data.trivia_categories;
    } catch (error) {
        console.error(error);
    }
}

async function fetchQuestionnaireData() {
    try {
        var selectedCategoryId = document.getElementById('category').value;
        const response = await fetch(`https://opentdb.com/api.php?amount=${questionAmount}&category=${selectedCategoryId}`);
        const data = await response.json();
        results = data.results;
    } catch (error) {
        console.error(error);
    }
}

// Update the number indicating current range slider's real-time value
function updateCurrentRangeValue(val) {
    document.getElementById('current-range-value').innerHTML = val;
}

function startQuestionnaire() {
    fetchQuestionnaireData()
        .then(() => {
            console.log(results);
            welcomeScreen.hidden = true;
            currentQuestion = 0;
            categoryText.innerHTML = results[currentQuestion].category;
            questionCounter.innerHTML = `${currentQuestion + 1}/${questionAmount}`;
            questionText.innerHTML = results[currentQuestion].question;
            questionnaireScreen.hidden = false;
            displayAnswerOptions();
        });
}

function displayAnswerOptions() {
    var options = results[currentQuestion].incorrect_answers;
    options.push(results[currentQuestion].correct_answer);
    answerOptions.innerHTML = "";
    options.forEach(option => {
        answerOptions.innerHTML += `
        <div class="col-lg-6 p-2">
            <button type="button" class="btn btn-primary w-100">${option}</button>
        </div>`;
    });

}

fetchCategories()
    .then(() => {
        categorySelect.innerHTML = "";
        categories.forEach(category => {
;            categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
        });
    });



function printQuestions() {
    console.log(results);
}