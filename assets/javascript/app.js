var triviaGame = {

    timer: {
        interval: null,
        time: 10,
        decrement: function () {
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
            $("#timer").html(this.time);
        }
    },
    questionList: [{
        question: "Question 1",
        answers: [
            { text: "An answer to a question", isCorrect: true },
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

        for (let index = 0; index < numQuestions; index++) {
            var currentQuestion = this.questionList[index];
            setTimeout(this.showQuestion, 11000 * index, currentQuestion, index);
        }
    },

    showQuestion: function (question, questionNumber) {
        console.log("Showing question:", questionNumber);
        triviaGame.timer.start(10);
        $("#question-panel").empty();
        $("#question-panel").append(`
        <h2>${question.question}</h2>
        <h3>Time left: <span id="timer"></span></h3>
        <div class="answer-line"><button data-isCorrect="${question.answers[0].isCorrect}"class="btn btn-default answer-choice">${question.answers[0].text}</button></div>
        <div class="answer-line"><button data-isCorrect="${question.answers[1].isCorrect}"class="btn btn-default answer-choice">${question.answers[1].text}</button></div>
        <div class="answer-line"><button data-isCorrect="${question.answers[2].isCorrect}"class="btn btn-default answer-choice">${question.answers[2].text}</button></div>
        <div class="answer-line"><button data-isCorrect="${question.answers[3].isCorrect}"class="btn btn-default answer-choice">${question.answers[3].text}</button></div>
        `);

    }




}

$("#start-button").on("click", function (event) {
    triviaGame.startgame();
});

