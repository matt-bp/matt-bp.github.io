---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Multiplayer Tag'
pubDate: 2023-12-04
description: 'A multiplayer tag game implemented with ASP.NET and HTML Canvas.'
author: 'Matt Bishop'
tags: ['project', 'game dev']
draft: true
image: /assets/images/2d-tag/GameMapFinalSmall.png
---

## Demo

![Menu](/public/assets/images/2d-tag/tag-demo.gif)

## Motivation

Working through a tutorial that I was interested in seeing how Tiled worked, and how I could use it in a game. I also was completing the challenge for the game dev field guide on making map, and so I turned this into a tag game!

## Description

### Game Play

Rules

### Front-end

This is implemented in HTML Canvas for the front-end. I used TypeScript. I also used websockets to communicate to the back-end.

I enjoyed using Tiled to place walls in the environment, and create the map with foreground and background layers.

### Back-end

The back-end is implemented in C# with ASP.NET Core. It has a single `HostedService` running the game loop. I used a queue to process events happening for players, and ran collision detection between players on the server.

## Future Game Design Choices

I demoed this by playing it with my co-workers. It soon became apparent that the chaser was way to strong. One thought I had was to have the runner's screen turn dark once they're [^1]

Winning conditions:

- Be the only one that was "it" during the whole game
- Tag the most people
- Longest time not "it"

Also, having the runner's screen to dark, and frozen in place so that others have a chance to escape.

## Other screenshots

![Menu](/public/assets/images/2d-tag/menu.png)
**Caption:** This is a caption for your image.

![Chaser view](/public/assets/images/2d-tag/chaser.png)
![Runner view](/public/assets/images/2d-tag/runner.png)
![Final map](/public/assets/images/2d-tag/GameMapFinal.png)

[^1]: Hi
