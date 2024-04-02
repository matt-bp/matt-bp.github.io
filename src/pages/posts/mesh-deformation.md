---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Mesh Deformation'
pubDate: 2023-12-13
description: "A Unity runtime implementation based on Maya's grab tool."
author: 'Matt Bishop'
tags: ['project', 'Unity', 'thesis']
draft: true
image: /assets/images/2d-tag/GameMapFinalSmall.png
---

## Demo

![Menu](/assets/images/2d-tag/tag-demo.gif)

## Motivation

I needed a mesh deformation tool for use in my thesis. While looking through Unity packages, Polybrush seemed the most promising,
but that only ran in Unity the editor. This implementation was based on the grab tool in Maya, while ran in runtime in Unity.

This mesh deformation tool will be used for manipulating a cloth mesh.

## First Attempt

For my first attempt, I manipulated the mesh's vertices through finding vertices based on an "area of influence" sphere based on where
the mouse is hovered over the cloth. When you click, vertices within that sphere of influence are moved with the mouse.

## Second Attempt

In my second attempt, I implemented part of **vector field paper** to move the mesh's vertices. This paper was originally used for 3D meshes,
where preserving volume with a divergence-free vector field is important. Since I'm working with planar 3D meshes, the divergence-free
field ends up pushing away more of the cloth than I would've liked. In **natural media selection**, they mentioned using this technique,
but based on their visuals, I'm not sure how they were able to move the cloth without pushing away a lot of it while clicking and dragging the cloth.
They used it in manipulating fluid, where the divergence-free vector field would be beneficial, but not sure how they used it in cloth simulation.

**picture of vector field**

For **vector field paper**, a lot of the benefits come from the constant remeshing that is performed. In cloth simulation though, you don't want to
be changing the topology of the mesh. Since it pushes away a lot of the cloth vertices, I didn't proceeed with this one.

## Final Decision

I decided to go forward with my first attempt. It worked more reliably, and I think is better suited for manipulatin cloth.
