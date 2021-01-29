# Getting Started with Polyperc

[Play with the live app](https://polyperc-app.vercel.app "click here to explore Polyperc")

[View the back end git](https://github.com/GeorgeLuther/polyperc-api)

# About Polyperc

Polyperc is a web app that allows users to generate and manipulate rhythmic patterns. This program can be used like a traditional sequencer, where a grid of rhythms can be turned on and off. However, what makes the app useful are the various pattern generation methods that can be selected to instantly create a pattern, given a pattern length and number of active beats.

![polyperc-screenshot.png](https://georgeluther.github.io/polyperc-samples/polyperc-screenshot.png)

## Transport Functions

Polyperc has a start / pause button, a global volume input, and global tempo input that can be used to control the whole workspace at once.

## Pattern Methods

Given a number of total beats and a number of active beats, Polyperc can generate a variety of patterns.

* Pulse - active beat(s) occur on every beat of the pattern
* Beat - active beat(s) occur on a specified beat (allows negative numbers)
* Periodic - active beat(s) occur on every Xth beat regardless of the pattern length
* Cyclic - active beat(s) occur on every Xth beat within the pattern

* Subdivision - active beat(s) are dispersed at a division of the pattern length

* Even - a chosen number of active beat(s) are dispersed as evenly as possible throughout the pattern (Bjorklun / Bresenham dispersion)
* First - a chosen number of active beat(s) fill from the beginning of the pattern from left to right

* Last - a chosen number of active beat(s) fill from the end of the pattern, right to left
active beat on ? beats
* Random - a chosen number of active beat(s) are dispersed randomly throughout the pattern

* Opposite - all rests become active beat(s), all active beat(s) become rests.
I.E. 0,0,1,0,1 becomes 1,1,0,1,0 
* Reverse - the existing pattern is flipped left to right
I.E. 0,0,1 becomes 1,0,0
* Rotation - the existing pattern is rotated left or right by X beats (accepts negative numbers)
 	I.E. 1,0,0 becomes 0,1,0

## Architecture

Polyperc is a RESTful app made using Javascript, CSS, HTML, React, Tone.js, on the front-end. The backend is also made in Javascript, using Express, Knex, postgreSQL and xss. The next version will add user accounts, project management, and independent transport controls for the pattern component to efficiently manipulate the metric relationships of patterns in a project. Eventually it should be possible to sync Polyperc to an external MIDI clock as well as other MIDI and audio functions like uploading samples. The long term goal of this project is as part of a collaborative music sandbox where user can have as much or as little control over the creation process as possible. Users will collaborate with each other as well as with the program itself. Eventually the program should be able to generate new beats and compositions by single button press. Users will be able to use methods like the rhythm methods shown here, accessing material via tagging systems, and higher level actions developed based on usage analysis and machine learning.

## Brainstorming Documents

[Initial Concept](https://docs.google.com/document/d/1qna9LV6pVFz6dmoLarC0cDfFT0yUagPQ5ojL8ECmYhE/edit?usp=sharing)

[Screen Inventory](https://docs.google.com/document/d/1pEVZTJ3tou26MZPpC_DQLPXUGQxN-8BMiv_HcBHnazQ/edit)

[Related concept that will eventually merge](https://docs.google.com/document/d/1aCruQvra4gdVxM3bSFUnUqEJpPABJFGzBNuV2EBoTNo/edit?usp=sharing)

### Please feel free to add issues