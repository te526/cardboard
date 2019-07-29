const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// var timer = new easytimer.Timer();
// timer.start();
// timer.addEventListener('secondsUpdated', function (e) {
//     $('#basicUsage').html(timer.getTimeValues().toString())
// })

var timer = new easytimer.Timer();
timer.start({ countdown: true, startValues: { seconds: 210 } });
timer.addEventListener('secondsUpdated', function (e) {
    $('#basicUsage').html(timer.getTimeValues().toString())
})
timer.addEventListener('targetAchieved', function (e) {
    alert('DONE!!')
timer.addEventListener(disableCards);
});

function flipcard() {
    if (lockBoard) return;
    if (this == firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    //set card to glow
   
    lockBoard = true;
    // not a match

    setTimeout(() => {
       
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 2500);
}

function resetBoard() 
{
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener('click', flipcard));