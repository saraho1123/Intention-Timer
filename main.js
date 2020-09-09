// When an activity category is clicked on (Exercise, Meditate, or Study), the associated border and icon should change colors to give a visual indication that it has been selected. Colors are provided in comp.

// HTML+CSS for different category buttons for new colors

// queryslector for each category button, and event listener
var studyButton = document.querySelector('.study');
var studyImg = document.querySelector('.study-img');
var studyActiveImg = document.querySelector('.study-active-img')

studyButton.addEventListener('click', changeColor)
// when button is clicked, calls function 
// function: access the HTML elements(class) to change the color of the border, color of the title, image/color of image(different img in Assets)
function changeColor() {
    studyButton.classList.toggle('study-active')
    studyImg.classList.toggle('hidden')
    studyActiveImg.classList.toggle('hidden')
}