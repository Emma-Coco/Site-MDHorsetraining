// Interractions avec la barre de navigation

const navLinks = document.querySelectorAll('.nav li');
const navLinksText = document.querySelectorAll('.nav li a');

navLinksText.forEach(link => {
    link.addEventListener('mouseover', function() {
      navLinksText.forEach(link => link.classList.remove('bold'));
      this.classList.add('bold');
      
    });
  });

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
  });
});


const languesLinks = document.querySelectorAll('.langues li');
const languesLinksText = document.querySelectorAll('.langues li a');

languesLinksText.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    languesLinksText.forEach(link => link.classList.remove('bold'));
    this.classList.add('bold');
    languesLinks.forEach(link => link.classList.remove('active'));
    this.parentElement.classList.add('active');
  });
});




// Création du carousel

let compteur = 0; //compteur permettant de connaître l'image où on se trouve
let timer, elements, slides, slideWidth;

window.onload = () => {
// On récupère le diaporama
const diapo = document.querySelector(".carouselContainer");
elements = document.querySelector(".carousel-list");
let element = document.querySelector(".carousel-list li")

// On clone les 3 premières images
let firstThreeImages = Array.from(elements.children).slice(0, 3); // Sélectionne les 3 premiers éléments

firstThreeImages.forEach(image => {
  let clonedImage = image.cloneNode(true); // Clone l'élément
  elements.appendChild(clonedImage); // Ajoute le clone à la fin de la liste
});

  slides = Array.from(elements.children);

  // On récupère la largeur des trois images visibles (=le wrapper)

  slideWidth = element.getBoundingClientRect().width;


  // On récupère les flèches

  let next = document.querySelector(".nav-droite");
  let prev = document.querySelector(".nav-gauche");


  //On gère le clic

  next.addEventListener("click", slideNext);
  prev.addEventListener("click", slidePrev);

  // On automatise le défilement
  timer = setInterval(slideNext, 2000)


}

/**
 * cette fonction fait défiler le diaporama vers la droite
 */

function slideNext(){

  // On incrémente le compteur

  compteur++;
  elements.style.transition = "1s linear";

  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;

  // On attend la fin de la transition et on rembobine de façon cachée
  setTimeout(function(){
    if(compteur >= slides.length - 3){
      compteur = 0;
      elements.style.transition = "unset";
      elements.style.transform = "translateX(0)";
    }
  }, 1000)


}

/**
 *  cette fonction fait défiler le diaporama vers la gauche
 */
function slidePrev(){
  // on décrémente le compteur
  compteur--;
  elements.style.transition = "1s linear";

  if(compteur < 0){
    compteur = slides.length - 3;
    let decal = -slideWidth * compteur;
    elements.style.transition = "unset";
    elements.style.transform = `translateX(${decal}px)`;
    setTimeout(slidePrev, 1);
  }

  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;

}