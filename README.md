# Coding game

## Install
This project holds both back and front application for the coding game.
The back is a NodeJS application, the front is a React application.

Installation:
```shell
npm install
```
Start:
```shell
npm run start
```

## Instruction for the game
- In your code, DON'T create a function called "debug". It will break the test runner so your completion will be 0%.
- Please don't try to hunt the bugs on the application: it certainly have some.
The application was created to animate a game with reasonable people.
If you don't know enough reasonable people, play something else.

## TODO
- [x] Shortest mode
- [x] Bug when you left a debug instruction (0% completion)
- [x] Game modes : icons + hide code length if not shortest
- [x] Code flask bug when scroll (invisible)
- [x] Confirm before submit
- [x] Share code
- [x] After game: Add duration
- [x] Bug when the round ends but a player is disconnected
- [x] Save code on local storage
- [x] Delete forceSubmit
- [x] Bug on shortest score calculation: shortest code is in first position even if not complete
- [x] Same place if same score on score board
- [ ] Bug on timer (/ 1000 is not set everywhere)
- [ ] Bug on admin timer: when topic is finished manually => still appear
- [ ] Save game between restarts
- [ ] Presentation mode
- [ ] Final screen
- [ ] Refacto client WS => event based
- [ ] Handicaps
