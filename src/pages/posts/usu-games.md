---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Games from my time at USU'
pubDate: 2024-01-02
description: 'A collection of games I made during my time at Utah State University.'
author: 'Matt Bishop'
tags: ['game dev', 'web', 'project']
draft: false
image: /assets/images/usu-games/card.png
---

Here is a collection of some games I made during my time at Utah State University. These were for CS 5410 Game Development. The idea was to learn how to make games, by making games!

Most of these games use the arrow keys for control, but you can change them to whatever suits your needs.

Aside from creating games, I learned a lot about planning and sticking to a schedule, as these and other games had to come out in quick succession.

## Lunar Lander

The focus of lunar lander was to get more experience creating and working with particle systems, and procedural terrain generation.

![Lander Game](/assets/images/usu-games/lunar-lander-demo.png)
**Figure 1:** Land safely on a moon to 8-bit music.

For terrain generation, the landing pads were randomly placed on the two halves of the level. The terrain in between the landing pads were created by using the midpoint displacement algorithm.

<a href="/projects/lunar-lander/index.html" target="_blank">Play lunar lander</a>

## Old Main Slider

This game was made as the midterm test for CS 5410. We had **5 hours** to complete it. Meaning we started at noon, and ended at 5:00 p.m. We could reuse code that we've created through the course, so the idea was that as we develop games, we slowly build out our own game engine to quickly produce games. That being said, that was a crazy few hours. I remember submitting the test with minutes to spare.

I couldn't think of a better way to test your knowledge in a game dev class though.

![Slider](/assets/images/usu-games/old-main-demo.png)
**Figure 2:** The fire was appropriate for how I felt during those 5 hours.

The image you're uncovering is one taken when Old Main up at Utah State [caught fire in 1983](http://exhibits.usu.edu/items/show/17362). As you click a tile next to the empty one, it will slide into place. There are two difficulties, and I don't think I even solved the hard difficulty one. One aspect that I enjoy about procedural generation is that you can create things you know work, but you don't have to manually test it every single time.

<a href="/projects/old-main/index.html" target="_blank">Play Old Main Slider</a>

## Frogger

This was a final project for my CS 5410 course. This is recreates a substantial amount of the original Frogger game. Some additions I made were using particles for fireworks when you get a frog to the other end of the swamp, and other simple effects for when the frog dies. Everything is PG. Like the Old Main game, this project used my "engine" made throughout this course for rendering, playing audio, and switching between scenes.

A challenging part of this final project for me was recreating the details and events that happen throughout the game. The speed of different cars, logs, and turtles, and how frequently they should appear. I found some Frogger footage and referenced it a lot during development. I enjoy seeing complex systems emerge from a simple game loop.

![Slider](/assets/images/usu-games/frogger.png)
**Figure 3:** Why did the frog cross the road?

<a href="/projects/frogger/index.html" target="_blank">Play frogger</a>

## Conclusion

These and other games I've made for work helped me gain an appreciation for games as a way to entertain, but also challenge and reward players. Nothing beats the feeling of a user being stumped by a game I've made, but for the right reasons (bugs are never fun).
