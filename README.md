# Memory Game Project

## Table of Contents

* [About](#About)
* [Contributing](#contributing)

## About

"Memory Game Project" is an implemention the classic card game, where:

1. Mix up the cards.
2. Lay them in rows, face down.
3. Turn over any two cards.
4. If the two cards match, keep them.
5. If they don't match, turn them back over.
6. Remember what was on each card and where it was.
7. The game is over when all the cards have been matched.

[index.html](https://github.com/pben369/memory-Game/blob/master/index.html) and 
[app.css](https://github.com/pben369/memory-Game/blob/master/css/app.css) implements the front end with 16 cards in a deck.

[app.js](https://github.com/pben369/memory-Game/blob/master/js/app.js) implements all the all functionality.
It implements following features:
1. The game randomly shuffles the cards. A user wins once all cards have successfully been matched.
2. When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.
3. A restart button allows the player to reset the game board, the timer, and the star rating.
4. The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1).The number of moves needed to change the rating is up to you, but it should happen at some point.
5. When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.
6. Game displays the current number of moves a user has made.



## Contributing

As this is just a course project, no contributions are accepted.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
