var currentActivity;
var pastActivities = [];

var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');

var startActivityBtn = document.querySelector('.start-activity-button');

studyButton.addEventListener('click', changeStudyColor);
meditateButton.addEventListener('click', changeMeditateColor);
exerciseButton.addEventListener('click', changeExerciseColor);
minutesInput.addEventListener('keyup', limitMin);
secondsInput.addEventListener('keyup', limitSec);

startActivityBtn.addEventListener('click', createCurrentActivity);

function changeColor(button, category) {
    button.classList.add(category);
}

function returnDefaultColor(button1, category1, button2, category2) {
    button1.classList.remove(category1);
    button2.classList.remove(category2);
}

function changeStudyColor() {
    changeColor(studyButton, 'study-active');
    returnDefaultColor(meditateButton, 'meditate-active', exerciseButton, 'exercise-active');
}

function changeMeditateColor() {
    changeColor(meditateButton, 'meditate-active');
    returnDefaultColor(studyButton, 'study-active', exerciseButton, 'exercise-active');
}

function changeExerciseColor() {
    changeColor(exerciseButton, 'exercise-active');
    returnDefaultColor(studyButton, 'study-active', meditateButton, 'meditate-active');
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
    if (secondsInput.value > 60) {
        secondsInput.value = 60;
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

// A Start Activity button is provided to submit the data entered into the form. When the button is clicked, update your data model with an instance of the Activity class.
// access start activity button and add event listener to it
// function that instantiates a new Activity object 

function createCurrentActivity() {
        if (studyButton.classList.contains('study-active')) {
            createInstance('study-active');
        } else if (meditateButton.classList.contains('meditate-active')) {
            createInstance('meditate-active');
        } else if (exerciseButton.classList.contains('exercise-active')) {
            createInstance('exercise-active');
        }
    }
//   createInstance('study-active');
//     createInstance('meditate-active');
//     createInstance('exercise-active');

function createInstance(activeClass) {
  //  debugger
    var categories = [studyButton, meditateButton, exerciseButton]
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].classList.contains(activeClass)) {
            currentActivity = new Activity (        
                categories[i].innerText,
                accomplishInput.value,
                minutesInput.value,
                secondsInput.value
                );
        } 
    } 
    console.log(currentActivity)
}

// pass three parameters into helper function, inside helper function, any of the elements contain any of parameters, create new instance

//inside createCurrentActivity assign variable to array of three active cats
//for loop for array, iterate through, if statement inside the loop, if(event.target.classList.contains(array[i])) { createInstance(array[i])}