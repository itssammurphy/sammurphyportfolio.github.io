window.addEventListener('scroll', revealElements);

var elementsToReveal = document.querySelectorAll('.reveal');

function revealElements() {
  for (var i = 0; i < elementsToReveal.length; i++) {
    var windowHeight = window.innerHeight;
    var revealTop = elementsToReveal[i].getBoundingClientRect().top;
    var revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      elementsToReveal[i].classList.add('active');
    } else {
      elementsToReveal[i].classList.remove('active');
    }
  }
}
