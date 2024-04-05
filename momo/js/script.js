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

// Variables
var totalContrastOptions = 2; // total of contrast options set
var reduceLSCLayout = false; // switch to basic layout for responsive since the current version is tailor to *THIS* book content
// ---

// load configuration on each page

// "type" allows to alter the configuration for diferent parts of the book
// type = 'cover', 'content', 'glossary'
function loadPage(type) {
    loadUserPreferences(type)
    loadLSCVisibility(type)
    loadContrast()
}

// user preferences loaded from reader/parent object called "userPreferences"
function loadUserPreferences(type) {

    // if keyboard Navigation is active
    $('#opt_keyboardNav')[0].checked = parent.window.userPreferences.arrowNav
    $("#opt_keyboardNav").change(function (e) {
        e.preventDefault();
        parent.window.userPreferences.arrowNav = !parent.window.userPreferences.arrowNav
        loadLSCVisibility(type)
    });

    // if show LSC is active
    $("#opt_showLSC")[0].checked = parent.window.userPreferences.showLSC
    $("#opt_showLSC").change(function (e) {
        e.preventDefault();
        parent.window.userPreferences.showLSC = !parent.window.userPreferences.showLSC
        loadLSCVisibility(type)
    });

    // TODO autoPlay feature not implemented > activate when ready
    // $("#opt_autoPlay")[0].checked = parent.window.userPreferences.autoPlay
    // $("#opt_autoPlay").change(function (e) {
    //     e.preventDefault();
    //     parent.window.userPreferences.autoPlay = !parent.window.userPreferences.autoPlay
    // });
}

// show LSC on load page if the option has been selected by the user
function loadLSCVisibility(type) {
    // If the page type is content or glossary set the LSC video along with the text and image
    if (type === "content" || type === "glossary") {
        $("#videoLSC")[0].currentTime = 0;
        if (parent.window.userPreferences.showLSC) {
            $("#watch").removeClass('d-none')
            $("#read").addClass('col-sm-6 shadow overflow-hidden')
            $("#videoLSC")[0].play()
            if (reduceLSCLayout) {
                $("#read").find("div[class^='col-']").addClass("w-75 mx-auto")
            }
        } else {
            $("#watch").addClass('d-none')
            $("#read").removeClass('col-sm-6 shadow overflow-hidden')
            $("#videoLSC")[0].pause()
            if (reduceLSCLayout) {
                $("#read").find("div[class^='col-']").removeClass("w-75 mx-auto")
            }
        }
    }
    // If the page type is the intro video, replaces the video 
    if (type === "intro") {
        $("#videoIntro")[0].currentTime = 0
        $("#videoIntro")[0].pause()
        $("#videoIntroLSC")[0].currentTime = 0
        $("#videoIntroLSC")[0].pause()
        if (parent.window.userPreferences.showLSC) {
            $("#watchLSC").removeClass('d-none')
            $("#watch").addClass('d-none')
            $("#videoIntroLSC")[0].play()
        } else {
            $("#watchLSC").addClass('d-none')
            $("#watch").removeClass('d-none')
            $("#videoIntro")[0].play()
        }
    }
}

// switch constrast modes:
// 0: default look as the original book
// 1: reduced background alternative 
// 2: white background
// More contrast types can be added
// TODO color alternatives
function loadContrast() {
    switch (parent.window.userPreferences.contrastOption) {
        case 0:
            $("#mainPage").css("background-color", "var(--page-bg-main)");
            $("#mainPage").css("background-image", "url(../../images/img_bg.jpg)");
            $("#mainPage").css("background-blend-mode", "overlay");

            $("#indice").css("background-color", "var(--page-bg-main)");
            $("#indice").css("background-image", "url(../../images/img_bg.jpg)");
            $("#indice").css("background-blend-mode", "overlay");

            $(".btn-close").css("background-color", "var(--nav-back)");
            break;
        case 1:
            $("#mainPage").css("background-color", "var(--page-bg-main)");
            $("#mainPage").css("background-image", "url(../../images/img_bg.jpg)");
            $("#mainPage").css("background-blend-mode", "soft-light");

            $("#indice").css("background-color", "var(--page-bg-main)");
            $("#indice").css("background-image", "url(../../images/img_bg.jpg)");
            $("#indice").css("background-blend-mode", "soft-light");
            break;

        case 2:
            $("#mainPage").css("background-image", "unset");
            $("#mainPage").css("background-color", "white");

            $("#indice").css("background-image", "unset");
            $("#indice").css("background-color", "white");

            $(".btn-close").css("background-color", "var(--nav-face)");

            break;

        // case 3:
        //     $("#mainPage").css("background-image", "unset");
        //     $("#indice").css("background-image", "unset");
        //     break;

        default:
            break;
    }
}
// ---
// switch LSC video on intro page and set the user preference on LSC
function showLSCintro() {
    $("#videoIntro")[0].currentTime = 0
    $("#videoIntro")[0].pause()
    $("#videoIntroLSC")[0].currentTime = 0
    $("#videoIntroLSC")[0].pause()

    if (!parent.window.userPreferences.showLSC) {
        parent.window.userPreferences.showLSC = true
        $("#watchLSC").removeClass('d-none')
        $("#watch").addClass('d-none')
        $("#videoIntroLSC")[0].play()

    } else {
        parent.window.userPreferences.showLSC = false
        $("#watchLSC").addClass('d-none')
        $("#watch").removeClass('d-none')
        $("#videoIntro")[0].play()
    }
    $("#opt_showLSC")[0].checked = parent.window.userPreferences.showLSC
}
// switch LSC video on content/glossary page and set the user preference on LSC
function showLSC() {
    $("#videoLSC")[0].currentTime = 0

    if (!parent.window.userPreferences.showLSC) {
        parent.window.userPreferences.showLSC = true

        $("#watch").removeClass('d-none')
        $("#read").addClass('col-sm-6 shadow overflow-hidden')
        $("#videoLSC")[0].play()
        if (reduceLSCLayout) {
            $("#read").find("div[class^='col-']").addClass("w-75 mx-auto")
        }

    } else {
        parent.window.userPreferences.showLSC = false
        $("#watch").addClass('d-none')
        $("#read").removeClass('col-sm-6 shadow overflow-hidden')
        $("#videoLSC")[0].pause()
        if (reduceLSCLayout) {
            $("#read").find("div[class^='col-']").removeClass("w-75 mx-auto")
        }
    }
    $("#opt_showLSC")[0].checked = parent.window.userPreferences.showLSC
}
// activate audio narration on current page
function listenNarration() {
    $("#narracion")[0].currentTime = 0
    $("#narracion")[0].play()
    $("#descripcion")[0].currentTime = 0
    $("#descripcion")[0].pause()
}
// activate audio description on current page
function listenDescription() {
    $("#narracion")[0].currentTime = 0
    $("#descripcion")[0].currentTime = 0
    $("#narracion")[0].pause()
    $("#descripcion")[0].play()
}
// activate audio narration alternative on current page
function listenDefinition() {
    $("#narracion")[0].currentTime = 0
    $("#narracion")[0].play()
}
// switch text to easy mode
function showEasyText(idPage) {
    // replace the original text for easy text for cognitive access. For *THIS* book only one case use was found
    switch (idPage) {
        case "outro":
            var outroText = [
                `<p class="text-start">
                <span id="LF-139"><strong>Momo</strong></span>
                <span id="LF-140">nació</span>
                <span id="LF-141">en 2017.</span>
            </p>
            <p class="text-start">
                <span id="LF-142">Llegó a</span>
                <span id="LF-143">nuestro</span>
                <span id="LF-144">hogar</span>
                <span id="LF-145">en el</span>
                <span id="LF-146">2018.</span>
            </p>
            <p class="text-start">
                <span id="LF-147">En una de</span>
                <span id="LF-148">sus</span>
                <span id="LF-149">aventuras</span>
                <span id="LF-150">tuvo</span>
                <span id="LF-151">una fractura</span>
                <span id="LF-152">en la</span>
                <span id="LF-153">pata</span>
                <span id="LF-154">derecha</span>
                <span id="LF-155">que no</span>
                <span id="LF-156">fue atendida</span>
                <span id="LF-157">y</span>
                <span id="LF-158">decidimos</span>
                <span id="LF-159">adoptarlo.</span>
            </p>
            <p class="text-start">
                <span id="LF-160">Durante un mes</span>
                <span id="LF-161">luchamos</span>
                <span id="LF-162">contra la</span>
                <span id="LF-163">infección,</span>
                <span id="LF-164">pero ya</span>
                <span id="LF-165">estaba</span>
                <span id="LF-166">muy avanzada</span>
                <span id="LF-167">y tuvimos</span>
                <span id="LF-168">que</span>
                <span id="LF-169">amputar.</span>
            </p>
            <p class="text-start">
                <span id="LF-170">Es</span>
                <span id="LF-171">juguetón,</span>
                <span id="LF-172">amoroso y</span>
                <span id="LF-173">muy</span>
                <span id="LF-174">travieso.</span>
                <span id="LF-175">Perdió</span>
                <span id="LF-176">una pata,</span>
                <span id="LF-177">pero a</span>
                <span id="LF-178">cambio</span>
                <span id="LF-179">encontró</span>
                <span id="LF-180">una familia</span>
                <span id="LF-181">que lo</span>
                <span id="LF-182">hace muy</span>
                <span id="LF-183">feliz.</span>
            </p>`,
                `<p class="text-start">
                <strong>Momo</strong> nació en 2017 y fue adoptado en 2018.
            </p>
            <p class="text-start">
                En uno de sus juegos se partió una de sus patas delanteras,
                por la infección que le dio fue necesario quitársela.
            </p>
            <p class="text-start">
                Sin embargo, él es juguetón, amoroso y travieso.
            </p>
            <p class="text-start">
                Ahora tiene una familia que lo hace feliz.
            </p>`
            ]
            if (parent.window.userPreferences.easyText) {
                $("#easyTextContainer").html(outroText[0]);
            } else {
                $("#easyTextContainer").html(outroText[1]);
            }
            parent.window.userPreferences.easyText = !parent.window.userPreferences.easyText
            break;
        default:
            break;
    }
}
// switch contrast option and set the user preference
function changeContrast() {
    if (parent.window.userPreferences.contrastOption < totalContrastOptions) {
        parent.window.userPreferences.contrastOption++;
    } else {
        parent.window.userPreferences.contrastOption = 0;
    }
    loadContrast()
}
// Events --
// Keyboard navigation left/previus page
document.addEventListener(
    "keyup",
    (event) => {
        const keyName = event.key;
        if (keyName === "ArrowLeft") {
            parent.window.prevPage(); // reader/epub.js navigation
        }
    },
    false,
);
// Keyboard navigation right/next page
document.addEventListener(
    "keyup",
    (event) => {
        const keyName = event.key;
        if (keyName === "ArrowRight") {
            parent.window.nextPage(); // reader/epub.js navigation
        }
    },
    false,
);
// Page navigation ---
// Disable for this version require fix for lateral navigation
/*
function isNumber(value) {
    return typeof value === 'number';
}
function navGoToPage() {
    // TODO fix iframe location
    let dest = $('#opt_goToPage').val()
    if (isNumber(Number.parseInt(dest)) && Number.parseInt(dest) > 0 && Number.parseInt(dest) < 44) {
        var url = `../content/p-0${dest}.xhtml`
        if (dest < 10) {
            url = `../content/p-00${dest}.xhtml`
        }
        parent.window.document.body.querySelector("iframe").contentWindow.location.href = url
    } else {
        $('#opt_goToPage')[0].value = ""
    }
}
*/