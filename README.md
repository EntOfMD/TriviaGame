## Trivia Game

### Timed Questions:

-   You'll create a trivia game that shows only one question until the player answers it or their time runs out.

*   If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

*   The scenario is similar for wrong answers and time-outs.

    -   If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.

    -   If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

*   On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

### Pseudo-code:

##### Components in the game:

-   Title
-   Time
-   Quiz
-   Answer

##### Variables to keep track of:

-   corrects
-   incorrects
-   timeouts

##### 'demo' Observations:

-   'Start' button before game starts, quiz and time component hidden until user clicks Start [x]
-   Timer starts countdown once user clicks Start [x]
    -   Timer stops at 0 [x]
-   Restarts when a new question is displayed -[WIP/buggy]
-   When user answer is chosen, quiz and timer component is hidden and answer component is displayed. [WIP/buggy]

-   Depending on the answer:
-   displays whether the choice was correct or not [implemented/buggy]
    -   if correct - display 'correct' or something similar
    -   if incorrect - display 'incorrect' or something similar
-   if unanswered and time hits 0
    -   displays time out [Working/buggy]
