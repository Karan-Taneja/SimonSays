//----State

const state = {

    playing: false,
    
    turn: 0,
    rounds: 0,

    directions: [],
    nextDirection: null,
    playerInput: [],
    currentDirection: 0,
    
    difficulty: 1000,

}

/*---------CURRENT ERRORS

-Fixed by not using an actual click and instead faking a click

*/

//----Query Selectors

const simon = document.querySelector('.js-simon');
const rounds = document.querySelector('.js-rounds');
const play = document.querySelector('.js-play');
const green = document.querySelector('.js-green');
const red =  document.querySelector('.js-red');
const blue = document.querySelector('.js-blue');
const yellow =  document.querySelector('.js-yellow');

const soundG = new Audio('./src/simonSound1.mp3');
const soundR = new Audio('./src/simonSound2.mp3');
const soundY = new Audio('./src/simonSound3.mp3');
const soundB = new Audio('./src/simonSound4.mp3');
const soundX = new Audio('./src/buzzer.mp3');

//---Database

const directions = [0, 1, 2, 3];
const buttonsArray = [green, red, yellow, blue];
const soundArray = [soundG, soundR, soundY, soundB, soundX]

//---Functions

getNextDirection = () => {
    const direction = Math.ceil(Math.random() * 3);
    state.nextDirection = directions[direction];
}

addNextDirection = () => {
    state.directions.push(state.nextDirection);
}

const direct = (directions, interval) => {

    for(let i = 0; i < directions.length; i++){
        state.currentDirection += 1;
        const d = directions[i]
        setTimeout(() => {
            setTimeout(() => {
                buttonsArray[d].classList.add('glow');
                soundArray[d].play();
                setTimeout(() => {
                    buttonsArray[d].classList.remove('glow');
                    if(i === directions.length - 1)
                    setTimeout(() => {
                        state.turn = 1;
                    }, 100)
                }, 150 * (i+1)) 
            }, 150 * (i+1)) 
        }, interval * (i+1))
    }

}


//----Event Listeners

simon.addEventListener('click', e => {

    if(e.target.classList.contains('js-play')){
        state.playing = true;
    }

    if(state.playing === true){
        
        play.classList.add('hidden');
        
        if(state.turn === 0){
            state.playerInput = [];
            getNextDirection();
            addNextDirection();
            direct(state.directions, state.difficulty)
        }
    }

    if(state.playing === true){

        const index = e.target.attributes['data-index'];

        if(index && state.turn === 1){

            const val = index.value;

            state.playerInput.push(parseInt(val));

            const last = state.playerInput.length - 1;
            const dirEnd = state.directions.length - 1;
            const currDir = state.directions[last]
            const lastDir = state.directions[dirEnd];
            const current = state.playerInput[last];

            if(val === "0"){
                soundG.play().catch(() => {
                    soundG.play();
                });
            }
            else if(val === "1"){
                soundR.play().catch(() => {
                    soundR.play();
                });
            }
            else if(val === "2"){
                soundY.play().catch(() => {
                    soundY.play();
                });
            }
            else if(val === "3"){
                soundB.play().catch(() => {
                    soundB.play();
                });
            }
            else{
                soundX.play().catch(() => {
                    soundX.play();
                });
            };

            if(current !== currDir || last > dirEnd){
                state.playing = false;
                state.directions = [];
                state.playerInput = [];
                state.rounds = 0;
                rounds.innerText = state.rounds;
                state.turn = 0;
                soundX.play().catch(() => {
                    soundX.play();
                });
                play.classList.remove('hidden');
            }
            else if(last === dirEnd && current === lastDir){
                state.rounds += 1;
                rounds.innerText = state.rounds;
                state.playerInput = [];
                getNextDirection();
                addNextDirection();
                direct(state.directions, state.difficulty)
            }
        }
        else{
            return;
        }

    }
})

