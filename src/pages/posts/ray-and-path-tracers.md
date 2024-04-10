---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Ray and Path Tracing'
pubDate: 2024-04-04
description: "Implementation and renders of a ray & path tracer."
author: 'Matt Bishop'
tags: ['ray tracing', 'path tracing']
draft: false
image: /assets/images/mesh-deformation/card.png
---

## Demo

![Demo](/assets/images/mesh-deformation/demo.gif)


## Ray Tracing

First did this in CS 455 at BYU, then again in CS 655.

Loerm Ipsum

What is ray tracing...

Is multithreaded in ray tracing on C++20 (check version) `std::execution::par`.

```cpp
const auto rowRange = std::ranges::views::iota(0, renderingOptions.imageHeight);
std::for_each(std::execution::par, rowRange.begin(), rowRange.end(), [&](int row)
{
    // ... computing pixel color on a per-row basis
}
```

Material model.

### Geometric Ray-Sphere intersection

I like this one :).

## Path Tracing

Did this in CS 655.

Loerm Ipsum

What is path tracing...

## About the project

Was written in C++.

### Custom Scene Format

Small example.
Specify lots of options.
Uses `yaml-cpp` to parse the file, and construct object with those settings.

### Libraries Used and Why

Outputs png images using `lodepng`.

Using `indicators` for progress.

Gives a breakdown of progress, elapsed time, and then expected remaining time. Handy to see this visual.

```
...
[======================>                     ] 51% [09m:22s<08m:51s] Rendering ...
[======================>                     ] 51% [09m:26s<08m:51s] Rendering ...
[======================>                     ] 51% [09m:29s<08m:50s] Rendering ...
[======================>                     ] 51% [09m:33s<08m:50s] Rendering ...
[=======================>                    ] 52% [09m:36s<08m:49s] Rendering ...
...
```

## Future Work

Bounding volume hierarchies to speed up ray-triangle tests. Currently, everything is wrapped in an AABB to simpler tests, but with higher poly models that gets out of hand quickly.

Animations
- Did a follow up project with skinning in OpenGL, but this would be moving that work to this project
- Motion blurring as well would be cool

BRDFs for materials
- Currently using a very simplistic reflectance model
- Look to consume these from standard tools

Standard scene format
- Look to use USD or another standard scene format

Distributed (across machines) ray & path tracing
- https://www.open-mpi.org/, used previously in undergrad courses at Utah State. Mainly used it for one computer thought.
  - It can be used to distribute work across computers as well.




## Resources

- Intersection formulas
- Ray tracing in a weekend
