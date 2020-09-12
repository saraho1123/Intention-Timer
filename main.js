var currentActivity;
var pastActivities = [];

var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');
var buttonText = document.querySelectorAll('.cat-titles')
var newActivitySection = document.querySelector('.new');
var currentActivitySection = document.querySelector('.current');
var startButton = document.querySelector('.start-button');
var startActivityBtn = document.querySelector('.start-activity-button');
var errorMsg = document.querySelectorAll('.error-message');

studyButton.addEventListener('click', changeStudyColor);
meditateButton.addEventListener('click', changeMeditateColor);
exerciseButton.addEventListener('click', changeExerciseColor);
minutesInput.addEventListener('keyup', limitMin);
secondsInput.addEventListener('keyup', limitSec);
startActivityBtn.addEventListener('click', startActivity);
startButton.addEventListener('click', startCountDown);

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

function changeStudyColor() {
    changeColor(studyButton, 'study-active', meditateButton, 'meditate-active', exerciseButton, 'exercise-active');
}

function changeMeditateColor() {
    changeColor(meditateButton, 'meditate-active', studyButton, 'study-active', exerciseButton, 'exercise-active');
}

function changeExerciseColor() {
    changeColor(exerciseButton, 'exercise-active', studyButton, 'study-active', meditateButton, 'meditate-active');
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

function limitMin() {
  limitTimeInput(minutesInput, 90)
}

function limitSec() {
  limitTimeInput(secondsInput, 59)
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
  var inputs = [accomplishInput, minutesInput, secondsInput];
  isCatChosen(studyButton, meditateButton, exerciseButton);
  areInputsDefined(inputs);
  if (errorMsg[0].classList.contains('hidden') &&
  errorMsg[1].classList.contains('hidden') &&
  errorMsg[2].classList.contains('hidden') &&
  errorMsg[3].classList.contains('hidden')) {
    createCurrentActivity();
    document.getElementById('user-accomplish').innerText = currentActivity.description;
    document.getElementById('user-minutes').innerText = currentActivity.minutes;
    document.getElementById('user-seconds').innerText = currentActivity.seconds;
  }
}

function startCountDown() {
  var userMinutes = 0; // this will be a user input
  var time = userMinutes * 60;
  var totalSeconds = time + 3; // this will be a user input
  var minDisplay = document.getElementById('user-minutes');
  var secDisplay = document.getElementById('user-seconds');
  var interval = setInterval(updateCountDown, 1000);
  function updateCountDown() {
    totalSeconds--
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = Math.floor(totalSeconds % 60);
    minDisplay.innerText = minutes;
    secDisplay.innerText = seconds;
    if (totalSeconds === 0) {
      clearInterval(interval);
    }
  }
  // we need to add zeros to the front of single digit minutes and seconds.
}
