---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'In-memory caching with ASP.NET Core'
pubDate: 2022-07-01
description: 'In-memory caching with ASP.NET Core'
author: 'Matt Bishop'
tags: ['csharp']
draft: true
---

Caching

Working through Release it Second edition

Got thinking about how we use caching currently at Reading Horizons.

I wanted to work through some experiements to see how `IMemoryCache` worked.

Using cache statistics

Lots of hits, misses, size limit. Alternative cache in-memory cache implementations?

Does caching `class` vs `struct` make a difference? Or objects that were originally on the heap vs stack?

## Scenario 1

Load in data before, only get. (vs. try to get this or create it)

No size limit cache.

Going to be all cache misses.

Need to load in the same amout of data.
