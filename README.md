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
- [ ] Bug timer admin => refresh toutes les 2 secondes parfois
- [ ] Présentation => bug sur localeCompare (complètement KO)
- [ ] Slides: Bien expliquer le mode shortest
- [ ] Popup instruction : timer décrémente
- [ ] Share code: Popup: ajouter de la transparence + bouton de fermeture
- [ ] Silver medal : couleur trop similaire aux items 4+
- [ ] debug is not defined
- [ ] "Tous les tests" ne s'arrête pas quand ça fail
- [x] Popup info: "Entrée" pour fermer
- [ ] Onglet fermé = timer 5:00, non validation = timer 4:59
- [ ] Code à 0% si timer fini
```js
const s=inputArray[0]+inputArray[1]
return s
```
```js
const a = inputArray;
// Pour debugger, dans la sortie standard, utiliser la fonction "debug". Exemple: debug(inputArray)
// Faire un "return" de la solution au problème
return a[0]+a[1]
```
- [ ] Reverse mode (CSS + Calculation)
- [x] Admin: delete players
- [ ] Deployment & CD
- [ ] Podium: Manual launch
- [ ] Remove time as a factor of points in the shortest mode
- [x] Go Redux !
- [ ] Save temp code => throttle
- [ ] CSS bug on firefox with multiple columns ul (landing page when only 1 user)
- [ ] Bug lors du set du nom ==> uuid toujours présent

## TODO later
- [ ] Leaderboard: Bug with scroll when the score appear (the animation of the green score create a temporary overflow)
- [ ] Externalize ModalConfirm to a specific repo
- [ ] Externalize WebSocketManager to a specific repo ?
- [ ] Cleanup types (Player / GamePlayer)
- [ ] Cleanup backend (things are gone pretty messy...)
- [ ] Mutualise back and front (types and src)
- [ ] Force clean (disconnect all players + refresh there page)
- [ ] Handicaps
- [ ] Other modes: survival, ...
- [ ] Better handle of different modes in different tabs (example: one tab is player, another is admin)
- [ ] Securize admin
- [ ] Create rooms
- [ ] Better looking admin
