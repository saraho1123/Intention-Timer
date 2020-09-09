var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');

var accomplishInput = document.querySelector('.accomplish-input');
var minutesInput = document.querySelector('.minutes-input');
var secondsInput = document.querySelector('.seconds-input');

studyButton.addEventListener('click', changeStudyColor);
meditateButton.addEventListener('click', changeMeditateColor);
exerciseButton.addEventListener('click', changeExerciseColor);

minutesInput.addEventListener('keyup', limitChar)
secondsInput.addEventListener('keyup', limitChar)

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

// accessing accomplish, minutes, and seconds inputs
// limiting the inputs of minutes and seconds to integers
// limit minutes to two digits and seconds to under 60
// prevent "e" from use in time inputs

function limitChar() {
    var minutes = parseInt(minutesInput.value);
    var seconds = parseInt(secondsInput.value);
    if (minutes > 90) {
        minutesInput.value = '90';
    }
    if (seconds > 60) {
        secondsInput.value = '60';
    }
}