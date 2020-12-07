/*
    Arshdeep Kaur
	JS file for animation and logic handling
*/

window.onload = function () {

    // reference the embedded svg
    let stone = document.getElementById('stone');
    let paper = document.getElementById('paper');
    let scissor = document.getElementById('scissor');
    let userSelection = document.getElementById('user-selection');
    let machineSelection = document.getElementById('machine-selection');
    let winner = document.getElementById('winner');
    let loser = document.getElementById('loser');
    let draw = document.getElementById('draw');
    let userPlayer = document.getElementById('user-player');
    let machinePlayer = document.getElementById('machine-player');

    // reference specific target inside svg file
    let stoneSvg = stone.contentDocument.getElementById("f632692f-7f9f-4dfe-8d1f-c4b6c97b250b");
    let paperSvg = paper.contentDocument.getElementById("paper-layer");
    let scissorSvg = scissor.contentDocument.getElementById("scissor-layer");

    // set up and animations
    clearSelection(userSelection);
    clearSelection(machineSelection);

    let user_progress = 0;
    let machine_progress = 0;
    let user_selection = 0;
    let machine_selection = 0;

	// Events
    function addMouseEnterEvent(element) {
        element.addEventListener("mouseenter", function (event) {
            hoverIn(element);
        }, false);
    }

    function addMouseLeaveEvent(element) {
        element.addEventListener("mouseleave", function (event) {
            hoverOut(element);
        }, false);
    }

    function addClickEvent(elementIndex) {
        let elementSvg;

        if (elementIndex == 0) {
            elementSvg = stoneSvg;
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
            if (user_progress != 10 && machine_progress != 10) {
                user_selection = elementIndex;
                machine_selection = getMachineResponse();

				// Changing selection of user and machine
                changeSelection(userSelection, user_selection);
                changeSelection(machineSelection, machine_selection);

                let result = checkWin();

                // Move player and show who Won
                if (result == 0) {
                    user_progress++;
					// Showing result with animation
                    displayResult(winner);
					// Moving player image
                    movePlayer(userPlayer, window.getComputedStyle(userPlayer).marginTop);
                }
                else if (result == 1) {
                    machine_progress++;
					// Showing result with animation
                    displayResult(loser);
					// Moving player image
                    movePlayer(machinePlayer, window.getComputedStyle(machinePlayer).marginTop);
                }
                else {
					// Showing result with animation
                    displayResult(draw);
                }
            }
        }, true);
    }

    addPointer(stone);
    addPointer(paper);
    addPointer(scissor);

    addMouseEnterEvent(stone);
    addMouseLeaveEvent(stone);
    addMouseEnterEvent(paper);
    addMouseLeaveEvent(paper);
    addMouseEnterEvent(scissor);
    addMouseLeaveEvent(scissor);

    addClickEvent(0);
    addClickEvent(1);
    addClickEvent(2);

    function getMachineResponse() {
        return Math.floor(Math.random() * 3);
    }

    function checkWin() {
        if (user_selection == machine_selection)
            return -1; // Draw
        else {
            switch (user_selection) {
                case 0:
                    if (machine_selection == 1)
                        return 1; // Machine Won
                    else
                        return 0; // User Won
                case 1:
                    if (machine_selection == 0)
                        return 0; // User Won
                    else
                        return 1; // Machine Won
                case 2:
                    if (machine_selection == 0)
                        return 1; // Machine Won
                    else
                        return 0; // User Won
            }
        }
    }

    function changeSelection(element, selection) {
        clearSelection(element);

        if (selection == 0)
            element.contentDocument.getElementById("f632692f-7f9f-4dfe-8d1f-c4b6c97b250b").style.display = "block";
        else if (selection == 1)
            element.contentDocument.getElementById("paper-layer").style.display = "block";
        else if (selection == 2)
            element.contentDocument.getElementById("scissor-layer").style.display = "block";
    }

    function clearSelection(element) {
        element.contentDocument.getElementById("f632692f-7f9f-4dfe-8d1f-c4b6c97b250b").style.display = "none";
        element.contentDocument.getElementById("paper-layer").style.display = "none";
        element.contentDocument.getElementById("scissor-layer").style.display = "none";
    }

    function displayResult(element) {
        winner.style.display = "none";
        loser.style.display = "none";
        draw.style.display = "none";

        element.style.display = "block";
        result(element);

        if (user_progress == 10)
            alert('User Won!');
        else if (machine_progress == 10)
            alert('Computer Won!');
    }

    // animation(s)
    function doAnimation(element, options) {
        gsap.from(element, options);
    }

    function addPointer(element) {
        gsap.set(element, {
            css: {
                cursor: "pointer"
            }
        })
    }

    function hoverIn(element) {
        doAnimation(element, {
            duration: 0.5,
            ease: "back",
            scale: .9
        });
    }

    function hoverOut(element) {
        doAnimation(element, {
            duration: .5,
            ease: "none",
            scale: 1
        });
    }

    function click(element) {
        doAnimation(element, {
            duration: .5,
            ease: "elastic",
            scale: .9
        });
        doAnimation(element, {
            ease: "none"
        });
    }

    function result(element) {
        doAnimation(element, {
            duration: .5,
            ease: "power4",
            scale: .9
        });
        doAnimation(element, {
            ease: "none"
        });
    }

    function movePlayer(element, currentPosition) {
        gsap.set(element, {
            css: {
                "marginTop": "calc(" + currentPosition + " - 4%)"
            }
        });
    }
}