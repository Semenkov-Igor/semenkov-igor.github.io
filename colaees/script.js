'use strict'

const dotBox = document.getElementById('dot-box');
let slideIndex = 1;
showSlides(slideIndex);

dotBox.addEventListener('click', onDotBoxClick);

function onDotBoxClick(event) {
  console.log(event)
  switch (true) {
    case event.target.classList.contains('first-slide'):
      showSlides(slideIndex = 1);
      break;
    case event.target.classList.contains('second-slide'):
      showSlides(slideIndex = 2);
      break;
    case event.target.classList.contains('third-slide'):
      showSlides(slideIndex = 3);
      break;
  }
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slides");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}