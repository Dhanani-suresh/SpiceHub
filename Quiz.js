// set the quiz duration in seconds
    let quizDuration = 60;
    let time = 0;
	
// Get the timer element
    let timerElement = document.getElementById("timer");

// Start the quiz timer
    let quizTimer = setInterval(function() {
        // update the timer value
        timerElement.innerHTML = "Time: " + quizDuration + " s";
        time = 60 - quizDuration;

        // check if the quiz timer has reached zero
        if (quizDuration <= 0) {
            // Clear the interval and display a message
            clearInterval(quizTimer);
            timerElement.innerHTML = "Time's up!";
        }
        // Decrement of quiz duration
        quizDuration--;
    },1000);

    // This function is for refresh the webpage
    function refreshPage() {
        location.reload();
    }
// Array of question objects	
	let questions = [
		{
			question: "What is the primary source of the coffee's flavor and aroma?",
			answers: ["a) Caffeine", "b) Roasting Temperature", "c) Milk and Sugar", "d) Coffee Beans"],
			correctAnswer: 3
		},
		{
			question: "Which ingredient gives the traditional Indian drink 'Lassi' its distinctive taste and texture?",
			answers: ["a) Yogurt", "b) Lemon Juice", "c) Coconut Milk", "d) Tomato Puree"],
			correctAnswer: 0
		},
		{
			
			question: "Which region is famous for the origin of the delicious rice dish called 'Biryani'?",
			answers: ["a) Italy", "b) India", "c) China", "d) Mexico"],
			correctAnswer: 1 
		},
		{
			question: "What is the main ingredient in the popular Indian dish 'Butter Chicken'?",
			answers: ["a) Tofu", "b) Paneer", "c) chicken", "d) Lentils"],
			correctAnswer: 2
		},
		{
			question: "'kerala fish' is a traditional fish dish from which Indian state?",
			answers: ["a) Kerala", "b) Punjab", "c) Gujarat", "d) Assam"],
			correctAnswer: 0 
		},
		{
			question: "'Kosha Mangsho' is a traditional dish from which Indian state?",
			answers: ["a) West Bengal", "b) Rajasthan", "c) Kerala", "d) Punjab"],
			correctAnswer: 0
		},
		{
			question: "Which is the world's most Favourite biryani?",
			answers: ["a) Hyderabadi Biryani", "b) Ambur biryani", "c) Dindigul biryani", "d) Malabar biryani"],
			correctAnswer: 0
		},
		{
			question: "what is the main ingredient of laddu?",
			answers: ["a) Corn flour", "b) Green gram flour", "c) Gram flour", "d) Atta flour"],
			correctAnswer: 2 
		},
		{
			question: "Which country is famous for gulab jamun?",
			answers: ["a) India ", "b) Italy ", "c) Pakistan", "d) China"],
			correctAnswer: 0 
		},
		{
			question: "What is the best side dish for dosa?",
			answers: ["a) Tomato source", "b) Choclate", "c) Tea", "d) Coconut Chutney"],
			correctAnswer: 3
		}
	];
	let currentQuestion = 0;   // Representing index of "questions" array.
	let correctAnswers = 0;
	let wrongAnswers = 0;
    let grade = 0;

// This function is helps to change the quiz questions
	function displayQuestion() {
		let questionElement = document.getElementById("question");
		let answersElement = document.getElementById("answers");
		let statusElement = document.getElementById("status");
		let nextButtonElement = document.getElementById("nextButton");

		// Clear previous question and answers.
		questionElement.textContent = "";
		answersElement.textContent = "";
		statusElement.textContent = "";

		// Display current question number and total number of questions.
		let questionCount = document.createElement("span");
		questionCount.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length + " questions";
		questionCount.classList.add("B");
		statusElement.appendChild(questionCount);

		// Display current correct answer count.
		let correctCount = document.createElement("span");
		correctCount.textContent = "Correct Answers: " + correctAnswers;
		correctCount.classList.add("B");
		statusElement.appendChild(correctCount);

		// Display current question
		questionElement.textContent = questions[currentQuestion].question;

		// Display answer options
		for(let i = 0; i < questions[currentQuestion].answers.length; i++) {
			let answerElement = document.createElement("div");
			answerElement.className = "answer";
			answerElement.textContent = questions[currentQuestion].answers[i];

			// Attach click event listener to each answer
			answerElement.addEventListener("click", handleAnswerClick);

			answersElement.appendChild(answerElement);
		}
		// Hide "Next Question" button until an answer is selected.
		nextButtonElement.style.display = "block";
	}
// This function is for handle the actions once the answer was clicked
    function handleAnswerClick(event) {
        let selectedAnswer = event.target;
        let answers = document.getElementsByClassName("answer");
        let correctAnswer = questions[currentQuestion].correctAnswer;

        // Check if selected answer is correct.
        if(selectedAnswer.textContent === questions[currentQuestion].answers[correctAnswer]) {
            selectedAnswer.classList.add("correct");    // Add "correct" class to the selected element
            correctAnswers++;  // Increment of "correctAnswers" count
            grade += 10;
        }
        else {
            selectedAnswer.classList.add("incorrect");  // Add "incorrect" class to the selected element
            wrongAnswers++;    // Increment of "wrongAnswers" count

            // Highlight the correct answer.
            answers[correctAnswer].classList.add("correct");
        }

        // Disable click event listeners on all answer.
        for(let i = 0; i < answers.length; i++) {
            answers[i].removeEventListener("click", handleAnswerClick);
        }

        // Activate "Next Question" button.
        let nextButtonElement = document.getElementById("nextButton");
        nextButtonElement.disabled = false;
    }
	
// This function is helps to show the results once the was quiz completed
    function showResult() {
        let modal = document.getElementById("resultModal");
        modal.style.display = "block";
        let first = document.getElementById("1");
        first.textContent = "Question: " + questions.length;
        let second = document.getElementById("2");
        second.textContent = "Wrong Answers: " + wrongAnswers;
        let third = document.getElementById("3");
        third.textContent = "Score: " + correctAnswers;
        let fourth = document.getElementById("4");
        fourth.textContent = "Grade: " + grade + "%";
        let fifth = document.getElementById("5");
        fifth.textContent = "You took " + time + " s";
        let sixth = document.getElementById("6");
        if (time < 60) {
            if (grade >= 80 && grade <= 100) {
                sixth.textContent = "Excellent Mark. Keep up the good work";
                sixth.classList.add("greenword");
            }
            else if (grade >= 60 && grade < 80) {
                sixth.textContent = "Good. Keep it up";
                sixth.classList.add("greenword");
            }
            else if (grade >= 50 && grade < 60) {
                sixth.textContent = "Not Enough. You have to work";
                sixth.classList.add("redword");
            }
            else if (grade >= 40 && grade < 50) {
                sixth.textContent = "Poor. You have to work"
                sixth.classList.add("redword");
            }
            else if (grade >= 0 && grade < 40) {
                sixth.textContent = "Very Poor. You have to work with your GK";
                sixth.classList.add("redword");
            }
        }
        else if (time >= 60) {
            sixth.textContent = "Keep Time Management";
            sixth.classList.add("redword");
        }
    }
	
	function handleNextQuestionClick() {
		let answers = document.getElementsByClassName("answer");

		// Remove answer colour classes.
		for(let i = 0; i < answers.length; i++) {
			answers[i].classList.remove("correct", "incorrect");
		}

		// Increment current question index.
		currentQuestion++;

		// Display next question or end the quiz.
		if(currentQuestion < questions.length) {
			let nextButtonElement = document.getElementById("nextButton");
			nextButtonElement.disabled = true;
			displayQuestion();
		}
		else {
			showResult();
			// End of quiz.
			let questionElement = document.getElementById("question");
			let answersElement = document.getElementById("answers");
			let statusElement = document.getElementById("status");
			let nextButtonElement = document.getElementById("nextButton");
			let timerElement = document.getElementById("timer");

			questionElement.textContent = "Quiz Completed!";
			answersElement.textContent = "";
			statusElement.textContent = "";
			timerElement.textContent = "";

			// Display final correct answer output
            clearInterval(quizTimer);
            timerElement.textContent = "Thank You";

			nextButtonElement.style.display = "none";
		}
	}
	// Start Quiz
	displayQuestion();

	// Attach click event listener to "Next Question" button
	let nextButtonElement = document.getElementById("nextButton");
	nextButtonElement.addEventListener("click", handleNextQuestionClick);
