const playButton = document.getElementById('Play');
const howToPlay = document.getElementById('howToPlayButton');
const ranking = document.getElementById('rankingButton');
const popupCloseBtn = document.getElementById('closeBtn');
const popup = document.getElementById("popup");


playButton.addEventListener('click' , showGamePlate);
howToPlay.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);


function showGamePlate() {
    const menuOverlay = document.getElementsByClassName('overlay');
    for (let i = 0; i < menuOverlay.length; i++) {
        menuOverlay[i].style.display = 'none';
    }

    const menuContainr = document.getElementsByClassName('menu-container');
    for (let i = 0; i < menuContainr.length; i++) {
        menuContainr[i].style.display = 'none';
    }

    const gamePlate = document.getElementById('gamePlate');
gamePlate.style.display = 'grid'
}


/* Open/Close Popup functions */
function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}


