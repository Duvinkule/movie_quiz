const quiz_list = [
    {
        question: "In which 1975 blockbuster does a great white shark terrorize a New England beach town?",
        choices: ["Jaws", "The Deep", "Orca", "Piranha"],
        answer: "Jaws"
      },
      {
        question: "Who directed the epic science fiction film \"2001: A Space Odyssey\"?",
        choices: ["Stanley Kubrick", "Steven Spielberg", "George Lucas", "Ridley Scott"],
        answer: "Stanley Kubrick"
      },
      {
        question: "Which actor starred as Tony Montana in the 1983 film \"Scarface\"?",
        choices: ["Al Pacino", "Robert De Niro", "Joe Pesci", "Ray Liotta"],
        answer: "Al Pacino"
      },
      {
        question: "Who played the role of The Joker in the 2008 film \"The Dark Knight\"?",
        choices: ["Heath Ledger", "Joaquin Phoenix", "Jack Nicholson", "Jared Leto"],
        answer: "Heath Ledger"
      },
      {
        question: "What is the name of the fictional African country in the 2018 film \"Black Panther\"?",
        choices: ["Wakanda", "Genovia", "Elbonia", "Azania"],
        answer: "Wakanda"},
      {
        question: "Who played the character of Neo in the 1999 film \"The Matrix\"?",
        choices: ["Keanu Reeves", "Tom Cruise", "Brad Pitt", "Will Smith"],
        answer: "Keanu Reeves"
      },

      {
        question: "Which film won the Academy Award for Best Picture in 2020?",
        choices: ["Parasite", "Joker", "1917", "Once Upon a Time in Hollywood"],
        answer: "Parasite"
      },

      {
        question: "Which actor played the lead role in the 2019 film \"Joker\"?",
        choices: ["Joaquin Phoenix", "Heath Ledger", "Jack Nicholson", "Jared Leto"],
        answer: "Joaquin Phoenix"
      },

      {
        question: "Who directed the 2019 film \"Parasite\"?",
        choices: ["Bong Joon-ho", "Park Chan-wook", "Kim Ki-duk", "Hong Sang-soo"],
        answer: "Bong Joon-ho"
      },

      {   question: "What is the highest grossing film of all time (as of 2021)?",    choices: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars"],
        answer: "Avatar"
      }



  ];
  
  // define variables
  let quiz = shuffle(quiz_list);
  let currentQuestion = 0;
  let currentQuestion1 = 0;
  let score = 0;
  let timeLeft = 60; // 60 seconds
  let timerId;
  let answerIndex;
  let answer;
  let buttonColor;
  const totalQuestions = quiz.length;
  
  
  // define functions
  function showQuestion() {
    
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const questionCountElement = document.getElementById("question-count");
    if(currentQuestion >= quiz.length|| timeLeft <= 0){
      clearInterval(timerId);
      showScore();

    }
   


    questionElement.innerHTML = quiz[currentQuestion].question;
    choicesElement.innerHTML = "";
    // Loop through choices and create button for each
    quiz[currentQuestion].choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("choice");
      button.dataset.index = index;
    
      button.addEventListener("click", getAnswer);
      choicesElement.appendChild(button);
    
    });
    choicesElement.querySelectorAll(".choice").forEach((choice) => {
        choice.style.width = "45%";
        choice.style.marginBottom = "10px";
      });
    document.querySelector('#submit').disabled = false;
    questionCountElement.textContent = `Question: ${currentQuestion + 1}/${totalQuestions}`;
    currentQuestion++;
 
    
  }

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}




  function getAnswer(event){
    answerIndex = event.target.getAttribute('data-index');
    answer = event.target.textContent;
    
  }
  


function selectAnswer() {
  const buttonList = document.querySelectorAll('.choice');
  const selectedChoice = answer
  if (selectedChoice === quiz[currentQuestion-1].answer) {
    score++;
    
    for(let i = 0; i < 4;i++){
      if(buttonList[i].textContent === answer){
        buttonList[i].style.backgroundColor = 'green'; 
      }
      
      
    }
  }else{
      for(let i = 0; i < 4;i++){

        if(buttonList[i].textContent === answer){
          buttonList[i].style.backgroundColor = 'red'; 
        }
          
      }
      
  }
  document.querySelector('#submit').disabled = true;
   
}    
  
  function showScore() {
  const grade = (score/quiz.length)*100;
  const containerElement = document.querySelector(".performance");
  const overlayElement = document.querySelector(".overlay")
  containerElement.classList.remove("hidden");
  overlayElement.classList.remove("hidden");
  containerElement.querySelector('#score').textContent = `Your score is ${score} out of ${quiz.length}`;
  containerElement.querySelector('#wrong').textContent = `Wrong ${(quiz.length-score)} answers`;
  if (grade >= 60){

    containerElement.querySelector('#grade').style.color = 'green';

  }else{
    containerElement.querySelector('#grade').style.color = 'red';
  }
  containerElement.querySelector('#grade').textContent = `Grade ${grade}% `;
  containerElement.querySelector('#time').textContent = `You took ${60-timeLeft} sec`;
  }
  
  function startTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.innerHTML = `Time left: ${timeLeft}`;
  
    timerId = setInterval(() => {
      timeLeft--;
      timerElement.innerHTML = `Time left: ${timeLeft}`;
  
      if (timeLeft <= 0) {
        clearInterval(timerId);
        showScore();
      }
    }, 1000);
  }
  
  // add event listeners
  document.getElementById("start").addEventListener("click", () => {
   
    document.querySelector(".start-screen").classList.add("hidden");
    document.querySelector(".quiz-screen").classList.remove("hidden");
    startTimer();
    showQuestion();
  });

  function restart(){
    
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    
  
    // Clear timer
    clearInterval(timerId);
  
    // Hide performance container and overlay
    const containerElement = document.querySelector(".performance");
    const overlayElement = document.querySelector(".overlay");
    containerElement.classList.add("hidden");
    overlayElement.classList.add("hidden");
  
    // Display start screen
    document.querySelector(".start-screen").classList.remove("hidden");
    document.querySelector(".quiz-screen").classList.add("hidden");



  }

  document.getElementById("next").addEventListener("click", showQuestion);
  document.getElementById("submit").addEventListener("click", selectAnswer);
  document.getElementById("restart").addEventListener("click", restart);