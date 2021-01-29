# Getting Started with Polyperc

[Play with the live app](https://polyperc-app.vercel.app "click here to explore Polyperc")

[View the back end git](https://github.com/GeorgeLuther/polyperc-api)

# About Polyperc

Polyperc is a web app that allows users to generate and manipulate rhythmic patterns. This program can be used like a traditional sequencer, where a grid of rhythms can be turned on and off. However, what makes the app useful are the variety of pattern generation methods that can be selected to instantly create a patterns from a pattern length and number of active beats.

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

     
