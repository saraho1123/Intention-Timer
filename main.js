var currentActivity;
var pastActivities = [];

var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var startButton = document.querySelector('.start-button');
var startActivityBtn = document.querySelector('.start-activity-button');
var logButton = document.getElementById('log-button');
var createNewActivityBtn = document.querySelector('.new-activity-button');
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var buttonText = document.querySelectorAll('.cat-titles')
var newActivitySection = document.querySelector('.new');
var currentActivitySection = document.querySelector('.current');
var cardSection = document.querySelector('.card-section');
// var viewCardSection = document.querySelector('.view-card')
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

// TODO: consider breaking into 2 to reduce number of params?
// NOTE: the button/category params alwasy come in a pair.
function changeColor(button1, category1, button2, category2, button3, category3) {
    if (button2 == undefined) {
        button1.classList.add(category1);
    } else if (button3 == undefined) {
        button1.classList.add(category1);
        button2.classList.remove(category2);
    } else {
        button1.classList.add(category1);
        button2.classList.remove(category2);
        button3.classList.remove(category3);
    }
}

// TODO: refactoring changeColor would effect this one.
function changeStudyColor() {
    changeColor(studyButton, 'study-active', meditateButton, 'meditate-active', exerciseButton, 'exercise-active');
    isCatChosen(studyButton, meditateButton, exerciseButton);
  }

// TODO: refactoring changeColor would effect this one.
function changeMeditateColor() {
    changeColor(meditateButton, 'meditate-active', studyButton, 'study-active', exerciseButton, 'exercise-active');
    isCatChosen(studyButton, meditateButton, exerciseButton);
  }

// TODO: refactoring changeColor would effect this one.
function changeExerciseColor() {
    changeColor(exerciseButton, 'exercise-active', studyButton, 'study-active', meditateButton, 'meditate-active');
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

function limitAccomplish() {
  areInputsDefined([accomplishInput], 1);
}

function limitMin() {
  limitTimeInput(minutesInput, 90);
  areInputsDefined([minutesInput], 2);
}

function limitSec() {
  limitTimeInput(secondsInput, 59);
  areInputsDefined([secondsInput], 3);
}

function createCurrentActivity() {
    changeColor(newActivitySection,'hidden', currentActivitySection, 'hidden');
    if (studyButton.classList.contains('study-active')) {
        createInstance('study-active');
        changeColor(startButton,'study-circle');
    } else if (meditateButton.classList.contains('meditate-active')) {
        createInstance('meditate-active');
        changeColor(startButton,'meditate-circle');
    } else if (exerciseButton.classList.contains('exercise-active')) {
        createInstance('exercise-active');
        changeColor(startButton,'exercise-circle');
    }

}

function createInstance(activeClass) {
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

// TODO: consider refactoring since it is long. Consider more about what it does first.
function areInputsDefined(userInputs, errorMsgIndex) {
  if (errorMsgIndex && userInputs[0].value === '') {
    errorMsg[errorMsgIndex].classList.remove('hidden');
    return
  } else if (errorMsgIndex && userInputs[0].value !== '') {
    errorMsg[errorMsgIndex].classList.add('hidden');
    return
  }
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

// TODO: We tried a FOR LOOP here. Is there any better way to do this?
// for loop of errorMsg and push using ++ and return empty array. if array.length
// is 0, call the functions.
function startActivity() {
  var inputs = [accomplishInput, minutesInput, secondsInput];
  isCatChosen(studyButton, meditateButton, exerciseButton);
  areInputsDefined(inputs);
  if (errorMsg[0].classList.contains('hidden') &&
  errorMsg[1].classList.contains('hidden') &&
  errorMsg[2].classList.contains('hidden') &&
  errorMsg[3].classList.contains('hidden')) {
    createCurrentActivity();
    displayTimeSection();
  }
}

// TODO: refactoring changeColor would effect this one.
function displayCongratMsg(msg) {
  changeColor(displayUserTimer, 'hidden', congratMsg, 'hidden');
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

// TODO: refactoring changeColor would effect this one.
function logActivity() {
  currentActivity.saveToStorage(currentActivity);
  changeColor(emptyLogSection, 'hidden', cardSection, 'hidden');
  changeColor(currentActivitySection, 'hidden', completedActivitySection, 'hidden');
  returnFromLocalStorage();
}

// TODO: refactoring changeColor would effect this one.
function clearTimerSection() {
  startButton.innerText = 'START';
  startButton.disabled = false;
  changeColor(congratMsg, 'hidden', displayUserTimer, 'hidden');
}

// EASY TODO: could make it a for loop
function clearCatButtonSection() {
    buttonText[0].parentNode.classList.remove('study-active');
    buttonText[1].parentNode.classList.remove('meditate-active');
    buttonText[2].parentNode.classList.remove('exercise-active');
}

// TODO: could do a queryALL to refactor
function clearUserInputsSection() {
  accomplishInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
}

function clearStartCircleColor() {
  var circleColor= ['study-circle', 'meditate-circle', 'exercise-circle']
    for (var i = 0; i < circleColor.length; i++) {
      startButton.classList.remove(circleColor[i]);
    }
}

// TODO: refactoring changeColor would effect this one.
function createNewActivity() {
  clearCatButtonSection();
  clearUserInputsSection();
  clearTimerSection();
  clearStartCircleColor();
  changeColor(logButton, 'hidden')
  changeColor(completedActivitySection, 'hidden', newActivitySection, 'hidden');
}

// TODO: refactoring changeColor would effect this one.
function displayCardsOnLoad() {
  if (localStorage.length > 0) {
    changeColor(emptyLogSection, 'hidden', cardSection, 'hidden');
    returnFromLocalStorage();
  }
}

displayCardsOnLoad();
