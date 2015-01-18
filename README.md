random-tiles
============

A web application helping me with floor tiles arrangement in my new living place.

Build status
------------

[![Build Status](https://travis-ci.org/nkoder/random-tiles.svg?branch=master)](https://travis-ci.org/nkoder/random-tiles)

Setup development environment and run unit tests
-------------------------------------------

1. `npm install` to install all NPM dependencies locally and update webdriver
2. `npm test` to run unit tests

Run unit tests
--------------------

1. `npm test` or `npm run unitTests` to run unit tests

Run end-to-end tests
--------------------

1. `npm start` to run server
2. In another terminal `npm run e2eTests` to run end-to-end tests

ToDo
----

- [x] user can generate tiles arrangement for fixed number of rows and columns
- [x] user can save tiles arrangement as image file
- [x] user can see tiles labels
- [x] user can show/hide tiles labels
- [x] user can change rows and column number of next tiles arrangement
- [ ] tiles arrangements uses tiles regarding amount of tiles of every type
- [x] user can swap selected tiles
- [ ] user can save and restore tiles arrangement
- [ ] user can see bathroom border on top of arrangement
- [ ] user cannot define rows and columns number, but all available tiles are drawn using as many rows as is needed to fit them all; number of columns depends on bathroom size
- [ ] users see how many tiles of every type left not used in arrangement
- [ ] user cannot enter invalid values
- [ ] user can choose between two tiles sets: 1x1 and 2x1; pattern for 2x1 tiles is brick-like
- [ ] user can choose between two layouts for 2x1 tiles: brick-like and random (horizontally and vertically)
- [x] user can access application by use of public URL
