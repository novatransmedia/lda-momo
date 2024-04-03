// Preferencias de usuario
var userPreferences = {
    // -- Navegación
    arrowNav: false, // Usar flechas del teclado para navegar
    autoPlay: false, // Reproducir automaticamente

    // -- Lectura
    showLSC: false, // Lengua de señas
    easyText: false, // Ver texto alternavivo

    // -- Accesibilidad
    contrastOption: 0, // Tipo de contraste seleccionado
    // colorOption: 0
}
//-- Cargar Epub
var book = ePub("../momo/package.opf");
var rendition = book.renderTo("area",
    {
        method: "default",
        width: "100%",
        height: "100%",
        allowScriptedContent: true,
        flow: "paginated"
    });
var displayed = rendition.display();
//-- 

function prevPage() {
    if (userPreferences.arrowNav) {
        rendition.prev();
    }
}

function nextPage() {
    if (userPreferences.arrowNav) {
        rendition.next();
    }
}

document.addEventListener(
    "keyup",
    (event) => {
        const keyName = event.key;
        if (keyName === "ArrowLeft") {
            prevPage()
        }
    },
    false,
);

document.addEventListener(
    "keyup",
    (event) => {
        const keyName = event.key;
        if (keyName === "ArrowRight") {
            nextPage()
        }
    },
    false,
);

// $(window).on("swipeleft", function (event) {
//     rendition.next();
// });

// $(window).on("swiperight", function (event) {
//     rendition.prev();
// });