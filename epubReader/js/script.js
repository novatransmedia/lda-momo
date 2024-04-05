/* 
Scripts for LDA

> LANG ES/EN USED
> ADT = LDA = Libro digital Accesible
> LSC = Lengua de señas Colombiana = sign language video & video container

The epubReader/js/epub.js library is the EPUB reader, all 'parent.window' calls are to this library and it's configuration file epubReader/js/script.js

Page content ID: 
    $("#watch") -> Images/Art of the page
    $("#read") -> Text of the page
    $("#videoLSC") -> Sign language video of the page
*/

// Contains all the user preferences for persistence between pages
var userPreferences = {
    // -- Nav
    arrowNav: false, // Allow Keyboard navigation 
    autoPlay: false, // Allow AutoPlay

    // -- Reading
    showLSC: false, // Show Sign language video of the page
    easyText: false, // Show alternative "easy" text

    // -- Accesibility
    contrastOption: 0, // Current contrast option selected    
}

// Load Epub file, can be the *.epub adding an .zip file manager like [zip.js]
var book = ePub("../momo/package.opf");

// Render the selected book inside the "area" tag
// Go to Epub.js (https://github.com/futurepress/epub.js) documentation for further insight
var rendition = book.renderTo("area",
    {
        method: "default",
        width: "100%",
        height: "100%",
        allowScriptedContent: true,
        flow: "paginated"
    });
// Activate the rendered epub
var displayed = rendition.display();

// ---
// Keyboard navigation left/previus page
function prevPage() {
    if (userPreferences.arrowNav) {
        rendition.prev();
    }
}
// Event
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
// ---
// Keyboard navigation right/next page
function nextPage() {
    if (userPreferences.arrowNav) {
        rendition.next();
    }
}
// Event
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
// ---