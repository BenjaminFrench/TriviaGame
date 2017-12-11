var triviaGame = {

    correctGuesses: 0,
    incorrectGuesses: 0,
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
                triviaGame.incorrectGuesses++;

                // disply answer
                var correctAnswer;
                for (let index = 0; index < triviaGame.questionList[triviaGame.questionNumber].answers.length; index++) {
                    var answer = triviaGame.questionList[triviaGame.questionNumber].answers[index];
                    if (answer.isCorrect) {
                        correctAnswer = answer.text;
                    }
                    
                }
                $("#question-panel").empty();
                $("#question-panel").append(`
                <h3><span id="times-up">You ran out of time.</span></h3>
                <h2>${triviaGame.questionList[triviaGame.questionNumber].question}</h2>
                <h3>You chose the wrong answer</h3>
                <h3>The correct answer is:</h3>
                <p>${correctAnswer}</p>
                `);
                triviaGame.questionNumber++;
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
        question: "What is the capital of Alaska?",
        answers: [
            { text: "Helena", isCorrect: false },
            { text: "Juneau", isCorrect: true },
            { text: "Anchorage", isCorrect: false },
            { text: "Jacksonville", isCorrect: false }]
    },
    {
        question: "What is the capital of North Carolina?",
        answers: [
            { text: "Raleigh", isCorrect: true },
            { text: "Charlotte", isCorrect: false },
            { text: "Charleston", isCorrect: false },
            { text: "Myrtle Beach", isCorrect: false }]
    },
    {
        question: "What is the capital of Maryland?",
        answers: [
            { text: "Baltimore", isCorrect: false },
            { text: "Rockville", isCorrect: false },
            { text: "Annapolis", isCorrect: true },
            { text: "Norfolk", isCorrect: false }]
    },
    {
        question: "What is the capital of California?",
        answers: [
            { text: "Sacramento", isCorrect: true },
            { text: "San Francisco", isCorrect: false },
            { text: "Los Angeles", isCorrect: false },
            { text: "San Diego", isCorrect: false }]
    },
    {
        question: "What is the capital of Ohio?",
        answers: [
            { text: "Cleveland", isCorrect: false },
            { text: "Akron", isCorrect: false },
            { text: "Cincinnati", isCorrect: false },
            { text: "Columbus", isCorrect: true }]
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
        triviaGame.timer.start(5);
        if (triviaGame.questionNumber < 4) {
            var currentQuestion = triviaGame.questionList[triviaGame.questionNumber+1];
            triviaGame.nextQTimeout = setTimeout(triviaGame.showQuestion, 8000, currentQuestion, triviaGame.questionNumber+1);
        }
        
        else {
            // show final scoreboard
        }
        $(".answer-choice").on("click", function() {
            triviaGame.timer.stop();
            if (this.getAttribute("data-is-correct") === "true") {
                console.log("clicked right answer");
                clearTimeout(triviaGame.nextQTimeout);
                $("#question-panel").empty();
                $("#question-panel").append(`
                <h2>${triviaGame.questionList[triviaGame.questionNumber].question}</h2>
                <h3>You chose the correct answer</h3>
                <p>${this.innerHTML}</p>
                `);
                if (triviaGame.questionNumber < 4) {
                    var currentQuestion = triviaGame.questionList[triviaGame.questionNumber+1];
                    triviaGame.nextQTimeout = setTimeout(triviaGame.showQuestion, 3000, currentQuestion, triviaGame.questionNumber+1)
                     triviaGame.questionNumber++;
            
                }
                else {
                    // show final scoreboard
                }
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
                <h3>The correct answer is:</h3>
                <p>${correctAnswer}</p>
                `);
                if (triviaGame.questionNumber < 4) {
                    var currentQuestion = triviaGame.questionList[triviaGame.questionNumber+1];
                    triviaGame.nextQTimeout = setTimeout(triviaGame.showQuestion, 3000, currentQuestion, triviaGame.questionNumber+1)
            triviaGame.questionNumber++;
            
                }
                else {
                    // show final scoreboard
                }
            }
            
        });
    }




}

$("#start-button").on("click", function (event) {
    triviaGame.startgame();
});

