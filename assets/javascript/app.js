var triviaGame = {

    nextQTimeout: null,
    questionNumber: 0,

    timer: {
        interval: null,
        time: 10,
        decrement: function () {
            $("#timer").html(triviaGame.timer.time);
            if (triviaGame.timer.time > 0) {
                console.log("tick", triviaGame.timer.time);
                triviaGame.timer.time--;
            }
            else {
                clearInterval(triviaGame.timer.interval);
                console.log("timer done");
            }
        },
        start: function (seconds) {
            this.time = seconds-1;
            console.log("tick", seconds);
            this.interval = setInterval(this.decrement, 1000);
            $("#timer").html(seconds);
        },
        stop: function () {
            this.time = 0;
            clearInterval(triviaGame.timer.interval);
        }
    },
    questionList: [{
        question: "Question 1",
        answers: [
            { text: "blah", isCorrect: true },
            { text: "An answer to a question", isCorrect: false },
            { text: "An answer to a question", isCorrect: false },
            { text: "An answer to a question", isCorrect: false }]
    },
    {
        question: "Question 2",
        answers: [
            { text: "An answer to a question", isCorrect: true },
            { text: "An answer to a question", isCorrect: false },
            { text: "An answer to a question", isCorrect: false },
            { text: "An answer to a question", isCorrect: false }]
    },
    {
        question: "Question 3",
        answers: [
            { text: "An answer to a question", isCorrect: true },
            { text: "An answer to a question", isCorrect: false },
            { text: "An answer to a question", isCorrect: false },
            { text: "An answer to a question", isCorrect: false }]
    },
    {
        question: "Question 4",
        answers: [
            { text: "An answer to a question", isCorrect: true },
            { text: "An answer to a question", isCorrect: false },
            { text: "An answer to a question", isCorrect: false },
            { text: "An answer to a question", isCorrect: false }]
    },
    {
        question: "What is my favorite color",
        answers: [
            { text: "Red", isCorrect: true },
            { text: "Green", isCorrect: false },
            { text: "Blue", isCorrect: false },
            { text: "Yellow", isCorrect: false }]
    },],

    startgame: function () {
        // clear the question panel
        $("#question-panel").empty();
        var numQuestions = this.questionList.length;

        var currentQuestion = this.questionList[0];
        this.showQuestion(currentQuestion, this.questionNumber);
    },

    showQuestion: function (question) {
        console.log("Showing question:", triviaGame.questionNumber);
        $("#question-panel").empty();
        $("#question-panel").append(`
        <h2>${question.question}</h2>
        <h3>Time left: <span id="timer"></span></h3>
        <div class="answer-line"><button data-is-correct="${question.answers[0].isCorrect}"class="btn btn-default answer-choice">${question.answers[0].text}</button></div>
        <div class="answer-line"><button data-is-correct="${question.answers[1].isCorrect}"class="btn btn-default answer-choice">${question.answers[1].text}</button></div>
        <div class="answer-line"><button data-is-correct="${question.answers[2].isCorrect}"class="btn btn-default answer-choice">${question.answers[2].text}</button></div>
        <div class="answer-line"><button data-is-correct="${question.answers[3].isCorrect}"class="btn btn-default answer-choice">${question.answers[3].text}</button></div>
        `);
        triviaGame.timer.start(10);
        if (triviaGame.questionNumber < 4) {
            var currentQuestion = triviaGame.questionList[triviaGame.questionNumber+1];
            triviaGame.nextQTimeout = setTimeout(triviaGame.showQuestion, 13000, currentQuestion, triviaGame.questionNumber+1);
        }
        $(".answer-choice").on("click", function() {
            if (this.getAttribute("data-is-correct") === "true") {
                console.log("clicked right answer");
                clearTimeout(triviaGame.nextQTimeout);
                $("#question-panel").empty();
                $("#question-panel").append(`
                <h2>${triviaGame.questionList[triviaGame.questionNumber].question}</h2>
                <h3>You chose the correct answer</h3>
                <p>${this.innerHTML}</p>
                `);
            }
            else {
                //chose wrong answer
                var correctAnswer;
                for (let index = 0; index < triviaGame.questionList[triviaGame.questionNumber].answers.length; index++) {
                    var answer = triviaGame.questionList[triviaGame.questionNumber].answers[index];
                    if (answer.isCorrect) {
                        correctAnswer = answer.text;
                    }
                    
                }
                console.log("clicked wrong answer");
                clearTimeout(triviaGame.nextQTimeout);
                $("#question-panel").empty();
                $("#question-panel").append(`
                <h2>${triviaGame.questionList[triviaGame.questionNumber].question}</h2>
                <h3>You chose the wrong answer</h3>
                <h3>The right answer is:</h3>
                <p>${correctAnswer}</p>
                `);
            }
            
        });
    }




}

$("#start-button").on("click", function (event) {
    triviaGame.startgame();
});

