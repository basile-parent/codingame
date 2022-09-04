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
- [x] Bug on timer (/ 1000 is not set everywhere)
- [x] Bug on admin timer: when topic is finished manually => still appear
- [x] Save game between restarts
- [x] Toaster / disable if action (submit) cannot be done because server is disconnected
- [x] More visible disconnection on admin
- [x] Presentation mode
- [x] Final screen
- [x] ~~Reinit game should clear local storage stored code~~
- [x] ~~Calculate topic position (for AfterGame component) in the back~~
- [x] Podium: Real players
- [x] Podium: Same position players
- [x] Podium: Only 1 or 2 players
- [ ] Bug prod: end timer loop
- [ ] Admin: delete players
- [ ] Deployment & CD
- [ ] Podium: Manual launch
- [x] Refacto client WS => event based
- [ ] Go Redux !
- [ ] Leaderboard: Bug with scroll when the score appear (the animation of the green score create a temporary overflow)
- [ ] Mutualise back and front (types and src)
- [ ] Handicaps
