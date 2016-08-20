var desplegablesTitle = document.getElementsByClassName('desplegable-title');

for (var i = 0; i < desplegablesTitle.length; i++) {
  desplegablesTitle[i].addEventListener('click', function() {
    var desplegableBody = this.nextElementSibling;

    desplegableBody.classList.toggle('oculto');
    desplegableBody.classList.toggle('visible');

    this.classList.toggle('desplegado');
  });
}
