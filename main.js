const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
let lastHole
let timeUp = false
let score = 0


const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomHole = (holes) => {
    const index = Math.floor(Math.random() * holes.length)
    const hole = holes[index]

    if (hole === lastHole) {
        console.log('Ah nah thats the same one bud')
        return randomHole(holes)
    }

    lastHole = hole
    return hole
}

const peep = () => {
    const time = randomTime(500, 1000)
    const hole = randomHole(holes)
    hole.classList.add('up')
    setTimeout(() => {
        hole.classList.remove('up')
        if(!timeUp) peep()
    }, time)
}

const startGame = () => {
    scoreBoard.textContent = 0
    timeUp = false
    score = 0
    peep()
    setTimeout(() => timeUp = true, 10000)
}

const bonk = (e) => {
    if(!e.isTrusted) return; // cheater!
    score++
    scoreBoard.textContent = score;
    this.parentNode.classList.remove('up')
}

moles.forEach(mole => mole.addEventListener('click', bonk))