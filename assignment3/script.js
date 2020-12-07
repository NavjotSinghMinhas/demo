/*
    Priyanka Kaur
*/

window.onload = function () {

    // reference the embedded svg
    let win = document.getElementById('bird-win');
    let lose = document.getElementById('bird-lose');
    let draw = document.getElementById('bird-draw');
    let rock = document.getElementById('rock');
    let paper = document.getElementById('paper');
    let scissor = document.getElementById('scissor');
    let userSelection = document.getElementById('userSelection');
    let computerSelection = document.getElementById('computerSelection');

    // set up and animations
    clearInputs(userSelection);
    clearInputs(computerSelection);

    // reference specific target inside svg file
    let restartSvg = document.getElementById('restart').contentDocument.getElementById("restart");
    let rockSvg = rock.contentDocument.getElementById("rock");
    let paperSvg = paper.contentDocument.getElementById("paper");
    let scissorSvg = scissor.contentDocument.getElementById("scissor");

    let userScore = 0;
    let computerScore = 0;
    let user_selection = 0;
    let computer_selection = 0;

    // Events
    function useMouseEnterEvent(element) {
        element.addEventListener("mouseenter", function (event) {
            mouseHover(element);
        }, false);
    }

    function useMouseLeaveEvent(element) {
        element.addEventListener("mouseleave", function (event) {
            mouseHoverOut(element);
        }, false);
    }

    function useClickEvent(elementIndex) {
        let elementSvg;

        if (elementIndex == 0) {
            elementSvg = rockSvg;
        }
        else if (elementIndex == 1) {
            elementSvg = paperSvg;
        }
        else {
            elementSvg = scissorSvg;
        }

        elementSvg.addEventListener("click", function (event) {
            // Calling click animation
            click(elementSvg);

            // Check Winner
            if (userScore != 3 && computerScore != 3) {
                user_selection = elementIndex;
                computer_selection = Math.floor(Math.random() * 3);

                // Changing selection of user and machine
                changeSelection(userSelection, user_selection);
                changeSelection(computerSelection, computer_selection);

                let result = fetchWinner();

                // Move player and show who Won
                if (result == 0) {
                    userScore++;
                    // Showing result with animation
                    displayResult(win);
                }
                else if (result == 1) {
                    computerScore++;
                    // Showing result with animation
                    displayResult(lose);
                }
                else {
                    // Showing result with animation
                    displayResult(draw);
                }
            }
        }, true);
    }

    function fetchWinner() {
        // Draw
        if (user_selection == computer_selection)
            return -1;
        else {
            switch (user_selection) {
                case 0:
                    if (computer_selection == 1)
                        // Machine Won
                        return 1;
                    else
                        // User Won
                        return 0;
                case 1:
                    if (computer_selection == 0)
                        // User Won
                        return 0;
                    else
                        // Machine Won
                        return 1;
                case 2:
                    // Machine Won
                    if (computer_selection == 0)
                        return 1;
                    else
                        // User Won
                        return 0;
            }
        }
    }

    function changeSelection(element, selection) {
        clearInputs(element);

        if (selection == 0)
            element.contentDocument.getElementById("rock").style.display = "block";
        else if (selection == 1)
            element.contentDocument.getElementById("paper").style.display = "block";
        else if (selection == 2)
            element.contentDocument.getElementById("scissor").style.display = "block";
    }

    function clearInputs(element) {
        element.contentDocument.getElementById("rock").style.display = "none";
        element.contentDocument.getElementById("paper").style.display = "none";
        element.contentDocument.getElementById("scissor").style.display = "none";
    }

    function displayResult(element) {
        win.style.display = "none";
        lose.style.display = "none";
        draw.style.display = "none";

        element.style.display = "block";
        result(element);

        if (userScore == 3)
            alert('User won this game.');
        else if (computerScore == 3)
            alert('Computer won this game.');
    }

    usePointers(rockSvg);
    usePointers(paperSvg);
    usePointers(scissorSvg);
    usePointers(restartSvg);

    useMouseEnterEvent(restart);
    useMouseLeaveEvent(restart);
    useMouseEnterEvent(rock);
    useMouseLeaveEvent(rock);
    useMouseEnterEvent(paper);
    useMouseLeaveEvent(paper);
    useMouseEnterEvent(scissor);
    useMouseLeaveEvent(scissor);

    useClickEvent(0);
    useClickEvent(1);
    useClickEvent(2);

    restartSvg.addEventListener("click", function (event) {
        // Clearing svgs
        clearInputs(userSelection);
        clearInputs(computerSelection);
        win.style.display = "none";
        lose.style.display = "none";
        draw.style.display = "none";

        // Clearing progress
        userScore = computerScore = 0;
    });

    // animation(s) 
    function click(element) {
        gsap.from(element, {
            duration: .5,
            ease: "elastic",
            scale: .9
        });
        gsap.from(element, {
            ease: "none"
        });
    }

    function usePointers(element) {
        gsap.set(element, {
            css: {
                cursor: "pointer"
            }
        })
    }

    function result(element) {
        gsap.from(element, {
            duration: .5,
            ease: "power4",
            scale: .9
        });
        gsap.from(element, {
            ease: "none"
        });
    }

    function mouseHover(element) {
        gsap.from(element, {
            duration: 0.5,
            ease: "back",
            scale: .9
        });
    }

    function mouseHoverOut(element) {
        gsap.from(element, {
            duration: .5,
            ease: "none",
            scale: 1
        });
    }
}