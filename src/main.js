var currentActivity;
var pastActivities = [];

var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var categoryButtons = document.querySelectorAll('.category-button')
var startButton = document.querySelector('.start-button');
var startActivityBtn = document.querySelector('.start-activity-button');
var logButton = document.getElementById('log-button');
var createNewActivityBtn = document.querySelector('.new-activity-button');
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
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
var inputs = document.querySelectorAll('input');

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

function changeClassProperty(element) {
  for (var i = 0; i < element.length; i++) {
    element[i].add?
    (element[i].name).classList.add(element[i].classProperty):
    (element[i].name).classList.remove(element[i].classProperty)
  }
}

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
  var properties = [
  {name: studyButton, classProperty: 'study-active', add: true},
  {name: meditateButton, classProperty: 'meditate-active', add: false},
  {name: exerciseButton, classProperty: 'exercise-active', add: false}
  ];
  changeClassProperty(properties);
  //addClassProperty(studyButton, 'study-active');
  //removeClassProperty(meditateButton, 'meditate-active', exerciseButton, 'exercise-active')
  isCatChosen(categoryButtons);
}

function changeMeditateColor() {
  var properties = [
  {name: studyButton, classProperty: 'study-active', add: false},
  {name: meditateButton, classProperty: 'meditate-active', add: true},
  {name: exerciseButton, classProperty: 'exercise-active', add: false}
  ];
  changeClassProperty(properties);
  // addClassProperty(meditateButton, 'meditate-active');
  // removeClassProperty(studyButton, 'study-active', exerciseButton, 'exercise-active');
  isCatChosen(categoryButtons);
}

function changeExerciseColor() {
  var properties = [
  {name: studyButton, classProperty: 'study-active', add: false},
  {name: meditateButton, classProperty: 'meditate-active', add: false},
  {name: exerciseButton, classProperty: 'exercise-active', add: true}
  ];
  changeClassProperty(properties);
  // addClassProperty(exerciseButton, 'exercise-active');
  // removeClassProperty(studyButton, 'study-active', meditateButton, 'meditate-active');
  isCatChosen(categoryButtons);
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
  var displayErrorMsg = [{name: errorMsg[errorMsgIndex], classProperty: 'hidden', add: false}];
  var removeErrorMsg = [{name: errorMsg[errorMsgIndex], classProperty: 'hidden', add: true}];
  userInput.value ? changeClassProperty(removeErrorMsg) : changeClassProperty(displayErrorMsg);
  // addClassProperty(errorMsg[errorMsgIndex], 'hidden') : removeClassProperty(errorMsg[errorMsgIndex], 'hidden');
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
  var circleColor = [{name: startButton, classProperty: `${classProperty}-circle`, add: true}];
  if (button.classList.contains(`${classProperty}-active`)) {
    createInstance(`${classProperty}-active`);
    changeClassProperty(circleColor);
    // addClassProperty(startButton, `${classProperty}-circle`);
  }
}

function displayTimeSection() {
  document.getElementById('user-accomplish').innerText = currentActivity.description;
  displayMin.innerText = currentActivity.minutes < 10 ?   `0${currentActivity.minutes}` : currentActivity.minutes;
  displaySec.innerText = currentActivity.seconds < 10 ?  `0${currentActivity.seconds}` : currentActivity.seconds;
}

function displayCurrentActivitySection() {
  var activitySections = [
    {name: newActivitySection, classProperty: 'hidden', add: true},
    {name: currentActivitySection, classProperty: 'hidden', add: false}
  ];
  changeClassProperty(activitySections);
  // addClassProperty(newActivitySection, 'hidden');
  // removeClassProperty(currentActivitySection, 'hidden');
  var classList = ['study', 'meditate', 'exercise'];
  for (var i = 0; i < categoryButtons.length; i++) {
    updateCircleColor(categoryButtons[i], classList[i]);
  }
}

function createInstance(activeClass) {
  var categoryButtonsNames = document.querySelectorAll('.category-titles');
  for (var i = 0; i < categoryButtonsNames.length; i++) {
    if (categoryButtonsNames[i].parentNode.classList.contains(activeClass)) {
      currentActivity = new Activity (
        categoryButtonsNames[i].innerText,
        accomplishInput.value,
        minutesInput.value,
        secondsInput.value
        );
    }
  }
}

function isCatChosen(btns) {
  var classProperties = ['study', 'meditate', 'exercise'];
  for (var i = 0; i < btns.length; i++) {
    if (btns[i].classList.contains(`${classProperties[i]}-active`)) {
      return errorMsg[0].classList.add('hidden')
    } else {
      errorMsg[0].classList.remove('hidden');
    }
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

function startActivity() {
  isCatChosen(categoryButtons);
  areInputsDefined(inputs);
  var errorMessages = 0;
  for (var i = 0; i < errorMsg.length; i++) {
    if (errorMsg[i].classList.contains('hidden')) {
      errorMessages += 1;
    }
  }
  if (errorMessages >= errorMsg.length) {
    displayCurrentActivitySection();
    displayTimeSection();
  }
}

function displayCongratMsg(msg) {
  var congratsMessages = [
    {name: displayUserTimer, classProperty: 'hidden', add: true},
    {name: congratMsg, classProperty: 'hidden', add: false}
  ];
  changeClassProperty(congratsMessages);
  // addClassProperty(displayUserTimer, 'hidden');
  // removeClassProperty(congratMsg, 'hidden');
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
      displayMin.innerText = minutes < 10 ? `0${minutes}` : minutes;
      displaySec.innerText = seconds < 10 ? `0${seconds}` : seconds;
      if (totalSeconds <= 0) {
        clearInterval(interval);
        endCountDown();
      }
    }
  }
}

function returnFromLocalStorage() {
  pastActivities = JSON.parse(localStorage.getItem('userActivities'))
  cardSection.innerHTML = ""
  for (var i = 0; i < pastActivities.length; i++) {
    var color;
    if (pastActivities[i].category === 'Study') {
      color = '#B3FD78';
    } else if (pastActivities[i].category === 'Meditate') {
      color = '#C278FD'
    } else if (pastActivities[i].category === 'Exercise') {
      color = '#FD8078';
    }
    cardSection.innerHTML +=
      `<section class="new-card">
        <div class="card">
          <h5 class="card card-cat">${pastActivities[i].category}</h5>
          <h5 class="card card-time">${pastActivities[i].minutes} MIN ${pastActivities[i].seconds} SECONDS</h5>
          <h5 class="card card-accomplish">${pastActivities[i].description}</h5>
        </div>
        <div class="card-border" style="background-color:${[color]}"></div>
      </section>`
  }
}

function logActivity() {
  currentActivity.saveToStorage(currentActivity);
  var sectionsToSwitch = [
    {name: emptyLogSection, classProperty: 'hidden', add: true},
    {name: currentActivitySection, classProperty: 'hidden', add: true},
    {name: cardSection, classProperty: 'hidden', add: false},
    {name: completedActivitySection, classProperty: 'hidden', add: false}
  ];
  changeClassProperty(sectionsToSwitch);
  // addClassProperty(emptyLogSection, 'hidden', currentActivitySection, 'hidden');
  // removeClassProperty(cardSection, 'hidden', completedActivitySection, 'hidden');
  returnFromLocalStorage();
}

function clearTimerSection() {
  startButton.innerText = 'START';
  startButton.disabled = false;
  var sectionsToClear = [
    {name: congratMsg, classProperty: 'hidden', add: true},
    {name: displayUserTimer, classProperty: 'hidden', add: false}
  ];
  changeClassProperty(sectionsToClear);
  // addClassProperty(congratMsg, 'hidden');
  // removeClassProperty(displayUserTimer, 'hidden');
}

function clearCategoryColor() {
  var buttonNames = ['study', 'meditate', 'exercise']
  for (var i = 0; i < categoryButtons.length; i++) {
    removeClassProperty(categoryButtons[i], `${buttonNames[i]}-active`);
    removeClassProperty(startButton, `${buttonNames[i]}-circle`);
  }
}

function clearUserInputsSection() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}

function createNewActivity() {
  clearCategoryColor();
  clearUserInputsSection();
  clearTimerSection();
  var sectionsToSwitch = [
    {name: logButton, classProperty: 'hidden', add: true},
    {name: completedActivitySection, classProperty: 'hidden', add: true},
    {name: newActivitySection, classProperty: 'hidden', add: false},
  ];
  changeClassProperty(sectionsToSwitch);
  // addClassProperty(logButton, 'hidden', completedActivitySection, 'hidden');
  // removeClassProperty(newActivitySection, 'hidden');
}

function displayCardsOnLoad() {
  if (localStorage.length > 0) {
    var sectionsToSwitch = [
      {name: emptyLogSection, classProperty: 'hidden', add: true},
      {name: cardSection, classProperty: 'hidden', add: false},
    ];
    changeClassProperty(sectionsToSwitch);
    // addClassProperty(emptyLogSection, 'hidden');
    // removeClassProperty(cardSection, 'hidden');
    returnFromLocalStorage();
  }
}

displayCardsOnLoad();
