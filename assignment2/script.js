/*
    Jodvir Singh
*/

window.onload = function () {

    // reference the embedded svg
    let rock = document.getElementById('rock');
    let paper = document.getElementById('paper');
    let scissor = document.getElementById('scissor');
    let userSelection = document.getElementById('user-selection');
    let computerSelection = document.getElementById('computer-selection');
    let win = document.getElementById('win');
    let lose = document.getElementById('lose');
    let draw = document.getElementById('draw');
    let alertWin = document.getElementById('alertWin');
    let alertLose = document.getElementById('alertLose');

    // set up and animations
    hideAlerts();
    clearSelection(userSelection);
    clearSelection(computerSelection);

    // reference specific target inside svg file
    let resetSvg = document.getElementById('reset').contentDocument.getElementById("reset");
    let rockSvg = rock.contentDocument.getElementById("rock");
    let paperSvg = paper.contentDocument.getElementById("paper");
    let scissorSvg = scissor.contentDocument.getElementById("scissor");
    let alertWinOkSvg = alertWin.contentDocument.getElementById("ok");
    let alertLoseOkSvg = alertLose.contentDocument.getElementById("ok");

    let user_progress = 0;
    let computer_progress = 0;
    let user_selection = 0;
    let computer_selection = 0;

    // Events
    function setMouseEnterEvent(element) {
        element.addEventListener("mouseenter", function (event) {
            mouseHover(element);
        }, false);
    }

    function addMouseLeaveEvent(element) {
        element.addEventListener("mouseleave", function (event) {
            mouseHoverOut(element);
        }, false);
    }

    function setClickEvent(elementIndex) {
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
            if (user_progress != 3 && computer_progress != 3) {
                user_selection = elementIndex;
                computer_selection = Math.floor(Math.random() * 3);

                // Changing selection of user and machine
                changeSelection(userSelection, user_selection);
                changeSelection(computerSelection, computer_selection);

                let result = computeWinner();

                // Move player and show who Won
                if (result == 0) {
                    user_progress++;
                    // Showing result with animation
                    displayResult(win);
                }
                else if (result == 1) {
                    computer_progress++;
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

    function computeWinner() {
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
        clearSelection(element);

        if (selection == 0)
            element.contentDocument.getElementById("rock").style.display = "block";
        else if (selection == 1)
            element.contentDocument.getElementById("paper").style.display = "block";
        else if (selection == 2)
            element.contentDocument.getElementById("scissor").style.display = "block";
    }

    function clearSelection(element) {
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

        if (user_progress == 3)
            showAlert('win');
        else if (computer_progress == 3)
            showAlert('lose');
    }

    setPointer(rockSvg);
    setPointer(paperSvg);
    setPointer(scissorSvg);
    setPointer(resetSvg);
    setPointer(alertWinOkSvg);
    setPointer(alertLoseOkSvg);

    setMouseEnterEvent(reset);
    addMouseLeaveEvent(reset);
    setMouseEnterEvent(rock);
    addMouseLeaveEvent(rock);
    setMouseEnterEvent(paper);
    addMouseLeaveEvent(paper);
    setMouseEnterEvent(scissor);
    addMouseLeaveEvent(scissor);
    setMouseEnterEvent(alertWin);
    addMouseLeaveEvent(alertWin);
    setMouseEnterEvent(alertLose);
    addMouseLeaveEvent(alertLose);

    setClickEvent(0);
    setClickEvent(1);
    setClickEvent(2);

    alertWinOkSvg.addEventListener("click", function (event) {
        resetGame();
    });

    alertLoseOkSvg.addEventListener("click", function (event) {
        resetGame();
    });

    // Show win/lose alert
    function showAlert(winOrLose) {
        if (winOrLose == "win") {
            alertWin.style.display = "block";
            result(alertWin);
        }
        else {
            alertLose.style.display = "block";
            result(alertLose);
        }
    }

    // Hide win/lose alert
    function hideAlerts() {
        alertWin.style.display = "none";
        alertLose.style.display = "none";
    }

    resetSvg.addEventListener("click", function (event) {
        resetGame();
    });

    function resetGame() {
        // Clearing svgs
        clearSelection(userSelection);
        clearSelection(computerSelection);
        win.style.display = "none";
        lose.style.display = "none";
        draw.style.display = "none";

        // Clearing progress
        user_progress = computer_progress = 0;

        hideAlerts();
    }

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

    function setPointer(element) {
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