# "...using the wrong act" warning from Timer.test.jsx
We are not certain what is causing this warning message, Hayden has advised to ignore it for now.

As discussed in this Piazza post: https://piazza.com/class/kdxbnhfpob74y0?cid=994

# SetTimeout in NewGameModal.test.js
Because setGame is only called after an API call, we used setTimeout to mimick this 
asynchronous behaviour.

# Happy Path
Happy path test can be run with command `yarn run cypress open` while in the frontend dir.