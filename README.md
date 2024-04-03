# lda-momo

Libros Digitales Accesibles para todas las niñas y niños de Colombia

2023 - 2024

## Acerca del proyecto

_Objeto, actores y descripción del resultado._

## Aspecto técnico

El libro digital accesible (**LDA**) en su presente versión fue construido en el formato _Epub_ e integrado directamente con un lector para formato _Epub_ que se puede usar a través de cualquier **navegador web**.

Las principales ventajas de esta aproximación son:

- El uso del navegador web permite una mayor cobertura al ser un _software esencial_ en los dispositivos actuales.
- No requiere instalar _software_ adicional como lector de _Epub_ evitando variaciones en la experiencia ya que no depende del estado de los diferentes lectores en cuanto a la adopción del estándar de Epub 3.0+.
- Al ser independiente de algún _software_ de lectura _Epub_ se pueden aprovechar las posibilidades que tiene el formato _Epub_ para habilitar capacidades interactivas sin limitaciones.

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

En la carpeta epubReader se encuentra la implementación de lector de epubReader.

1. _index.html_ es el archivo de entrada al **LDA**
2. _/CSS/style.css_ tiene los estilos aplicados al lector dirigidos principalmente a maximizar el area de lectura, no es necesario modificarlos para hacer nuevas implementaciónes.
3. _/images/_ en esta carpeta se encuentra el icono del lector para reemplazarlos de acuerdo a la línea gráfica de cada implementación.
4. _/js/_ se encuentrá la librería **Epub.js** que es permite la carga del epub en el navegador, y el archivo _script.js_ 

   > _script.js_ es esencial en la implementación, en el se define la ruta de carga del epub y los datos que son persistentes en el libro digital.

    ```js
        // Cargar Epub
        var book = ePub("../momo/package.opf");
        
        // Objeto persistente con las preferencias del usuario
        var userPreferences = {
            ...
        }
    ```

### momo/
