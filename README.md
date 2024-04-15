[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/novatransmedia/lda-momo/blob/main/README.md)[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/novatransmedia/lda-momo/blob/main/README.en.md)

# lda-momo

Libros Digitales Accesibles para todas las niñas y niños de Colombia

2023 - 2024

## Acerca del proyecto

> [Haga clic para ver el LDA](https://www.gestioninclusiva.org/sites/default/files/recursos/MomoLDA/epubReader/index.html)

_Pendiente: Objeto, actores y descripción del resultado._

## Aspecto técnico

El libro digital accesible (**LDA**) en su presente versión fue construido en el formato _Epub_ e integrado directamente con un lector para formato _Epub_ que se puede usar a través de cualquier **navegador web**.

Las principales ventajas de esta aproximación son:

- El uso del navegador web permite una mayor cobertura al ser un _software esencial_ en los dispositivos actuales.
- No requiere instalar _software_ adicional como lector de _Epub_ evitando variaciones en la experiencia ya que no depende del estado de los diferentes lectores en cuanto a la adopción del estándar de Epub 3.0+.
- Al ser independiente de algún _software_ de lectura _Epub_ se pueden aprovechar las posibilidades que tiene el formato _Epub_ para habilitar capacidades interactivas sin limitaciones.
- El resultado es un **sitio web autocontenido**, por lo que para ver el LDA solo requiere subirse a cualquier servidor o sitio web y acceder desde al archivo _epubReader/index.html_ o alternativamente utilizar un servidor local para reproducirlo en un computador. Sin embargo la vía recomendada para el acceso local y fuera de línea es empaquetando y exportando para distintos sistemas operativos a través de herramientas de desarrollo convencionales para generar archivos ejecutables, como [ionic](https://ionicframework.com/) y/o [electron](https://www.electronjs.org/). Para la versión del proyecto actual se usaron dichas herramientas para generar un aplicativo para _Andriod_ y un ejecutable (_.exe_) para _Windows_.
  > En este repositorio no se incluyó el codigo para dichas exportaciones ya que son **fuertemente dependientes** de la herramienta y la versión usada, siendo lo más recomendable usar las versiones mas actualizadas o explorar alternativas futuras.

### Requerimientos

1. Para la modificación y adaptación de este implementación de **libro digital accesible** se requiere un conocimiento adecuado en desarrollo web: _HTML, CSS y JavaScript_ y ya que este proyecto se orientó a un ser de rápida implementación se recurrieron a librerías de uso común para agilizar el desarrollo:

   - [Boostrap 5.3.2](https://getbootstrap.com/) para la estructura y _responsive_.
   - [SASS](https://sass-lang.com/) para los estilos _CSS_.
   - [Jquery 3.5.1](https://jquery.com/)  para facilitar los llamados JavaScript.

2. El lector integrado **[Epub.js](https://github.com/futurepress/epub.js)** es una librería de _JavaScript_ para visualizar el contenido de documentos en formato _Epub_ en el navegador web, e incluye un número de funciones comunes en la lectura como la **navegación, paginación y persistencia de datos del libro digital**, capacidades necesarias para habilitar funciones avanzadas de personalización.

### Estructura del proyecto

```text
/
├── epubReader/
└── momo/
```

### epubReader/

En la carpeta **epubReader** se encuentra la implementación de lector de _Epub_.

1. _epubReader/index.html_ es el archivo de entrada al **LDA**
2. _epubReader/css/style.css_ tiene los estilos aplicados al lector dirigidos principalmente a maximizar el área de lectura, no es necesario modificarlos para hacer nuevas implementaciones.
3. _epubReader/images/_ en esta carpeta se encuentra el icono del lector para reemplazarlos de acuerdo a la línea gráfica de cada implementación.
4. _epubReader/js/_ se encuentra la librería _epubReader/js/epub.js_ que es permite la carga del epub en el navegador, y el archivo _epubReader/js/script.js_

    ```js
        // epubReader/js/script.js es esencial en la implementación.
        // Define la ruta de carga del epub y los datos que son persistentes en el libro digital.

        // Ruta del package Epub a cargar
        // La librería epub.js tambien puede soportar la versión comprimida del formato *.epub
        var book = ePub("../momo/package.opf");
        
        // Objeto persistente con las preferencias del usuario
        var userPreferences = {
            ...
        }
    ```

### momo/

1. Las carpetas ( _momo/audio_, _momo/css_, _momo/fonts_, _momo/images, _momo/smil_, _momo/video_ ) contienen los recursos generados para el libro. Todos los llamados a estos recursos se realizan dentro de las páginas de libro.
2. _momo/css_ y _momo/scss_ contienen las hojas de estilo scss y el resultado compilado en _momo/css/style.css_ si bien este archivo puede modificarse directamente se recomienda continuar usando **SASS** para ello

    - Instalar [NodeJs](https://nodejs.org/)
    - Instalar [SASS](https://sass-lang.com/) en el equipo usando el comando de consola:

    ```bash
        npm install -g sass
    ```

    - Ejecutar **SASS** usando el comando de consola:

    ```bash
        sass --watch scss/style.scss:css/style.css
    ```

    > De acuerdo a la necesidad **SASS** puede adicionalmente comprimir el codigo y usando librerías como [purgecss](https://purgecss.com/) se optimiza las hojas de estilos resultantes.

3. _momo/js_ contiene los archivos JavaScript usados por las librerías Boostrap y JQuery. Y el archivo _momo/js/script.js_

    ```js

       // momo/js/script.js es esencial en la implementación
       // Definen y documentan la navegación, acceso a la lengua de señas Colombiana, audios, texto alternativo y otras funciones del lector.

       function loadPage(type) {
        ...
       }
    ```

4. _momo/pages_ contiene los archivos en formato **xhtml** que corresponden a las páginas del libro, en general las páginas se encuentran estructuradas en 3 identificadores primarios:

   - [id = read] -> El texto de cada página.
   - [id = watch] -> Imágenes e ilustraciones de cada página.
   - [id = videoLSC] -> El video en Lengua de señas Colombiana, este se muestra de acuerdo a las preferencias de usuario.

    Las páginas se encuentran agrupadas por tipos así:

    - _momo/pages/info_: contiene las páginas de cubierta, guía de navegación, logos y otras páginas que no pertenecen al contenido de la historia del libro.
    - _momo/pages/content_: contiene las páginas de la historia de Momo de acuerdo al libro original.
    - _momo/pages/glossary_: contiene las definiciones de los términos identificados y enlazados en las páginas de la historia de Momo.

    Adicionalmente cada página identifica su tipo en el momento de la carga para cargar las preferencias de usuario:

    ```html
        <!-- 'cover', 'content', 'glossary' -->
        <body ... onload="loadPage('content')"> 
    ```

## Licencia

## Créditos y Logos
