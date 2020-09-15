var currentActivity;
var pastActivities = [];

var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var catButtons = document.querySelectorAll('.cat-button')
var startButton = document.querySelector('.start-button');
var startActivityBtn = document.querySelector('.start-activity-button');
var logButton = document.getElementById('log-button');
var createNewActivityBtn = document.querySelector('.new-activity-button');
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
//var buttonText = document.querySelectorAll('.cat-titles')
var newActivitySection = document.querySelector('.new');
var currentActivitySection = document.querySelector('.current');
var cardSection = document.querySelector('.card-section');
var completedActivitySection = document.querySelector('.completed');
var emptyLogSection = document.querySelector('#empty-log');
var errorMsg = document.querySelectorAll('.error-message');
var displayMin = document.getElementById('user-minutes');
var displaySec = document.getElementById('user-seconds');
var congratMsg = document.querySelector('.message');
var displayUserTimer = document.querySelector('.user-timer');

studyButton.addEventListener('click', changeStudyColor);
meditateButton.addEventListener('click', changeMeditateColor);
exerciseButton.addEventListener('click', changeExerciseColor);
minutesInput.addEventListener('keyup', limitMin);
secondsInput.addEventListener('keyup', limitSec);
accomplishInput.addEventListener('keyup', limitAccomplish);
startActivityBtn.addEventListener('click', startActivity);
startButton.addEventListener('click', startCountDown);
logButton.addEventListener('click', logActivity);
createNewActivityBtn.addEventListener('click', createNewActivity);

function addClassProperty(button1, category1, button2, category2) {
  if (!button2) {
    button1.classList.add(category1);
  } else {
    button1.classList.add(category1);
    button2.classList.add(category2);
  }
}

function removeClassProperty(button1, category1, button2, category2) {
  if (!button2) {
    button1.classList.remove(category1);
  } else {
    button1.classList.remove(category1);
    button2.classList.remove(category2);
  }
}

function changeStudyColor() {
  addClassProperty(studyButton, 'study-active');
  removeClassProperty(meditateButton, 'meditate-active', exerciseButton, 'exercise-active')
  isCatChosen(studyButton, meditateButton, exerciseButton);
  }

function changeMeditateColor() {
  addClassProperty(meditateButton, 'meditate-active');
  removeClassProperty(studyButton, 'study-active', exerciseButton, 'exercise-active');
  isCatChosen(studyButton, meditateButton, exerciseButton);
  }

function changeExerciseColor() {
  addClassProperty(exerciseButton, 'exercise-active');
  removeClassProperty(studyButton, 'study-active', meditateButton, 'meditate-active');
  isCatChosen(studyButton, meditateButton, exerciseButton);
  }

function limitTimeInput(timeInput, num) {
  preventInvalids(event, timeInput);
  timeInput.value = parseInt(timeInput.value);
  if (timeInput.value > num) {
    timeInput.value = num;
  }
}

function preventInvalids(event, inputField) {
  var invalidChars = ['+', '-', 'e', 'E'];
  for (var i = 0; i < invalidChars.length; i++) {
    if (event.key === invalidChars[i]) {
      event.preventDefault();
      inputField.value = '';
    }
  }
}
function updateErrorMsg(userInput, errorMsgIndex) {
  userInput.value ? 
  addClassProperty(errorMsg[errorMsgIndex], 'hidden') : removeClassProperty(errorMsg[errorMsgIndex], 'hidden');
}
function limitAccomplish() {
  updateErrorMsg(accomplishInput, 1);
}

function limitMin() {
  limitTimeInput(minutesInput, 90);
  updateErrorMsg(minutesInput, 2);
}

function limitSec() {
  limitTimeInput(secondsInput, 59);
  updateErrorMsg(secondsInput, 3);
}

function updateCircleColor(button, classProperty) { 
  if (button.classList.contains(`${classProperty}-active`)) {
    createInstance(`${classProperty}-active`);
    addClassProperty(startButton, `${classProperty}-circle`);
  }
}

function createCurrentActivity() {
  addClassProperty(newActivitySection, 'hidden');
  removeClassProperty(currentActivitySection, 'hidden');
  var classList = ['study', 'meditate', 'exercise'];
  for (var i = 0; i < catButtons.length; i++) {
    updateCircleColor(catButtons[i], classList[i]);
  }
}

function createInstance(activeClass) {
  var buttonText = document.querySelectorAll('.cat-titles');
  for (var i = 0; i < buttonText.length; i++) {
    if (buttonText[i].parentNode.classList.contains(activeClass)) {
      currentActivity = new Activity (
        buttonText[i].innerText,
        accomplishInput.value,
        minutesInput.value,
        secondsInput.value
        );
    }
  }
}

function isCatChosen(btn1, btn2, btn3) {
  if (!btn1.classList.contains('study-active') &&
  !btn2.classList.contains('meditate-active') &&
  !btn3.classList.contains('exercise-active')) {
    errorMsg[0].classList.remove('hidden');
  } else {
    errorMsg[0].classList.add('hidden');
  }
}

function areInputsDefined(userInputs) {
  for (var i = 0; i < userInputs.length; i++) {
    if (userInputs[i].value === '') {
      errorMsg[i + 1].classList.remove('hidden');
    } else {
      errorMsg[i + 1].classList.add('hidden');
    }
  }
}

function displayTimeSection() {
  document.getElementById('user-accomplish').innerText = currentActivity.description;
  currentActivity.minutes < 10 ? displayMin.innerText = `0${currentActivity.minutes}` : displayMin.innerText = currentActivity.minutes;
  currentActivity.seconds < 10 ? displaySec.innerText = `0${currentActivity.seconds}` : displaySec.innerText = currentActivity.seconds;
}

function startActivity() {
  var inputs = [accomplishInput, minutesInput, secondsInput];
  isCatChosen(studyButton, meditateButton, exerciseButton);
  areInputsDefined(inputs);
  var errorMessages = 0;
  for (var i = 0; i < errorMsg.length; i++) {
    if (errorMsg[i].classList.contains('hidden')) {
      errorMessages += 1;
    }
  }
  if (errorMessages >= errorMsg.length) {
    createCurrentActivity();
    displayTimeSection();
  }
}

function displayCongratMsg(msg) {
  addClassProperty(displayUserTimer, 'hidden');
  removeClassProperty(congratMsg, 'hidden');
  congratMsg.innerText = msg;
}

function endCountDown() {
  displayCongratMsg('Congrats!!! Great Job!!! 😍🤢🌿☘️🍀🧚🏿‍♀️🧞‍♂️🧜🏿‍♂️🧛🏻‍♂️');
  startButton.innerText = 'COMPLETE';
  logButton.classList.remove('hidden');
  currentActivity.markComplete();
}

function startCountDown() {
  startButton.disabled = true;
  var totalSeconds = currentActivity.startTimer();
  if (totalSeconds > 0) {
    var interval = setInterval(updateCountDown, 1000);
    function updateCountDown() {
      totalSeconds--
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = Math.floor(totalSeconds % 60);
      minutes < 10 ?  displayMin.innerText = `0${minutes}` : displayMin.innerText = minutes;
      seconds < 10 ?  displaySec.innerText = `0${seconds}` : displaySec.innerText = seconds;
      if (totalSeconds <= 0) {
        clearInterval(interval);
        endCountDown();
      }
    }
  }
}

// TODO: take another look at this one to refactor.
function returnFromLocalStorage() {
  pastActivities = JSON.parse(localStorage.getItem('userActivities'))
  cardSection.innerHTML = ""
  for (var i = 0; i < pastActivities.length; i++) {
    cardSection.innerHTML +=
      `<section class="new-card">
        <div class="card">
          <h5 class="card card-cat">${pastActivities[i].category}</h5>
          <h5 class="card card-time">${pastActivities[i].minutes} MIN ${pastActivities[i].seconds} SECONDS</h5>
          <h5 class="card card-accomplish">${pastActivities[i].description}</h5>
        </div>
        <div class="card-border">
        </div>
      </section>`
    var cardBorder = document.querySelectorAll('.card-border');
    if (pastActivities[i].category === 'Study') {
      cardBorder[cardBorder.length-1].style.backgroundColor = '#B3FD78';
    } else if (pastActivities[i].category === 'Meditate') {
      cardBorder[cardBorder.length-1].style.backgroundColor = '#C278FD';
    } else if (pastActivities[i].category === 'Exercise') {
      cardBorder[cardBorder.length-1].style.backgroundColor = '#FD8078';
    }
  }
}

function logActivity() {
  currentActivity.saveToStorage(currentActivity);
  addClassProperty(emptyLogSection, 'hidden', currentActivitySection, 'hidden');
  removeClassProperty(cardSection, 'hidden', completedActivitySection, 'hidden');
  returnFromLocalStorage();
}

function clearTimerSection() {
  startButton.innerText = 'START';
  startButton.disabled = false;
  addClassProperty(congratMsg, 'hidden');
  removeClassProperty(displayUserTimer, 'hidden');
}

function clearCatButtonSection() {
  var buttonNames = ['study-active', 'meditate-active', 'exercise-active']
  for (var i = 0; i < catButtons.length; i++) {
    removeClassProperty(catButtons[i], buttonNames[i]);
  }
}

// TODO: could do a queryALL to refactor
function clearUserInputsSection() {
  var inputs = document.querySelectorAll('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
  // accomplishInput.value = '';
  // minutesInput.value = '';
  // secondsInput.value = '';
}

function clearStartCircleColor() {
  var circleColor= ['study-circle', 'meditate-circle', 'exercise-circle']
    for (var i = 0; i < circleColor.length; i++) {
      startButton.classList.remove(circleColor[i]);
    }
}

function createNewActivity() {
  clearCatButtonSection();
  clearUserInputsSection();
  clearTimerSection();
  clearStartCircleColor();
  addClassProperty(logButton, 'hidden', completedActivitySection, 'hidden');
  removeClassProperty(newActivitySection, 'hidden');
}

function displayCardsOnLoad() {
  if (localStorage.length > 0) {
    addClassProperty(emptyLogSection, 'hidden');
    removeClassProperty(cardSection, 'hidden');
    returnFromLocalStorage();
  }
}

displayCardsOnLoad();
