function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.querySelectorAll("[include-html]");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            writeFromFile(elmnt,file);
        }
    }
}
var footerLoadCB = function() {
    let ccyear = document.getElementById("year");
    ccyear.innerHTML = new Date().getFullYear();
}

var headerLoadCB = function() {
    let navToggle = document.body.querySelector("#main-nav-toggle");
    navToggle.addEventListener("click", toggleDisplayGenerator("main-nav"));
}

function writeFromFile(elmnt,file) {
    /* Make an HTTP request using the attribute value as the file name: */
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            elmnt.removeAttribute("include-html");
            let loadCB = elmnt.getAttribute("loadCB");
            if (loadCB && window[loadCB]) {
                window[loadCB]();
                elmnt.removeAttribute("loadCB");
            }
        }
    }
    xhttp.open("GET", file, true);
    xhttp.send();
}

