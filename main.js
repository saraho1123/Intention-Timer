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

studyButton.addEventListener('click', changeStudyColor);
meditateButton.addEventListener('click', changeMeditateColor);
exerciseButton.addEventListener('click', changeExerciseColor);
minutesInput.addEventListener('keyup', limitMin);
secondsInput.addEventListener('keyup', limitSec);
startActivityBtn.addEventListener('click', startActivity);

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

function limitMin() {
    preventInvalids(event, minutesInput);
    minutesInput.value = parseInt(minutesInput.value);
    if (minutesInput.value > 90) {
        minutesInput.value = 90;
    }
}

function limitSec() {
    preventInvalids(event, secondsInput);
    secondsInput.value = parseInt(secondsInput.value);
    if (secondsInput.value > 59) {
        secondsInput.value = 59;
    }
}

function preventInvalids(event, inputField) {
  // debugger
    var invalidChars = ['+', '-', 'e', 'E'];
    for (var i = 0; i < invalidChars.length; i++) {
        if (event.key === invalidChars[i]) {
            event.preventDefault();
            inputField.value = '';
        }
    }
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

function startActivity() {
  createCurrentActivity();
  // document.getElementById('user-accomplish').innerText = currentActivity.description;
  document.getElementById('user-accomplish').innerText = currentActivity.description;
  document.getElementById('user-minutes').innerText = currentActivity.minutes;
  document.getElementById('user-seconds').innerText = `:${currentActivity.seconds}`;
}
