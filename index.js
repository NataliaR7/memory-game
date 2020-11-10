import StatusBar from "./components/js/statusBar.js";
render('#statusBar', StatusBar)



function render(targetElemnt, element) {
    document.querySelector(targetElemnt).insertAdjacentHTML('afterbegin', element());
}

