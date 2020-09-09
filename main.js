var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');

studyButton.addEventListener('click', changeStudyColor);
meditateButton.addEventListener('click', changeMeditateColor);
exerciseButton.addEventListener('click', changeExerciseColor);

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