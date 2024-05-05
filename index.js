document.addEventListener("DOMContentLoaded", () => {       // The DOMContentLoaded event fires when the HTML document has been completely parsed, and all deferred scripts (<script defer src="…"> and <script type="module">) have downloaded and executed. It doesn't wait for other things like images, subframes, and async scripts to finish loading.

    let wrapper = document.getElementById("ping-pong-wrapper");
    let table = document.getElementById("ping-pong-table");

    let paddle1 = document.getElementById("paddle1");
    let paddle1Y = table.offsetHeight / 2 - paddle1.offsetHeight / 2; // starting point of paddle
    paddle1.style.top = `${paddle1Y}px`;

    // adding paddle functionality by arrow keys-
    document.addEventListener("keydown", (event) => {
        event.preventDefault();  // it will prevent the default functioning (scrolling) of the arrow key from happening

        console.log(event.key);
        if (event.keyCode == 38 && paddle1Y > 0) {  // means we are pressing the up arrow key
            paddle1Y -= 10;
        }
        else if (event.keyCode == 40 && paddle1Y < table.offsetHeight - paddle1.offsetHeight) {
            paddle1Y += 10;
        }

        paddle1.style.top = `${paddle1Y}px`;
    })


    // paddle2-
    let paddle2 = document.getElementById("paddle2");

    let paddle2Y = table.offsetHeight / 2 - paddle2.offsetHeight / 2;  // starting point of paddle2
    paddle2.style.top = `${paddle2Y}px`;

    // adding paddle functionality by mouse pointer-
    document.addEventListener("mousemove", (event) => {
        let mousepoint = event.clientY;  // clientY gives the y coordinate of the mouse pointer and clientX gives x coordinate
        paddle1Y = mousepoint - table.offsetTop - paddle1.offsetHeight / 2;  // now when pointer will be at the center of the paddle, from there it will start moving
        paddle2Y = mousepoint - table.offsetTop - paddle2.offsetHeight / 2;

        // for paddle-
        if (
            paddle1Y > 0 &&
            paddle1Y < table.offsetHeight - paddle1.offsetHeight &&
            event.clientX <= wrapper.offsetWidth / 2
        ) {
            paddle1.style.top = `${paddle1Y}px`;
        }
        // for paddle2-
        else if (
            paddle2Y > 0 &&
            paddle2Y < table.offsetHeight - paddle2.offsetHeight &&
            event.clientX > wrapper.offsetWidth / 2
        ) {
            paddle2.style.top = `${paddle2Y}px`;
        }
    })

    
    let ball = document.getElementById("ball");
    let ballX = 20;  // X coordinate of the ball
    let ballY = 20;  // Y coordinate of the ball
    let dx = 4;     // we will use it to move the ball on x axis by incrementing and decrementing it in the gameball function
    let dy = 4;     // we will use it to move the ball on y axis by incrementing and decrementing it in the gameball function


    function gameball() {
        ballX += dx;
        ballY += dy;

        ball.style.left = `${ballX}px`;  // will use it to move the ball on x axis
        ball.style.top = `${ballY}px`;   // will use it to move the ball on y axis

        // if ball collides with paddle1-
        if (ballX < (paddle1.offsetWidth + paddle1.offsetLeft) &&
            (ballY - ball.offsetHeight) <= (paddle1Y + paddle1.offsetHeight) &&
            ballY >= paddle1Y
            ||
            // if ball collides with paddle2-
            ballX + ball.offsetWidth >= paddle2.offsetLeft &&
            (ballY - ball.offsetHeight) <= (paddle2.offsetTop + paddle2.offsetHeight) &&
            ballY >= paddle2.offsetTop
        ) {
            dx *= -1;
        }


        // If ball collides with the border of the table on x axis, game-over-
        let flag = true;   // If we have to repeat the animation, means if game is not over then flag will be true and if game will be over then flag will be false
        if (ballX < 0 || ballX > (table.offsetWidth - ball.offsetWidth)) {
            let wrapper = document.getElementById("ping-pong-wrapper");
            wrapper.style.display = "none";
            let gameOver = document.getElementById("game-over");
            gameOver.style.display = "block";

            flag = false;  // because game is over
        }


        // if ball touches to border of the table on y axis, change the direction-
        if ( (ballY + ball.offsetHeight) > table.offsetHeight || ball.offsetTop < 0) {
            dy *= -1;
        }


        // if game is not over, we have to repeat the animation again and again so that the game continues
        if (flag == true) {
            requestAnimationFrame(gameball); // gameball will be considered a callback function and passed as an argument. requestAnimatioFrame will execute this function again and again and this will look like an animation. requestAnimation frame will automatically adjust the speed of the repeated execution of this function, so that it looks like an animation
        }

    }

    gameball();   // execute gameball function
})