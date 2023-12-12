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

![Menu](/public/assets/images/2d-tag/menu.png)

## Motivation

Working through a tutorial that I was interested in seeing how Tiled worked, and how I could use it in a game. I also was completing the challenge for the game dev field guide on making map, and so I turned this into a tag game!

## Description

This is implemented in HTML Canvas for the front-end. I used TypeScript. I also used websockets to communicate to the back-end.

The back-end is implemented in C# with ASP.NET Core. It has a single `HostedService` running the game loop. I used a queue to process events happening for players, and ran collision detection between players on the server.

## Future Game Design Choices

Winning conditions:

- Be the only one that was "it" during the whole game
- Tag the most people
- Longest time not "it"

Also, having the runner's screen to dark, and frozen in place so that others have a chance to escape.

## Other screenshots

![Menu](/public/assets/images/2d-tag/menu.png)
![Chaser view](/public/assets/images/2d-tag/chaser.png)
![Runner view](/public/assets/images/2d-tag/runner.png)
