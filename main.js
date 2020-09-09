// When an activity category is clicked on (Exercise, Meditate, or Study), the associated border and icon should change colors to give a visual indication that it has been selected. Colors are provided in comp.

// HTML+CSS for different category buttons for new colors

// queryslector for each category button, and event listener
var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');

studyButton.addEventListener('click', changeStudyColor);
meditateButton.addEventListener('click', changeMeditateColor);
exerciseButton.addEventListener('click', changeExerciseColor);
// meditateButton.addEventListener('click', changeMeditateColor);
// when button is clicked, calls function 
// function: access the HTML elements(class) to change the color of the border, color of the title, image/color of image(different img in Assets)

function changeColor(button, category) {
    button.classList.add(category);
}

function returnDefaultColor(button, category) {
    button.classList.remove(category);
}

function changeStudyColor() {
    changeColor(studyButton, 'study-active');
    returnDefaultColor(meditateButton, 'meditate-active');
    returnDefaultColor(exerciseButton, 'exercise-active');
}

function changeMeditateColor() {
    changeColor(meditateButton, 'meditate-active');
    returnDefaultColor(studyButton, 'study-active');
    returnDefaultColor(exerciseButton, 'exercise-active');
}

function changeExerciseColor() {
    changeColor(exerciseButton, 'exercise-active');
    returnDefaultColor(studyButton, 'study-active');
    returnDefaultColor(meditateButton, 'meditate-active');   
}