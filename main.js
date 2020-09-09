// When an activity category is clicked on (Exercise, Meditate, or Study), the associated border and icon should change colors to give a visual indication that it has been selected. Colors are provided in comp.

// HTML+CSS for different category buttons for new colors

// queryslector for each category button, and event listener
var studyButton = document.querySelector('.study');
// var studyImg = document.querySelector('.study-img');
// var studyActiveImg = document.querySelector('.study-active-img');
// var meditateButton = document.querySelector('.meditate');
// var meditateImg = document.querySelector('.meditate-img');
// var meditateActiveImg = document.querySelector('.meditate-active-img')

studyButton.addEventListener('click', changeStudyColor);
// meditateButton.addEventListener('click', changeMeditateColor);
// when button is clicked, calls function 
// function: access the HTML elements(class) to change the color of the border, color of the title, image/color of image(different img in Assets)

 function changeColor(button,category) {
     button.classList.toggle(category);
//     img.classList.toggle('hidden');
//     activeImg.classList.toggle('hidden');
}

 function changeStudyColor() {
     changeColor(studyButton, 'study-active');
}

// function changeMeditateColor() {
//     changeStudyColor()
//     changeColor(meditateButton, meditateImg, meditateActiveImg, 'meditate-active');
// }
