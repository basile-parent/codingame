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
- [x] ~~Bug timer admin => refresh toutes les 2 secondes parfois~~
- [x] Présentation => bug sur localeCompare (complètement KO)
- [ ] Slides: Bien expliquer le mode shortest
- [x] Popup instruction : timer décrémente + retirer la marge de 2 secondes
- [x] Share code: Popup: ajouter de la transparence + bouton de fermeture
- [x] Silver medal : couleur trop similaire aux items 4+
- [x] ~~debug is not defined~~
- [x] ~~"Tous les tests" ne s'arrête pas quand ça fail~~
- [x] Popup info: "Entrée" pour fermer
- [x] ~~Code à 0% si timer fini~~
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
- [x] Reverse mode (CSS + Calculation)
- [x] Admin: delete players
- [x] ~~Bug Onglet fermé = timer 5:00, non validation = timer 4:59~~
- [ ] Deployment & CD
- [ ] Podium: Manual launch
- [x] Remove time as a factor of points in the shortest mode
- [x] Go Redux !
- [x] Save temp code => throttle
- [ ] CSS bug on firefox with multiple columns ul (landing page when only 1 user)
- [x] ~~Bug lors du set du nom ==> uuid toujours présent~~
- [x] Timer : la première seconde ne s'affiche pas (--:--)
- [ ] Share code: pas de scroll dispo
- [ ] Selectionner un test déjà exécuté pour voir l'output
- [ ] Ne pas effacer l'output des tests quand on modifie le code
- [x] Mettre à jour le code en direct dans l'admin + throttle sur l'envoi du status à l'admin (sinon trop de messages)
- [x] Bug sur le démarrage d'un topic : on peut le faire si le précédent n'est pas calculé
- [ ] WS Rest pour mettre à jour la partie manuellement.
- [ ] Admin: dropdown click away listener

## TODO later
- [ ] ESLint (+ prettier ?)
- [ ] Leaderboard: Bug with scroll when the score appear (the animation of the green score create a temporary overflow)
- [ ] WebSocket message lighter and more specific : no more global status
- [ ] Externalize ModalConfirm to a specific repo
- [ ] Externalize WebSocketManager to a specific repo ?
- [ ] Cleanup types (Player / GamePlayer)
- [ ] Cleanup backend (things are gone pretty messy...)
- [ ] Mutualize back and front (types and src)
- [ ] Better animation on front
- [ ] Unit tests
- [ ] Force clean (disconnect all players + refresh there page)
- [ ] Handicaps
- [ ] Other modes: survival, ...
- [ ] Better handle of different modes in different tabs (example: one tab is player, another is admin)
- [ ] Securize admin
- [ ] Create rooms
- [ ] Better looking admin
- [ ] Reactive UI
- [ ] Customize styling (a less codingame copycat)