direct = () => {

    const interval = state.intervals[state.difficulty];
    let button = state.directions[state.currentDirection];

    console.log('button: ', button)

    const direct = setInterval(() => {

        console.log('current =', state.currentDirection);

        const glow = setInterval(() => {
            buttonsArray[button].classList.toggle('glow');
            soundArray[button].play();
        }, 150)

        if(state.currentDirection > state.directions)
        setTimeout(() => {
            console.log(state.currentDirection, "click end")
            clearInterval(simClick)
        }, interval * 2 - 1);

        if(state.currentDirection === state.directions.length - 1){

            state.turn = 1;
            state.currentDirection = 0;
            
            clearInterval(direct);
            setTimeout(() => {
                buttonsArray[button].classList.remove('glow');
                clearInterval(glow);
            }, 299)
            setTimeout(() => {
                console.log(state.currentDirection, "click end")
                clearInterval(simClick)
            }, interval * 2 - 1);
        }
        else state.currentDirection+=1;

    }, interval * 2 + 1);

};

/*

Loop through the array for each loop call a

setTimeOut that:
    -based on the current part of the loop
        -'clicks' the button (toggles the glow on and off)
        -plays the associate sound

*/