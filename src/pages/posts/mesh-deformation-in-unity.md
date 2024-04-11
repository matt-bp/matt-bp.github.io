---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Play Mode Mesh Deformation in Unity'
pubDate: 2024-04-04
description: "A tool implemented in Unity based on Maya's grab tool."
author: 'Matt Bishop'
tags: ['project', 'Unity', 'thesis']
draft: false
image: /assets/images/mesh-deformation/card.png
---

## Demo

![Demo](/assets/images/mesh-deformation/demo.gif)

[Longer Demo (links to YouTube)](https://youtu.be/PaUdfO6mtjg).

## Motivation

I needed a way to deform a mesh in Unity's "play" mode.

This is one part of the system I created for a research study focused on sculpting cloth.
The cloth will be represented as a mesh, and I needed a way to move it around with a keyboard and mouse and in VR.
In context, the cloth mesh will be updated first using this tool,
and then a quasi-static cloth simulation will run.

While looking through Unity packages, Polybrush[^poly-brush] seemed the most promising,
but that only ran in "edit" mode.
I needed a mesh deformation tool that would run in "play" mode, and that could also be used in VR.
Since there were no previous tools that fit these requirements, I built my own [^repo].

## First Attempt

For my first attempt, I manipulated the mesh's vertices through finding vertices based on a "sphere of influence"
centered on where the mouse is hovered over the mesh.
When you click-and-drag, vertices within that sphere of influence will be moved with the mouse.
The user's mouse movement corresponds to world space movement along a plane centered at where the user first clicks, and is parallel to the camera's XY plane (assuming the Z-axis points forward).

Maya's grab tool inspired this first approach.

<figure>
    <img src="/assets/images/mesh-deformation/sphere-of-influence.png" width="512px" alt="Sphere of Influence"/>
    <figcaption><b>Sphere of Influence:</b> Vertices are dragged based on their distance from the sphere's center.</figcaption>
</figure>

This functionality by itself is useful, but can easily lend to bunched-up meshes, without an easy way to pull them apart.
This shortcoming is address through adding a cloth simulation step after manipulation in the whole system [^repo-wright].
The simulation helps the mesh preserve its surface area, so you can keep on grabbing vertices.

## Second Attempt

In my second attempt, I implemented part of _Vector field based shape deformations_[^vector-field] to move the mesh's vertices.
THe mesh's vertices are moved by advecting them through a divergence-free vector field created inside two "spheres of influence" centered on the mouse cursor.
This paper was originally used for 3D meshes, where preserving volume with a divergence-free vector field is important.
Since I'm working with non-volumetric 3D meshes, the divergence-free field ends up pushing away more of the mesh than I would've liked.

I chose this paper because another paper, _Natural media simulation and art-directable simulations for computer animation_[^art-directable], included cloth sculpting using this technique.
Based on their results, I'm not sure how they were able to move the mesh and overcome side effects caused by the divergence-free vector field.
Another area they used this approach was in manipulating fluid, where the divergence-free vector field would be beneficial.

<figure>
    <img src="/assets/images/mesh-deformation/2d-vector-field.png" width="512px" alt="2D Vector Field"/>
<figcaption><b>Vector Field:</b> A 2D (or cross-section) of the divergence-free vector field.</figcaption>
</figure>

For vector field based deformations, a lot of the benefits come from the constant remeshing that is performed.
In cloth simulation though, you don't want to be changing the topology of the mesh.
Since it pushes away a lot of the cloth vertices, I didn't use this approach in my final system.

## Final Decision

I decided to go forward with my first attempt.
One reason I think it is better suited for cloth manipulation because it didn't push part of the cloth away while clicking and dragging.
Another is that mesh vertex movement is more reliable since points are moved directly with the mouse, and not advected through a vector field.

## Feedback from Pilot Study

Before running my full research study, I ran a pilot study with six participants to test the system and get people using it.

During the pilot study, you could only have mouse movement correspond to movement on a plane parallel to the camera's XY plane.
From participant feedback, I implemented options to have mouse movement correspond to movement along the world space XY, YZ, and XZ planes.
There are also options to have mouse movement correspond to movement along the surface normal of the mesh, and along the surface tangent plane.

I think it would be worthwhile having a separate writeup describing how to implement these with more visuals, so this is left as a teaser for now.

## End Notes

Look forward to some more demos of this in VR, as well as other systems I created for my research study.

Thanks for reading!

[^poly-brush]: https://docs.unity3d.com/Packages/com.unity.polybrush@1.1/manual/index.html
[^repo]: https://github.com/matt-bp/grab-tool
[^repo-wright]: https://github.com/matt-bp/wright
[^vector-field]: https://dl.acm.org/doi/10.1145/1141911.1142002
[^art-directable]: https://graphics.cs.kuleuven.be/publications/phdTuur/files/phdThesisTuurStuyck.pdf
