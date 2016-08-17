/* Carga el CSS de la sección. */
function cargarCSS(seccion) {
  var oldStyle = document.getElementById('seccion-css');

  var newStyle = document.createElement('link');
  newStyle.setAttribute('id', 'seccion-css');
  newStyle.setAttribute('type', 'text/css');
  newStyle.setAttribute('rel', 'stylesheet');
  newStyle.setAttribute('href', 'styles/' + seccion + '.css')

  /* Cuando se termina de cargar el CSS de la nueva sección, elimina el de la sección anterior. */
  newStyle.addEventListener('load', function() {
    if (oldStyle != undefined) {
      document.head.removeChild(oldStyle);
    }
  });

  document.head.appendChild(newStyle);
}

/* Activa el link de la sección en el menú. */
function cargarMenu(seccion) {
  var menuItems = document.querySelectorAll('nav li');

  for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].setAttribute('class', '');
  }

  document.getElementById(seccion).setAttribute('class', 'activo');
}

/* Mueve el triangulo abajo del link de la sección en el menú. */
function cargarTriangulo(seccion) {
  var bodyRect = document.body.getBoundingClientRect();

  var trianguloElem = document.getElementById('triangulo');

  var seccionElem = document.getElementById(seccion);
  var seccionRect = seccionElem.getBoundingClientRect();

  var base = bodyRect.right - seccionRect.right;
  var desplazamiento = (seccionElem.offsetWidth - trianguloElem.offsetWidth) / 2;

  triangulo.style.right = base + desplazamiento + 'px';
  triangulo.style.visibility = 'visible';
}

/* Cambia el título de la página. */
function cargarTitulo(seccion) {
  document.title = seccion.charAt(0).toUpperCase() + seccion.slice(1) + ' - Game of Thrones';
}

/* Carga la nueva sección. */
function cargarSeccion(seccion) {
  var peticion = new XMLHttpRequest();

  peticion.addEventListener('readystatechange', function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        cargarMenu(seccion);
        cargarTriangulo(seccion);
        cargarCSS(seccion);
        cargarTitulo(seccion);

        document.getElementById('contenido').innerHTML = this.responseText;
      }
    }
  });

  peticion.open('POST', seccion + '.html', true);

  peticion.send();
}

/* Carga la nueva sección al cambiar de una sección a otra. */
addEventListener('hashchange', function(event) {
  var seccion = event.newURL.split('#').pop();

  cargarSeccion(seccion);
});

/* Carga la sección al ingresar en la página. */
addEventListener('load', function() {
  var seccion = window.location.hash.substr(1) || 'inicio';

  cargarSeccion(seccion);
});

/* Mueve el triangulo cuando la ventana cambia de tamaño. */
addEventListener('resize', function() {
  var seccion = window.location.hash.substr(1) || 'inicio';

  cargarTriangulo(seccion);
});
