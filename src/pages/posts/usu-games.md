---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Games from my time at USU'
pubDate: 2024-01-01
description: 'A collection of games I made during my time at Utah State University.'
author: 'Matt Bishop'
tags: ['game dev', 'web']
draft: true
---

Here is a collection of some games I made during my time at Utah State University. These were for CS 5410 Game Development. The idea was to learn how to make games, by making games!

For most of these games you can change the controls, by default the use the arrow keys.

## Lunar Lander

The focus of lunar lander was to get more experience creating and working with particle systems, and procedural terrain generation.

![Lander Game](/assets/images/usu-games/lunar-lander-demo.png)
**Figure 1:** Land safely on the moon to 8-bit music.

For terrain generation, the landing pads were randomly placed on the two halves of the level. The terrain in between the landing pads were created by using the midpoint displacement algorithm.

<a href="/projects/lunar-lander/index.html" target="_blank">Play lunar lander</a>

## Old Main Slider

This game was made as the midterm test for CS 5410. We had **4 hours** to complete it. We could reuse code that we've created through the course, so the idea was that as we develop games, we slowly build out our own game engine to quickly produce games. That being said, that was a crazy few hours. I remember submitting the test with minutes to spare.

I couldn't think of a better way to test your knowledge in a game dev class though.

![Slider](/assets/images/usu-games/old-main-demo.png)
**Figure 2:** The fire was appropriate for how I felt during those 4 hours.

The image you're uncovering is one taken when Old Main up at Utah State [caught fire in 1983](http://exhibits.usu.edu/items/show/17362). As you click a tile next to the empty one, it will slide into place. There are two difficulties, and I don't think I even solved the hard difficulty one. That's what the best about making reusable things, if it works on the small scale, it works on the large scale!

<a href="/projects/old-main/index.html" target="_blank">Play Old Main Slider</a>

## Frogger

This was a final project for my CS 5410 course. This is recreates a substantial amount of the original Frogger game. Some additions I made were using particles for fireworks when you get a frog to the other end of the swamp.

This is not a game art course, so where I couldn't find public domain things, I had to improvise.

The fun parts for me was creating the rendering systems, and adding in the small details of sound effects

![Slider](/assets/images/usu-games/frogger.png)
**Figure 3:** Why did the frog cross the road?



<a href="/projects/frogger/index.html" target="_blank">Play frogger</a>
