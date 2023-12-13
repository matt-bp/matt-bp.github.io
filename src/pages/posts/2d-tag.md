---
layout: ../../layouts/MarkdownPostLayout.astro
title: '2D Tag'
pubDate: 2023-12-13
description: 'A multiplayer tag game implemented with ASP.NET and HTML Canvas.'
author: 'Matt Bishop'
tags: ['project', 'game dev']
draft: false
image: /assets/images/2d-tag/GameMapFinalSmall.png
---

## Demo

![Menu](/assets/images/2d-tag/tag-demo.gif)

## Motivation

I started on this project while working though a tutorial I found on how to use Tiled[^tiled] to create maps for games.
At the same time, I started working on Challenge 13 from the Game Dev Field Guide,
which challenged the listener to create a level or dungeon from a Mario or Zelda game.

The tutorial I originally started out on was for a Pokémon game,
but I changed course to the challenge of making this a multiplayer tag game.

## Description

Here I describe the rules of the game, and the technology I used to make it.

### Game Play

The players of the game are divided into two groups, runners and chasers.
Chasers try to tag the runners by colliding with them.
Once tagged, a runner becomes the chaser, and the chaser now becomes a runner.
Runners try to hide and escape the chaser to not get tagged.

![Runner view](/assets/images/2d-tag/runner.png)
**Figure 1:** Not the best hiding spot.

Once becoming a chaser, the chaser has 10 seconds until they can tag a new runner.

### Front-end

This is implemented in HTML Canvas for the front-end.
I used TypeScript.
I also used websockets to communicate to the back-end server for game events like collisions,
when a new player is tagged, and when a player leaves the game.
Through play testing,
synchronizing the client's game loop with the server's game loop is important and time independent
so that players on faster hardware don't move faster
(this **totally** didn't happen).

![Menu](/assets/images/2d-tag/menu.png)
**Figure 2:** Minimalist main menu.

I enjoyed using Tiled to place walls in the environment, and create the map with foreground and background layers.
All the map making that I've done previously was manually positioning individual sprites to create a map,
and hard-coding things like collisions or objects to interact with.
Using Tiled definitely opens up the doors for more customization, as I can create a whole new map,
and if my implementation is generic enough, players could play on that new map seamlessly as well.

For work, we used to use CreateJS[^createjs] a lot, but that hasn't been updated in a year (and many more before that).
I enjoy working directly with the Canvas drawing API directly, and usually do that when I work with OpenGL as well.

### Back-end

The back-end is implemented in C# with ASP.NET Core.
It has a single `IHostedService` running the game loop.
I used a queue to process events happening for players, and ran collision detection between players on the server.
The queue helped process everything in the order I like for a game: first process inputs, update,
then render the screen.
This was my first time creating the game loop on the server,
and having its actions be sent out to clients for processing in their game loop.

One shortcoming I found with this approach is that to have more game loops running on a server,
you explicitly need more hosted services.
You can alternatively create and maintain groups for the ASP.NET hub,
and run the game loop individually for each of those.
Having groups would make sure there is a maximum to the number of players in a single lobby.
You could throw more small servers at this problem and load balance them,
which might work as well, though ASP.NET has other options before we take that route.

## Future Game Design Choices

My first play test of this game was with my co-workers.
It soon became apparent that the chaser was way too strong as they are faster than the runners.
One thought I had was to have the runner's screen turn dark
and stop them from moving for 10 seconds to give the runners a chance to hide and escape.

The only incentive for this game is to not get tagged!
I think adding the idea of rounds that last a number of seconds or minutes would be interesting.
I thought of a few different winning conditions to make the gameplay more exciting:

- Be the only one that was "it" during the whole game
- Tag the most people
- Have the longest time not "it"

I think these motivate interesting behavior.
The first one opens the door for an inverse tag game where the chaser is trying to dodge all the runners.
The other two motivate extremes of runner and chaser behavior.
There is an imbalance here, and coming up with one "winner" for a round is challenging.
Maybe instead, there could be a "best player" for both the runner and chaser player types.

## Other screenshots

![Final map](/assets/images/2d-tag/GameMapFinal.png)
**Figure 3:** Map I created for the Dame Dev Field Guide challenge.

[^tiled]: https://www.mapeditor.org/
[^createjs]: https://createjs.com/
